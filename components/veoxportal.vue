<template>
  <section>
    <section id="veoxportal">
      <div id="veoxportal-menu" class="easy-sidebar">
        <div>
          <div class="panel panel-default">
            <div class="panel-heading">
              <span class="panel-title">Capas</span>
              <button
                class="btn btn-success btn-xs pull-right"
                type="button"
                data-toggle="collapse"
                data-target="#veoxportal-capas"
              >Abrir</button>
            </div>
            <div id="veoxportal-capas" class="panel panel-default">
              <div class="panel-heading">
                <span class="panel-title">Agua</span>
                <button
                  class="btn btn-success btn-xs pull-right"
                  type="button"
                  data-toggle="collapse"
                  data-target="#veoxportal-capas"
                >Abrir</button>
              </div>
              <div class="list-group collapse">
                <a href="#" class="list-group-item">
                  <input type="checkbox" name id> Capa de ejemplo
                </a>
                <a href="#" class="list-group-item">
                  <input type="checkbox" name id> Capa de ejemplo
                </a>
                <a href="#" class="list-group-item">
                  <input type="checkbox" name id> Capa de ejemplo
                </a>
              </div>
            </div>
          </div>

          <div class="panel panel-default">
            <div class="panel-heading">
              <span class="panel-title">Consultas</span>
              <button
                class="btn btn-success btn-xs pull-right"
                type="button"
                data-toggle="collapse"
                data-target="#veoxportal-consultas"
                aria-expanded="false"
                aria-controls="veoxportal-consultas"
              >Abrir</button>
            </div>
            <div class="panel-body">
              <div id="veoxportal-consultas" class="veoxportal-contenido collapse">Elementos</div>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-danger easy-sidebar-toggle">Toggle Sidebar</button>
      <div id="veoxportal-mapa"></div>
    </section>
  </section>
</template>

<script>
export default {
  mounted() {
    (function($) {
      $.detectSwipe = {
        version: "2.1.1",
        enabled: "ontouchstart" in document.documentElement,
        preventDefault: true,
        threshold: 20
      };

      var startX,
        startY,
        isMoving = false;

      function onTouchEnd() {
        this.removeEventListener("touchmove", onTouchMove);
        this.removeEventListener("touchend", onTouchEnd);
        isMoving = false;
      }

      function onTouchMove(e) {
        if ($.detectSwipe.preventDefault) {
          e.preventDefault();
        }
        if (isMoving) {
          var x = e.touches[0].pageX;
          var y = e.touches[0].pageY;
          var dx = startX - x;
          var dy = startY - y;
          var dir;
          if (Math.abs(dx) >= $.detectSwipe.threshold) {
            dir = dx > 0 ? "left" : "right";
          } else if (Math.abs(dy) >= $.detectSwipe.threshold) {
            dir = dy > 0 ? "down" : "up";
          }
          if (dir) {
            onTouchEnd.call(this);
            $(this)
              .trigger("swipe", dir)
              .trigger("swipe" + dir);
          }
        }
      }

      function onTouchStart(e) {
        if (e.touches.length == 1) {
          startX = e.touches[0].pageX;
          startY = e.touches[0].pageY;
          isMoving = true;
          this.addEventListener("touchmove", onTouchMove, false);
          this.addEventListener("touchend", onTouchEnd, false);
        }
      }

      function setup() {
        this.addEventListener &&
          this.addEventListener("touchstart", onTouchStart, false);
      }

      function teardown() {
        this.removeEventListener("touchstart", onTouchStart);
      }

      $.event.special.swipe = {
        setup: setup
      };

      $.each(["left", "up", "down", "right"], function() {
        $.event.special["swipe" + this] = {
          setup: function() {
            $(this).on("swipe", $.noop);
          }
        };
      });
    })(jQuery);

    $(".easy-sidebar-toggle").click(function(e) {
      e.preventDefault();
      $("#veoxportal").toggleClass("toggled");
      $(".veoxportal-menu.easy-sidebar").removeClass("toggled");
    });

    var map = L.map("veoxportal-mapa", {}).setView([51.505, -0.09], 4);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19
    }).addTo(map);

    var source = L.WMS.source(
      "http://mapas.geoidep.gob.pe/geoidep/services/Educacion/MapServer/WMSServer",
      {
        transparent: true,
        format: "image/png"
      }
    );

    var layers = {
      "Capa 0": source.getVectorialLayer("0"),
      "Capa 1": source.getVectorialLayer("1"),
      "Capa 2": source.getVectorialLayer("2")
    };
    L.control.layers(layers).addTo(map);
  }
};
</script>

<style scoped>
#veoxportal {
  transition: 0.2s ease;
  min-height: 100%;
  margin: 0;
  padding: 0;
}

#veoxportal.toggled {
  -webkit-transform: translateX(250px);
  transform: translateX(250px);
}

#veoxportal-menu {
  height: 100vh;
  background-color: #ddd;
}

#veoxportal-menu.easy-sidebar {
  transition: 0.2s ease;
  position: absolute;
  width: 250px;
  top: 0;
  left: -250px;
  min-height: 100%;
  border-radius: 0;
  margin: 0;
  z-index: 9999;
}

#veoxportal-menu.easy-sidebar.toggled {
  -webkit-transform: translateX(250px);
  transform: translateX(250px);
}

@media (max-width: 768px) {
  #veoxportal.toggled {
    position: fixed;
  }
}

#veoxportal-menu .panel {
  margin-bottom: 0;
  border-radius: 0;
  border-bottom: none;
}

#veoxportal-menu .panel .panel-body {
  padding: 0;
}
.veoxportal-contenido {
  margin: 8px;
}

#veoxportal-mapa {
  height: 100vh;
}
</style>