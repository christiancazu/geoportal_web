import refreshAPI from '~/api/refresh'
import regionAPI from '~/api/region'
import userAPI from '~/api/user'
import userRequestAPI from '~/api/userRequest'
import layerAPI from '~/api/layer'
import baseLayerAPI from '~/api/baseLayer'
import WMSServiceAPI from '~/api/WMSService'
import WMSCategoryAPI from '~/api/WMSCategory'
import WMSAuthorAPI from '~/api/WMSAuthor'
import reportAPI from '~/api/report'
import groupLayerAPI from '~/api/groupLayer'
import rasterLayerAPI from '~/api/rasterLayer'
import georeferentialImageAPI from '~/api/georeferentialImage'

export default (ctx, inject) => {
  const refreshAPIWithAxios = refreshAPI(ctx.$axios)
  const regionAPIWithAxios = regionAPI(ctx.$axios)
  const userAPIWithAxios = userAPI(ctx.$axios)
  const userRequestAPIWithAxios = userRequestAPI(ctx.$axios)
  const layerAPIWithAxios = layerAPI(ctx.$axios)
  const baseLayerAPIWithAxios = baseLayerAPI(ctx.$axios)
  const WMSServiceAPIWithAxios = WMSServiceAPI(ctx.$axios)
  const WMSCategoryAPIWithAxios = WMSCategoryAPI(ctx.$axios)
  const WMSAuthorAPIWithAxios = WMSAuthorAPI(ctx.$axios)
  const reportAPIWithAxios = reportAPI(ctx.$axios)
  const groupLayerAPIWithAxios = groupLayerAPI(ctx.$axios)
  const rasterLayerAPIWithAxios = rasterLayerAPI(ctx.$axios)
  const georeferentialImageAPIWithAxios = georeferentialImageAPI(ctx.$axios)

  inject('refreshAPI', refreshAPIWithAxios)
  inject('regionAPI', regionAPIWithAxios)
  inject('userAPI', userAPIWithAxios)
  inject('userRequestAPI', userRequestAPIWithAxios)
  inject('layerAPI', layerAPIWithAxios)
  inject('baseLayerAPI', baseLayerAPIWithAxios)
  inject('WMSServiceAPI', WMSServiceAPIWithAxios)
  inject('WMSCategoryAPI', WMSCategoryAPIWithAxios)
  inject('WMSAuthorAPI', WMSAuthorAPIWithAxios)
  inject('reportAPI', reportAPIWithAxios)
  inject('groupLayerAPI', groupLayerAPIWithAxios)
  inject('rasterLayerAPI', rasterLayerAPIWithAxios)
  inject('georeferentialImageAPI', georeferentialImageAPIWithAxios)
}
