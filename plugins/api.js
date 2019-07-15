import userAPI from '~/api/user'

export default (ctx, inject) => {
  const userAPIWithAxios = userAPI(ctx.$axios)

  inject('userAPI', userAPIWithAxios)
}
