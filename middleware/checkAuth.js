import Vue from 'vue'

import tokenToFormData from '@/helpers/tokenToFormData'

import { AUTH_STRATEGY } from '@/config/constants'

export default async ({ app, redirect, $auth }) => {

  if (process.server) return

  const currentToken = await $auth.getToken(AUTH_STRATEGY)

  if ($auth.$state.loggedIn && !!currentToken) {
    // if try to join login when is logged
    if (app.context.route.name === 'login') return redirect('/')

    try {
      const tokenAsData = tokenToFormData($auth.getToken(AUTH_STRATEGY))
      const { token } = await app.$refreshAPI.refreshToken(tokenAsData)

      // setting new token
      $auth.setToken(AUTH_STRATEGY, `Bearer ${token}`)

    } catch (error) {
      Vue.prototype.$toasted.error(Vue.prototype.$ERRORS.INVALID_SESSION)
      await $auth.logout()
      return redirect('/login')
    }
  } else {
    // when url is '/' && not token
    if (app.context.route.name === 'index' && !currentToken) return redirect('/login')

    if (app.context.route.name !== 'login') {
      try {
        await app.$userAPI.info()
      } catch (error) {
        // Vue.prototype.$toasted.error(Vue.prototype.$ERRORS.INVALID_SESSION)
      }
    }
  }
}
