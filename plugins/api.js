import refreshAPI from '~/api/refresh'
import regionAPI from '~/api/region'
import userAPI from '~/api/user'
import userRequestAPI from '~/api/userRequest'
import vectorialLayerAPI from '~/api/vectorialLayer'
import baseLayerAPI from '~/api/baseLayer'
import WMSServiceAPI from '~/api/WMSService'
import WMSCategoryAPI from '~/api/WMSCategory'
import WMSAuthorAPI from '~/api/WMSAuthor'
import reportAPI from '~/api/report'
import groupLayerAPI from '~/api/groupLayer'
import rasterLayerAPI from '~/api/rasterLayer'
import georeferencedImageAPI from '~/api/georeferencedImage'

export default (ctx, inject) => {
  inject('refreshAPI', refreshAPI(ctx.$axios))
  inject('regionAPI', regionAPI(ctx.$axios))
  inject('userAPI', userAPI(ctx.$axios))
  inject('userRequestAPI', userRequestAPI(ctx.$axios))
  inject('vectorialLayerAPI', vectorialLayerAPI(ctx.$axios))
  inject('baseLayerAPI', baseLayerAPI(ctx.$axios))
  inject('WMSServiceAPI', WMSServiceAPI(ctx.$axios))
  inject('WMSCategoryAPI', WMSCategoryAPI(ctx.$axios))
  inject('WMSAuthorAPI', WMSAuthorAPI(ctx.$axios))
  inject('reportAPI', reportAPI(ctx.$axios))
  inject('groupLayerAPI', groupLayerAPI(ctx.$axios))
  inject('rasterLayerAPI', rasterLayerAPI(ctx.$axios))
  inject('georeferencedImageAPI', georeferencedImageAPI(ctx.$axios))
}
