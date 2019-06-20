<template>
  <nav
    class="navbar navbar-inverse navbar-static-top"
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
        >Geoprtal</a>
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
              <i class="far fa-user-circle"></i>
              <b class="caret"></b>
            </a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
