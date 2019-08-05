export default function ({ app }) {
  console.log('hola')
  if (!app.$auth.loggedIn) {
    return
  }

  const username = app.$auth.user.username
}