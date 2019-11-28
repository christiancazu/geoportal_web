import Vue from 'vue'

import {
  LMap,
  LTileLayer,
  LMarker,
  LControl
} from 'vue2-leaflet'

import { Icon } from 'leaflet'

delete Icon.Default.prototype._getIconUrl

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

Vue.component('l-map', LMap)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-control', LControl)

// import LDrawToolbar from 'vue2-ºleaflet-draw-toolbar'

// Vue.component('l-draw-toolbar', LDrawToolbar)
