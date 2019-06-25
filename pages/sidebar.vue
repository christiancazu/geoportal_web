<template>
  <div>
    <div class="wrapper">
      <div class="menu">
        <ul>
          <li>
            <a href="#">
              <img
                class="icon"
                src="http://bit.do/iconUrl"
              >
              <p class="text">Text 1</p>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                class="icon"
                src="http://bit.do/iconUrl"
              >
              <p class="text">Text 2</p>
            </a>
          </li>
          <li>
            <a href="#">
              <img
                class="icon"
                src="http://bit.do/iconUrl"
              >
              <div class="text">

                <button
                  type="button"
                  class="btn btn-default"
                  data-toggle="collapse"
                  data-target="#veoxportal-consultas"
                  aria-expanded="false"
                  aria-controls="veoxportal-consultas"
                >Left</button>
                <!-- <button
                  class="btn btn-success btn-xs pull-right"
                  type="button"
                  data-toggle="collapse"
                  data-target="#veoxportal-consultas"
                  aria-expanded="false"
                  aria-controls="veoxportal-consultas"
                >Abrir</button>
              </div> -->
                <div class="panel-body">
                  <div
                    id="veoxportal-consultas"
                    class="veoxportal-contenido collapse"
                  >Elementos</div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="content">
        <button id="togglebutton">&#9776;</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted () {
    $('#togglebutton').click(function () {
      if ($(window).width() > 500) { //your chosen mobile res
        $('.text').toggle(300);
      } else {
        $('.menu').animate({
          width: 'toggle'
        }, 350);
      }
    });
  }
}
</script>

<style lang="css">
.wrapper {
  width: 250px;
}
.menu {
  background: #dddddd;
  float: left;
  display: block;
  min-width: 100%;
}

.icon {
  max-width: 1em;
}

.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0.2em 0.5em;
}

.menu li {
  margin: 0;
}

.menu a,
.menu a:visited {
  color: white;
  text-decoration: none;
}

.text {
  display: inline;
  margin: 0;
}

.content {
  display: block;
}

button {
  margin: 1em;
}

@media only screen and (max-width: 500px) {
  .text {
    display: none;
  }
}
</style>