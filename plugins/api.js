import userAPI from '~/api/user'
import regionAPI from '~/api/region'

export default (ctx, inject) => {
  const userAPIWithAxios = userAPI(ctx.$axios)
  const regionAPIWithAxios = regionAPI(ctx.$axios)

  inject('userAPI', userAPIWithAxios)
  inject('regionAPI', regionAPIWithAxios)
}
