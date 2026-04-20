import { defineStore } from 'pinia'

import {
  clearAuthTokens,
  getAccessToken,
  setAuthTokens,
} from '@/lib/http/auth-tokens'

import type { AuthTokens } from '@/lib/http/auth-tokens'

export const useAuthStore = defineStore('user', () => {
  const isLogin = ref(Boolean(getAccessToken()))

  function initializeAuthState() {
    isLogin.value = Boolean(getAccessToken())
  }

  function login(tokens: AuthTokens) {
    setAuthTokens(tokens)
    isLogin.value = true
  }

  function logout() {
    clearAuthTokens()
    isLogin.value = false
  }

  return {
    isLogin,
    initializeAuthState,
    login,
    logout,
  }
})
