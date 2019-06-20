<template>
  <nav
    class="navbar navbar-inverse navbar-static-top navbar-fixed-top mb-0"
    role="navigation"
  >
    <div class="container">
      <div class="navbar-header">
        <button
          type="button"
          class="navbar-toggle"
          data-toggle="collapse"
          data-target=".Menu"
        >
          <span class="sr-only">Menu</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a
          class="navbar-brand"
          href="#"
        >Geoportal</a>
      </div>
      <div class="collapse navbar-collapse Menu">
        <ul class="nav navbar-nav">
          <li><a href="#">Gestión</a></li>
          <li><a href="#">Ayuda</a></li>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li><a href="#">Configuración</a></li>
          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
            >
              <img src="icon/user-circle-regular.svg"/>
              <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#">Administrar</a></li>
              <li><a href="#">Mi Perfil</a></li>
              <li><a href="#">Cerrar Sesión</a></li>
              <li><a href="#">Reportar</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
