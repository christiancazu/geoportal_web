<template>
  <BaseModal
    title="Agregar mapa base"
    name-state="modalAddBaseLayer"
    :show-modal="modalAddBaseLayer"
  >
    <template v-slot:content>
      <el-form
        ref="form"
        label-position="top"
        status-icon
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :disabled="processingForm"
        @submit.prevent="submitForm"
      >
        <el-row :gutter="10" style="display:flex;">
          <el-col :xs="24" :sm="12" :md="14">
            <!-- base map name -->
            <el-form-item label="Nombre del Mapa Base" prop="name">
              <el-input v-model="form.name" type="text" autocomplete="off" />
            </el-form-item>
            <!-- url base map -->
            <el-form-item label="URL" prop="url">
              <el-input v-model="form.url" type="text" autocomplete="off">
                <template slot="append">
                  <el-button icon="el-icon-full-screen" @click="previewBaseMap"></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="10">
            <div class="demo-image__error">
              <div id="map" class="map"></div>
              <!-- <el-image
                v-else
                class="w-100 h-100"
                fit="contain"
              >
                <div
                  slot="error"
                  class="image-slot"
                >
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>-->
            </div>
          </el-col>
        </el-row>

        <el-form-item label="Referente" prop="author">
          <el-input v-model="form.author" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Descripción" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            autocomplete="off"
            :maxlength="300"
            :show-word-limit="true"
          />
        </el-form-item>
        <el-checkbox class="mb-3" v-model="checked">¿Necesita Autenticación?</el-checkbox>
        <el-form-item label="Token" prop="authenticationToken" v-if="checked">
          <el-input v-model="form.authenticationToken" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Nivel de Zoom">
          <el-slider
            v-model="rangeZoom"
            range
            :min="1"
            :max="20"
            :marks="marks"
            class="mb-3 pl-5"
            style="width:80%;"
          ></el-slider>
        </el-form-item>

        <el-form-item class="text-xs-right">
          <el-switch
            v-model="form.isActive"
            :active-text="form.isActive ? 'Mapa Base Activo': ' Mapa Base Inactivo' "
          ></el-switch>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        size="small"
        :disabled="processingForm"
        @click="closeModal('modalAddBaseLayer')"
      >CANCELAR</el-button>
      <el-button
        size="small"
        :loading="processingForm"
        type="primary"
        native-type="submit"
        @click.prevent="submitForm"
      >GUARDAR</el-button>
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal.vue";

export default {
  components: {
    BaseModal
  },

  data() {
    return {
      map: null,
      tileLayer: null,
      checked: false,
      rangeZoom: [5, 18],
      processingForm: false,
      form: {
        name: "",
        url: "",
        description: "",
        author: "",
        minZoom: "",
        maxZoom: "",
        authenticationToken: "",
        isActive: true
      },
      marks: {
        1: "min: 1",
        100: "100 max"
      },
      rules: {
        name: [
          {
            required: true,
            message: "El nombre de usuario es requerido"
          }
        ],
        url: [
          {
            required: true,
            message: "La url del mapa base es requrido"
          }
        ]
      }
    };
  },

  watch: {
    modalAddBaseLayer: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        return false;
      }
    }
  },

  computed: {
    ...mapState({
      modalAddBaseLayer: state => state.modals.modalAddBaseLayer
    })
  },

  methods: {
    ...mapActions({
      replaceShowModalAddBaseMap:
        "modalsManagementLayer/replaceShowModalAddBaseMap",
      getBaseMaps: "baseLayers/getBaseMaps"
    }),

    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.createBaseMap();
        }
      });
    },

    createBaseMap() {
      this.processingForm = true;
      this.form.minZoom = this.rangeZoom[0];
      this.form.maxZoom = this.rangeZoom[1];

      const data = this.form;

      return new Promise((resolve, reject) => {
        this.$baseMapAPI
          .create({ data })
          .then(response => {
            this.processingForm = false;
            const { status } = response.data;
            if (status) {
              this.replaceShowModalAddBaseMap({ show: false });
              this.$toast.success(`Mapa Base registrado con éxito`);
              this.getBaseMaps();
            }
            resolve(response);
          })
          .catch(error => {
            this.processingForm = false;
            reject(error);
          });
      });
    },

    previewBaseMap() {
      if (!this.form.url) {
        return false;
      }

      if (!this.map) {
        let latlng = L.latLng(-16.39, -71.53);
        this.map = L.map("map").setView(latlng, 5);
      }

      L.tileLayer(this.form.url, {
        attribution: "&copy; contributors"
      }).addTo(this.map);
    }
  }
};
</script>
<style lang="scss">
.map {
  height: 200px;
}
</style>