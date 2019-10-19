<template>
  <BaseModal
    title="Editar capa base"
    name-state="modalEditBaseLayer"
    :show-modal="modalEditBaseLayer"
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
        :disabled="$store.state.spinners.processingForm"
        @submit.prevent="submitForm"
      >
        <el-row
          :gutter="10"
          style="display:flex;"
        >
          <el-col
            :xs="24"
            :sm="12"
            :md="14"
          >
            <!-- base map name -->
            <el-form-item
              label="Nombre del Mapa Base"
              prop="name"
            >
              <el-input
                v-model="form.name"
                type="text"
                autocomplete="off"
              />
            </el-form-item>
            <!-- url base map -->
            <el-form-item
              label="URL"
              prop="url"
            >
              <el-input
                v-model="form.url"
                type="text"
                autocomplete="off"
              >
                <template slot="append">
                  <el-button
                    icon="el-icon-full-screen"
                    @click="previewBaseLayer"
                  ></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
            :md="10"
          >
            <div class="demo-image__error">
              <div
                id="map"
                class="map"
              ></div>
            </div>
          </el-col>
        </el-row>

        <el-form-item
          label="Referente"
          prop="author"
        >
          <el-input
            v-model="form.author"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Descripción"
          prop="description"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            autocomplete="off"
            :maxlength="300"
            :show-word-limit="true"
          />
        </el-form-item>
        <el-checkbox
          class="mb-3"
          v-model="checked"
        >¿Necesita Autenticación?</el-checkbox>
        <el-form-item
          label="Token"
          prop="authenticationToken"
          v-if="checked"
        >
          <el-input
            v-model="form.authenticationToken"
            type="text"
            autocomplete="off"
          />
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
        :disabled="$store.state.spinners.processingForm"
        @click="$_modalVisibilityMixin_close('modalEditBaseLayer')"
      >CANCELAR</el-button>
      <el-button
        size="small"
        :loading="$store.state.spinners.processingForm"
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

  props: {
    baseLayerSelected: {
      type: Object,
      default: null
    },
  },

  data () {
    return {
      map: null,
      tileLayer: null,
      checked: false,
      rangeZoom: [],
      form: {},
      marks: {
        1: "min: 1",
        20: "20 max"
      },
      rules: {
        name: [{
          required: true,
          message: "El nombre de usuario es requerido"
        }],
        url: [{
          required: true,
          message: "La url del mapa base es requrido"
        }]
      }
    };
  },

  watch: {
    modalEditBaseLayer: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields()
      } else {
        this.form = { ...this.baseLayerSelected }
        this.rangeZoom = [`${this.baseLayerSelected.minZoom}`, `${this.baseLayerSelected.maxZoom}`]
      }
    }
  },

  computed: {
    ...mapState({
      modalEditBaseLayer: state => state.modalsVisibilities.modalEditBaseLayer
    })
  },

  methods: {
    ...mapActions({
      getBaseLayers: "baseLayers/getBaseLayers"
    }),

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.updateBaseLayer()
        }
      })
    },

    updateBaseLayer () {
      this.form.minZoom = this.rangeZoom[0]
      this.form.maxZoom = this.rangeZoom[1]

      const data = this.form
      const id = this.form.id

      return new Promise((resolve, reject) => {
        this.$baseLayerAPI
          .update({ data, id })
          .then(response => {
            this.$_modalVisibilityMixin_close('modalEditBaseLayer')
            this.$toast.success(`Mapa Base registrado con éxito`)
            this.getBaseLayers()
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    previewBaseLayer () {
      if (!this.form.url) {
        return false
      }

      if (!this.map) {
        let latlng = L.latLng(-16.39, -71.53)
        this.map = L.map("map").setView(latlng, 5)
      }

      L.tileLayer(this.form.url, {
        attribution: "&copy; contributors"
      }).addTo(this.map)
    }
  }
};
</script>
<style lang="scss">
.map {
  height: 200px;
}
</style>