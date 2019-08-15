export default function ({ app }) {
  if (!app.$auth.loggedIn) {
    // app.$auth.logout()
    return
  }
}