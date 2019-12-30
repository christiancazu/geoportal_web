<template>
<div
  style="height: 36vh"
  class="my-1"
>
  <client-only>
    <l-map
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
        v-if="controlBtn"
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
        v-if="marker.visible"
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
        zoom: 4
      })
    },
    marker: {
      type: Object, default: () => ({
        latLng: [],
        visible: false
      })
    },
    tileLayer: {
      type: Object, default: () => ({
        url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      })
    },
    controlBtn: {
      type: Boolean, default: false
    }
  },

  mounted () {
    this.$emit('update-marker-lng-lat', this.marker.latLng)
  },

  methods: {
    setMarkerInvisible () {
      this.marker.visible = false
    },

    onCenterUpdated ({ lat, lng }) {
      this.map.latLng = [lat, lng]
    },

    onUpdateMarker ({ lat, lng }) {
      this.$emit('on-marker-lng-lat', [lng, lat])
    },

    onClickBtnMarker () {
      const [lat, lng] = this.map.latLng
      this.marker.visible = true
      this.marker.latLng = [lat, lng]
      this.$emit('on-marker-lng-lat', [lng, lat])
    },

    onTileError () {
      this.$emit('on-tile-error')
    }
  }
}
</script>
