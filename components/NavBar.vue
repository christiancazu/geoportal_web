<template>
<nav
  id="nav-fixed"
  class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark text-mayus"
>
  <div class="container">
    <a
      class="navbar-brand"
      href="#"
    >
      <div @click="$router.push('/')">
        <img
          class="el-menu-item px-0"
          src="/image/unat_blanco.png" style="max-height:100%;" alt
        >
      </div>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>

    <div
      id="navbarSupportedContent"
      class="collapse navbar-collapse"
    >
      <ul class="navbar-nav ml-auto text-xs-center">
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
          >Nosotros</a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            href="#"
          >Smart Enviroment</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link"
            href="#"
          >Contacto</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link"
            href="#"
          >Iniciar Sesión</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>
<script>
// import Logo from '@/components/Logo'
/* eslint-disable */
export default {
  components: {
    // Logo
  },

  data () {
    return {
      activeIndex: '/hello',
      isActive: false
    }
  },

  mounted () {
    if (window.scrollY > 100) {
      $('#nav-fixed').addClass('opaque')
    }
    $('#navbarSupportedContent').on('shown.bs.collapse	', function (e) {
      $('#nav-fixed').addClass('bg-mobile')
      $('#navbarSupportedContent').addClass('bg-black')
    })

    $('#navbarSupportedContent').on('hide.bs.collapse', function (e) {
      $('#nav-fixed').removeClass('bg-mobile')
      $('#navbarSupportedContent').removeClass('bg-black')
    })

    /* ========================================================== */
    /*   Navigation Background Color                              */
    /* ========================================================== */

    $(window).on('scroll', function (e) {
      if ($(this).scrollTop() > 100) {
        $('#nav-fixed').addClass('opaque')
      } else {
        $('#nav-fixed').removeClass('opaque')
      }
    })
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    select: function () {
      this.isActive = !this.isActive

      const element = document.querySelector('.el-header')
      element.style.display = 'block'
      console.log(element, this.isActive)
    }
  }
}
</script>
<style lang="">
</style>
