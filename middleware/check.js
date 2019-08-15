export default async ({ app, redirect, store, $auth }) => {
  if (process.server) {
    return
  }
  const isToken = $auth.getToken('local')
  if ($auth.$state.loggedIn && !!isToken) {
    const token = isToken.replace('Bearer ', '')
    try {
      app.$refreshAPI.refreshToken({ data: { token } })
        .then(response => {
          if ($auth.$state.loggedIn) {
            $auth.setToken('local', `Bearer ${response.data.token}`)
            $auth.fetchUser()
              .then(response => {
              }).catch(error => {
                return redirect('/login')
              })
          }
        }).catch(error => {
          $auth.logout()
          return redirect('/login')
        })
    } catch (error) {
      $auth.logout()
      return redirect('/login')
    }
  }
}
