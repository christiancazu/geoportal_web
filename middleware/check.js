import axios from 'axios'

export default function (ctx) {
  let loggedIn = ctx.$auth.$state.loggedIn
  let { store } = ctx
  let app = ctx.app
  let auth = ctx.$auth
  const prefix = auth.options.token
  if (loggedIn) {
    let tokenLocal = auth.getToken('local')
    let token = tokenLocal.replace('Bearer ', '')
    const data = { token }

    new Promise((resolve, reject) => {
      app.$refreshAPI.refreshToken({ data })
        .then(response => {
          auth.setToken('local', `Bearer ${response.data.token}`)
          auth.fetchUser().then((res) => {
          }).catch(error => {
            return redirect('/login')
          }).catch(error => {
            console.log('user', error)
          })
          resolve(response);
        })
        .catch(error => {
          auth.logout()
          return ctx.redirect('/login')
          reject(error)
        });
    })
  }
}