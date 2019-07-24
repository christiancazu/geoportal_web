import regionAPI from '~/api/region'
import userAPI from '~/api/user'
import layerAPI from '~/api/layer'
import baseMapAPI from '~/api/baseMap'
import WMSServiceAPI from '~/api/WMSService'

export default (ctx, inject) => {
  const regionAPIWithAxios = regionAPI(ctx.$axios)
  const userAPIWithAxios = userAPI(ctx.$axios)
  const layerAPIWithAxios = layerAPI(ctx.$axios)
  const baseMapAPIWithAxios = baseMapAPI(ctx.$axios)
  const WMSServiceWithAxios = WMSServiceAPI(ctx.$axios)

  inject('regionAPI', regionAPIWithAxios)
  inject('userAPI', userAPIWithAxios)
  inject('layerAPI', layerAPIWithAxios)
  inject('baseMapAPI', baseMapAPIWithAxios)
  inject('WMSServiceAPI', WMSServiceWithAxios)
}
