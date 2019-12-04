import Vue from 'vue'

import tokenToFormData from '@/helpers/tokenToFormData'

import { AUTH_STRATEGY } from '@/config/constants'

export default async ({ app, redirect, $auth }) => {

  if (process.server) return

  const currentToken = $auth.getToken(AUTH_STRATEGY)

  if ($auth.$state.loggedIn && !!currentToken) {
    try {
      const { token } = await app.$refreshAPI.refreshToken(tokenToFormData($auth.getToken(AUTH_STRATEGY)))

      $auth.setToken(AUTH_STRATEGY, `Bearer ${token}`)

    } catch (error) {
      Vue.prototype.$ERRORS.INVALID_SESSION
      await $auth.logout()
      return redirect('login')
    }
  }
}
