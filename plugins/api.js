import refreshAPI from '~/api/refresh'
import regionAPI from '~/api/region'
import userAPI from '~/api/user'
import userRequestAPI from '~/api/userRequest'
import layerAPI from '~/api/layer'
import baseMapAPI from '~/api/baseMap'
import WMSServiceAPI from '~/api/WMSService'
import WMSCategoryAPI from '~/api/WMSCategory'
import WMSAuthorAPI from '~/api/WMSAuthor'
import reportAPI from '~/api/report'

export default (ctx, inject) => {
  const refreshAPIWithAxios = refreshAPI(ctx.$axios)
  const regionAPIWithAxios = regionAPI(ctx.$axios)
  const userAPIWithAxios = userAPI(ctx.$axios)
  const userRequestAPIWithAxios = userRequestAPI(ctx.$axios)
  const layerAPIWithAxios = layerAPI(ctx.$axios)
  const baseMapAPIWithAxios = baseMapAPI(ctx.$axios)
  const WMSServiceWithAxios = WMSServiceAPI(ctx.$axios)
  const WMSCategoryWithAxios = WMSCategoryAPI(ctx.$axios)
  const WMSAuthorWithAxios = WMSAuthorAPI(ctx.$axios)
  const reportWithAxios = reportAPI(ctx.$axios)

  inject('refreshAPI', refreshAPIWithAxios)
  inject('regionAPI', regionAPIWithAxios)
  inject('userAPI', userAPIWithAxios)
  inject('userRequestAPI', userRequestAPIWithAxios)
  inject('layerAPI', layerAPIWithAxios)
  inject('baseMapAPI', baseMapAPIWithAxios)
  inject('WMSServiceAPI', WMSServiceWithAxios)
  inject('WMSCategoryAPI', WMSCategoryWithAxios)
  inject('WMSAuthorAPI', WMSAuthorWithAxios)
  inject('reportAPI', reportWithAxios)
}
