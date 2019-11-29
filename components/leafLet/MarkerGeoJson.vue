<template>
<div
  id="map-wrap"
  class="my-2"
  style="height: 36vh"
>
  <client-only>
    <l-map
      ref="map"
      :zoom="map.zoom"
      :center="map.latLng"
      @update:center="onCenterUpdated"
    >

      <l-tile-layer :url="tileLayer.url" />

      <l-control position="bottomleft">
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
    map: { type: Object, required: true },
    marker: { type: Object, required: true }
  },

  data: () => ({
    tileLayer: {
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    }
  }),

  methods: {
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
  }
}
</script>
