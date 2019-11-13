import refreshAPI from '~/api/refresh'
import publicAPI from '~/api/public'
import userAPI from '~/api/user'
import requestAPI from '~/api/request'
import vectorialLayerAPI from '~/api/vectorialLayer'
import baseLayerAPI from '~/api/baseLayer'
import WMSServiceAPI from '~/api/WMSService'
import WMSCategoryAPI from '~/api/WMSCategory'
import WMSAuthorAPI from '~/api/WMSAuthor'
import reportAPI from '~/api/report'
import groupLayerAPI from '~/api/groupLayer'
import rasterLayerAPI from '~/api/rasterLayer'
import georeferencedImageAPI from '~/api/georeferencedImage'
import satelitalImageAPI from '~/api/satelitalImage'

export default (ctx, inject) => {
  inject('refreshAPI', refreshAPI(ctx.$axios))
  inject('publicAPI', publicAPI(ctx.$axios))
  inject('userAPI', userAPI(ctx.$axios))
  inject('requestAPI', requestAPI(ctx.$axios))
  inject('vectorialLayerAPI', vectorialLayerAPI(ctx.$axios))
  inject('baseLayerAPI', baseLayerAPI(ctx.$axios))
  inject('WMSServiceAPI', WMSServiceAPI(ctx.$axios))
  inject('WMSCategoryAPI', WMSCategoryAPI(ctx.$axios))
  inject('WMSAuthorAPI', WMSAuthorAPI(ctx.$axios))
  inject('reportAPI', reportAPI(ctx.$axios))
  inject('groupLayerAPI', groupLayerAPI(ctx.$axios))
  inject('rasterLayerAPI', rasterLayerAPI(ctx.$axios))
  inject('georeferencedImageAPI', georeferencedImageAPI(ctx.$axios))
  inject('satelitalImageAPI', satelitalImageAPI(ctx.$axios))
}
