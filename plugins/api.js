import layerAPI from '~/api/layer'
import baseMapAPI from '~/api/baseMap'
import userAPI from '~/api/user'
import regionAPI from '~/api/region'

export default (ctx, inject) => {
  const layerAPIWithAxios = layerAPI(ctx.$axios)
  const userAPIWithAxios = userAPI(ctx.$axios)
  const regionAPIWithAxios = regionAPI(ctx.$axios)
  const baseMapAPIWithAxios = baseMapAPI(ctx.$axios)

  inject('userAPI', userAPIWithAxios)
  inject('layerAPI', layerAPIWithAxios)
  inject('regionAPI', regionAPIWithAxios)
  inject('baseMapAPI', baseMapAPIWithAxios)
}
