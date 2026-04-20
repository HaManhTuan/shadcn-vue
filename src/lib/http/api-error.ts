import axios from 'axios'

export interface ApiError<TData = unknown> extends Error {
  name: 'ApiError'
  status: number | null
  code?: string | number
  data: TData | null
  isNetworkError: boolean
  isTimeout: boolean
  originalError: unknown
}

function getMessageFromData(data: unknown): string | undefined {
  if (!data || typeof data !== 'object')
    return undefined

  const message = Reflect.get(data, 'message')
  if (typeof message === 'string' && message.trim())
    return message

  return undefined
}

export function createApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? null
    const data = error.response?.data ?? null
    const serverMessage = getMessageFromData(data)

    const apiError = new Error(
      serverMessage
      ?? error.message
      ?? 'Request failed',
    ) as ApiError

    apiError.name = 'ApiError'
    apiError.status = status
    apiError.code = error.code
    apiError.data = data
    apiError.isNetworkError = !error.response
    apiError.isTimeout = error.code === 'ECONNABORTED'
    apiError.originalError = error
    return apiError
  }

  const fallbackError = new Error(
    error instanceof Error ? error.message : 'Unexpected error',
  ) as ApiError

  fallbackError.name = 'ApiError'
  fallbackError.status = null
  fallbackError.data = null
  fallbackError.isNetworkError = false
  fallbackError.isTimeout = false
  fallbackError.originalError = error
  return fallbackError
}

export function isApiError(value: unknown): value is ApiError {
  return value instanceof Error && value.name === 'ApiError'
}
