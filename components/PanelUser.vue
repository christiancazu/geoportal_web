<template>
  <!-- <div>
    <div class="panel-body text-center">
      <img
        src="https://bulma.io/images/placeholders/128x128.png"
        alt=""
        class="img-circle"
      >
      <h3>Maribel</h3>
      <p>Administrador</p>
    </div>
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Todas las tareas</h3>
      </div>
      <div class="list-group">
        <a
          href="#"
          class="list-group-item"
        >Gestión de usuarios</a>
        <a
          href="#"
          class="list-group-item"
        >Portal</a>
        <a
          href="#"
          class="list-group-item"
        >Administrador de Datos</a>
        <a
          href="#"
          class="list-group-item"
        >Estado de Datos</a>
        <a
          href="#"
          class="list-group-item"
        >GeoServer</a>
        <a
          href="#"
          class="list-group-item"
        >Salir</a>
      </div>
    </div>
  </div> -->
  <div
    id="wrapper"
    class="active"
  >
    <!-- Sidebar -->
    <div id="sidebar-wrapper">
      <ul
        id="sidebar_menu"
        class="sidebar-nav"
      >
        <li class="sidebar-brand">
          <a
            id="menu-toggle"
            href="#"
          >Menu<span
              id="main_icon"
              class="glyphicon glyphicon-align-justify"
            ></span></a>
        </li>
      </ul>
      <ul
        class="sidebar-nav"
        id="sidebar"
      >
        <!-- vista 1 -->
        <div v-if="panel === 1">
          <div
            v-for="(item, i) in itemsUser"
            :key="i"
            class="panel panel-default mb-0"
          >
            <div class="panel-heading">
              <span class="panel-title">{{ item.name }}</span>
              <button
                class="btn btn-success btn-xs pull-right"
                type="button"
                data-toggle="collapse"
                :data-target="`#${item.id}`"
                aria-expanded="false"
                :aria-controls="`${item.id}`"
              >Abrir</button>
            </div>
            <div class="panel-body pa-0">
              <div
                :id="`${item.id}`"
                class="veoxportal-contenido collapse"
              >Elementos</div>
            </div>
          </div>

        </div>
        <!-- vista 2 -->
        <div v-if="panel === 2">
          <div
            v-for="(item, i) in itemsPortal"
            :key="i"
            class="panel panel-default mb-0"
          >
            <div class="panel-heading">
              <span class="panel-title">{{ item.name }}</span>
              <button
                class="btn btn-success btn-xs pull-right"
                type="button"
                id="btnGreen"
                data-toggle="collapse"
                :data-target="`#${item.id}`"
                aria-expanded="false"
                :aria-controls="`${item.id}`"
              >Abrir</button>
            </div>
            <div class="panel-body pa-0">
              <div
                :id="`${item.id}`"
                class="veoxportal-contenido collapse"
              >Elementos</div>
            </div>
          </div>
        </div>
      </ul>
    </div>

    <!-- Page content -->
    <div id="page-content-wrapper">
      <!-- Keep all page content within the page-content inset div! -->
      <div class="page-content inset">
        <button @click="showitem">toogle</button>
        <!-- <div class="row">
          <div class="col-md-12">
            <p class="well lead">An Experiment using the sidebar template from startbootstrap.com which I integrated in my website (<a href="http://animeshmanglik.name">animeshmanglik.name</a>)</p>
            <p class="well lead">Click on the Menu to Toggle Sidebar . Hope you enjoy it!</p>
          </div>
        </div> -->
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      panel: 1,

      itemsUser: [
        {
          name: 'Mi perfil',
          id: 'myProfile',
          to: { name: 'profile' },
          icon: '',
          subItems: []
        },
        {
          name: 'Gestión de Usuarios',
          id: 'userManagement',
          to: { name: 'userManagement' },
          icon: '',
          subItems: []
        },
        {
          name: 'Gestión de Capas',
          id: 'capasManagement',
          to: { name: 'capasManagement' },
          icon: 'capasManagement',
          subItems: []
        },
        {
          name: 'GeoPortal',
          id: 'geoPortal',
          to: { name: 'geoPortal' },
          icon: '',
          subItems: []
        },
        {
          name: 'Estado de Datos',
          id: 'stateData',
          to: { name: 'stateData' },
          icon: '',
          subItems: []
        }
      ],

      itemsPortal: [
        {
          name: 'Capas',
          id: 'capas'
        },
        {
          name: 'Buscar por Coordenadas',
          id: 'Search'
        },
        {
          name: 'Consultar',
          id: 'consultar'
        },
        {
          name: 'Dibujos y Trazos',
          id: 'draw'
        },
        {
          name: 'Reportar Estadísticas',
          id: 'report'
        },
        {
          name: 'Información Geográfica',
          id: 'information'
        }
      ]
    }
  },
  mounted () {
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("active");
    });
  },

  methods: {
    openPanelPortal () {
      console.log('panel portal')
      this.panel = 2
    },

    showitem () {
      const element = document.getElementById('btnGreen')
      element.toggleClass()
    }
  },
}
</script>

<style lang="css" >
.panel {
  border: none;
  border-radius: 0px;
}

#wrapper {
  padding-left: 50px;
  transition: all 0.4s ease 0s;
  height: 100%;
}

#sidebar-wrapper {
  margin-left: -150px;
  left: 0px;
  width: 200px;
  background: #dddddd;
  position: fixed;
  height: 100%;
  z-index: 10000;
  transition: all 0.4s ease 0s;
}

.sidebar-nav {
  display: block;
  float: left;
  width: 200px;
  list-style: none;
  margin: 0;
  padding: 0;
}
#page-content-wrapper {
  padding-left: 0;
  margin-left: 0;
  width: 100%;
  height: auto;
}
#wrapper.active {
  padding-left: 200px;
}
#wrapper.active #sidebar-wrapper {
  left: 150px;
}

#page-content-wrapper {
  width: 100%;
}

#sidebar_menu li a,
.sidebar-nav li a {
  color: black;
  display: block;
  float: left;
  text-decoration: none;
  width: 100%;
  /* background: #252525;
  border-top: 1px solid #373737;
  border-bottom: 1px solid #1a1a1a; */
  -webkit-transition: background 0.5s;
  -moz-transition: background 0.5s;
  -o-transition: background 0.5s;
  -ms-transition: background 0.5s;
  transition: background 0.5s;
}
.sidebar_name {
  padding-top: 25px;
  color: #fff;
  opacity: 0.7;
}

.sidebar-nav li {
  line-height: 30px;
  text-indent: 20px;
}

.sidebar-nav li a {
  color: #999999;
  display: block;
  text-decoration: none;
}

/* .sidebar-nav li a:hover {
  color: #999999;
  background: rgba(255, 255, 255, 0.2);
  text-decoration: none;
} */

.sidebar-nav li a:active,
.sidebar-nav li a:focus {
  text-decoration: none;
}

.sidebar-nav > .sidebar-brand {
  height: 65px;
  line-height: 60px;
  font-size: 18px;
}

.sidebar-nav > .sidebar-brand a {
  color: #999999;
}

.sidebar-nav > .sidebar-brand a:hover {
  color: #fff;
  background: none;
}

/* #main_icon {
    float: right;
    padding-right: 65px;
    padding-top: 20px;
  } */
/* .sub_icon {
    float: right;
    padding-right: 65px;
    padding-top: 10px;
  } */

/* .sub_icon {
    padding-left: 2rem;
  } */

.content-header {
  height: 65px;
  line-height: 65px;
}

.content-header h1 {
  margin: 0;
  margin-left: 20px;
  line-height: 65px;
  display: inline-block;
}

@media (max-width: 767px) {
  #wrapper {
    padding-left: 70px;
    transition: all 0.4s ease 0s;
  }
  #sidebar-wrapper {
    left: 70px;
  }
  #wrapper.active {
    padding-left: 150px;
  }
  #wrapper.active #sidebar-wrapper {
    left: 150px;
    width: 150px;
    transition: all 0.4s ease 0s;
  }
}
</style>
