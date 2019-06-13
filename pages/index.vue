<template lang="pug">
  section
    .left-panel 
      ul
        a(href="")
          li Menu 01
        a(href="")
          li Hola
        a(href="")
          li Gaaaaa
    #mapid
</template>


<script>
export default {
  mounted() {
    // LOGCA DEL MENU

    // LOGICA DE LOS MAPAS

    var app = L.map("mapid", {}).setView([51.505, -0.09], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(app);
    var basemaps = {
      PERUSAT: L.tileLayer.wms("http://localhost:8080/geoserver/UNAT/wms?", {
        layers: "UNAT:IMG_PER1_20170414151423_ORT_MS_007457",
        format: "image/png"
      })
    };
    L.control.layers(basemaps).addTo(app);
  }
};
</script>

<style lang="css" scoped>
/** ESTILOS DEL MAAPA**/

#mapid {
  width: 1005;
  height: 500px;
}
</style>