<template>
  <div
    id="map"
    class="map"
  ></div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      map: null,
      tileLayer: null
    };
  },

  mounted () {
    this.replaceShowPanelGeovisor({ show: true })

    this.initMap();
    // var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //   maxZoom: 18,
    //   id: 'mapbox.streets',
    //   accessToken: 'pk.eyJ1IjoibWFyaWxleSIsImEiOiJjanhtM3EyNncwY3R3M25vMzV3aHdyNjZhIn0.NldpzBgqvAtGsfMjERHhxQ'
    // }).addTo(mymap);
  },

  created () {
  },

  methods: {
    ...mapActions({
      replaceShowPanelGeovisor: 'sidebar/replaceShowPanelGeovisor'
    }),

    initMap () {
      var latlng = L.latLng(-16.39, -71.53);
      this.map = L.map("map").setView(latlng, 5);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      L.tileLayer
        .wms(
          "https://www.idep.gob.pe/geoportal/services/SERVICIOS_IGN/FISIOGRAFIA_500K/MapServer/WMSServer",
          {
            layers: "1,2,3",
            format: "image/png",
            transparent: true
          }
        )
        .addTo(this.map);
    }
  }
};
</script>
 <style lang="css">
.map {
  height: 100%;
}
</style>
