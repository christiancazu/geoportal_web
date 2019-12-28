<template>
<div
  style="height: 36vh"
>
  <client-only>
    <l-map
      ref="map"
      :zoom="map.zoom"
      :center="map.latLng"
      @update:center="onCenterUpdated"
    >

      <l-tile-layer
        ref="tileLayer"
        :url="tileLayer.url"
        @tileerror="onTileError"
      />

      <l-control
        v-if="!!marker"
        position="bottomleft"
      >
        <el-tooltip
          effect="dark"
          content="Coloque una ubicación"
          placement="top"
        >
          <el-button
            type="primary"
            icon="el-icon-s-flag"
            circle
            @click="onClickBtnMarker"
          />
        </el-tooltip>
      </l-control>

      <l-marker
        v-if="!!marker"
        ref="marker"
        :visible="marker.visible"
        :lat-lng="marker.latLng"
        draggable
        @update:latLng="onUpdateMarker"
      />
    </l-map>
  </client-only>
</div>
</template>

<script>
/* eslint-disable array-element-newline */
/* eslint-disable array-bracket-newline */
export default {
  props: {
    map: {
      type: Object, default: () => ({
        zoom: 5
      })
    },
    marker: {
      type: Object, default: () => {}
    },
    tileLayer: {
      type: Object, default: () => ({
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      })
    }
  },

  data: () => ({
    currentMarkerLatLng: []
  }),

  // watch: {
  //   'marker' (val) {
  //     console.warn('marker.latLng', val)
  //     this.currentMarkerLatLng = val.latLng
  //   }
  // },

  mounted () {
    console.warn('marker', this.currentMarkerLatLng)
    this.updateCurrentMarkerLatLng(this.marker.latLng)
    console.warn('marker', this.currentMarkerLatLng)
    this.$emit('on-marker-lng-lat', this.marker.latLng)
  },

  methods: {
    onCenterUpdated ({ lat, lng }) {
      this.map.latLng = [lat, lng]
    },

    onUpdateMarker ({ lat, lng }) {
      this.$emit('on-marker-lng-lat', [lng, lat])
      this.updateCurrentMarkerLatLng([lng, lat])
    },

    onClickBtnMarker () {
      const [lat, lng] = this.map.latLng
      this.marker.visible = true
      this.marker.latLng = [lat, lng]
      this.$emit('on-marker-lng-lat', [lng, lat])
      this.updateCurrentMarkerLatLng([lng, lat])
    },

    onTileError () {
      this.$emit('on-tile-error')
    },

    setLatLng () {
      // console.warn('---------')
      // console.warn(this.$refs.marker.latLng)
      // // console.warn('---------')
      this.$refs.marker.setLatLng(this.currentMarkerLatLng.reverse())
      // return this.$refs.marker.latLng
    },

    updateCurrentMarkerLatLng ([lng, lat]) {
      this.currentMarkerLatLng = [lng, lat]
    }
  }
}
</script>
