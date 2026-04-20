import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

import axios from 'axios'

import { API_BASE_URL, API_TIMEOUT } from '@/constants/app-config'

import { createApiError } from './api-error'
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from './auth-tokens'

type ApiMethod = NonNullable<AxiosRequestConfig['method']>

export interface ApiRequestOptions extends Omit<AxiosRequestConfig, 'url' | 'method' | 'data'> {
  method?: ApiMethod
  body?: unknown
  skipAuth?: boolean
  skipRefresh?: boolean
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
  skipAuth?: boolean
  skipRefresh?: boolean
}

interface HttpAuthConfig {
  refreshEndpoint?: string
  onAuthFailure?: () => void
}

interface RefreshResponse {
  accessToken: string
  refreshToken?: string
}

let refreshEndpoint = '/auth/refresh'
let onAuthFailure: (() => void) | undefined
let refreshPromise: Promise<string | null> | null = null

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
})

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function parseRefreshResponse(payload: unknown): RefreshResponse | null {
  if (!isRecord(payload))
    return null

  const nestedData = Reflect.get(payload, 'data')
  const source = isRecord(nestedData) ? nestedData : payload

  const accessToken = Reflect.get(source, 'accessToken')
  if (typeof accessToken !== 'string' || !accessToken)
    return null

  const refreshToken = Reflect.get(source, 'refreshToken')
  return {
    accessToken,
    refreshToken: typeof refreshToken === 'string' ? refreshToken : undefined,
  }
}

function applyAuthHeader(config: InternalAxiosRequestConfig, token: string) {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`
  }
}

async function refreshAccessToken(): Promise<string | null> {
  const storedRefreshToken = getRefreshToken()
  if (!storedRefreshToken)
    return null

  if (refreshPromise)
    return await refreshPromise

  refreshPromise = (async () => {
    try {
      const response = await refreshClient.post<unknown>(refreshEndpoint, {
        refreshToken: storedRefreshToken,
      })
      const tokenPayload = parseRefreshResponse(response.data)
      if (!tokenPayload)
        return null

      setAuthTokens(tokenPayload)
      return tokenPayload.accessToken
    }
    catch {
      return null
    }
    finally {
      refreshPromise = null
    }
  })()

  return await refreshPromise
}

apiClient.interceptors.request.use((config: RetryableRequestConfig) => {
  if (config.skipAuth)
    return config

  const accessToken = getAccessToken()
  if (accessToken) {
    applyAuthHeader(config, accessToken)
  }

  return config
})

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: unknown) => {
    const apiError = createApiError(error)

    if (!axios.isAxiosError(error)) {
      return await Promise.reject(apiError)
    }

    const status = error.response?.status
    const originalRequest = error.config as RetryableRequestConfig | undefined

    if (!originalRequest || status !== 401) {
      return await Promise.reject(apiError)
    }

    const isRefreshRequest = originalRequest.url?.includes(refreshEndpoint) ?? false
    if (originalRequest._retry || originalRequest.skipRefresh || isRefreshRequest) {
      clearAuthTokens()
      onAuthFailure?.()
      return await Promise.reject(apiError)
    }

    originalRequest._retry = true
    const newAccessToken = await refreshAccessToken()

    if (!newAccessToken) {
      clearAuthTokens()
      onAuthFailure?.()
      return await Promise.reject(apiError)
    }

    applyAuthHeader(originalRequest, newAccessToken)
    return await apiClient.request(originalRequest)
  },
)

export function configureHttpAuth(config: HttpAuthConfig) {
  refreshEndpoint = config.refreshEndpoint ?? refreshEndpoint
  onAuthFailure = config.onAuthFailure
}

export async function apiFetch<T>(url: string, options: ApiRequestOptions = {}): Promise<T> {
  const {
    method = 'get',
    body,
    skipAuth,
    skipRefresh,
    ...rest
  } = options

  try {
    const response = await apiClient.request<T>({
      url,
      method,
      data: body,
      skipAuth,
      skipRefresh,
      ...rest,
    } as RetryableRequestConfig)
    return response.data
  }
  catch (error) {
    return await Promise.reject(createApiError(error))
  }
}

export { apiClient }
