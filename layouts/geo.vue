<template>
  <div
    id="app"
    style="height:100vh;"
    class="d-flex"
  >
    <Sidebar />
    <div class="h-100">
      <button
        id="menu-toggle"
        @click="changeClass"
        class="semi-circulo-2"
      ></button>
    </div>
    <div id="page-content-wrapper">
      <div class="container-fluid h-100 p-0">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import Sidebar from '@/components/SideBar/Geovisor.vue'
export default {
  components: {
    Sidebar
  },

  mounted () {
  },
  methods: {
    changeClass () {
      $("#app").toggleClass("toggled");
    }
  },
};
</script>
<style>
body {
  overflow-x: hidden;
}

.semi-circulo-2 {
  position: absolute;
  z-index: 99999999;
  top: 44%;
  height: 100px;
  background: gray;
  border: 1px;
  -moz-border-radius: 0 100px 100px 0;
  -webkit-border-radius: 0 100px 100px 0;
  border-radius: 0 100px 100px 0;
}

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin 0.25s ease-out;
  -moz-transition: margin 0.25s ease-out;
  -o-transition: margin 0.25s ease-out;
  transition: margin 0.25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#app.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #app.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}
</style>
