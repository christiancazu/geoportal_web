<template>
  <BaseModal
    title="Publicar capa raster"
    :show-modal="showModalPublishRasterLayer"
    @action-modal="replaceShowModalPublishRasterLayer"
  >
    <template v-slot:content>
      <el-form
        v-if="currentRasterLayer"
        ref="form"
        label-position="top"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :disabled="processingForm"
        @submit.prevent="submitForm"
      >
        <!-- name -->
        <el-form-item
          label="Nombre de capa raster"
          prop="name"
        >
          <el-input
            v-model="form.name"
            type="text"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item
          label="Título"
          prop="title"
        >
          <el-input
            v-model="form.title"
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
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        size="small"
        :disabled="processingForm"
        @click="replaceShowModalPublishRasterLayer({ show: false })"
      >CANCELAR</el-button>
      <el-button
        size="small"
        :loading="processingForm"
        type="primary"
        native-type="submit"
        @click.prevent="submitForm"
      >PUBLICAR</el-button>
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
  data () {
    return {
      processingForm: false,
      form: {
        name: "",
        title: "",
        description: "",
      },
      rules: {
        name: [{
          required: true,
          message: "El nombre es requerido"
        }],
        title: [{
          required: true,
          message: "El título es requrido"
        }]
      }
    };
  },

  watch: {
    showModalPublishRasterLayer: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        return false;
      }
      this.form.name = this.currentRasterLayer.name
      this.form.title = this.currentRasterLayer.title
      this.form.pk = this.currentRasterLayer.pk
    }
  },

  computed: {
    ...mapState({
      showModalPublishRasterLayer: state => state.modalsManagementLayer.showModalPublishRasterLayer,
      currentRasterLayer: state => state.rasterLayers.currentRasterLayer
    })
  },

  methods: {
    ...mapActions({
      replaceShowModalPublishRasterLayer:
        "modalsManagementLayer/replaceShowModalPublishRasterLayer",
      getRasterLayers: "rasterLayers/getRasterLayers"
    }),

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.publishRasterLayer()
        }
      })
    },

    publishRasterLayer () {
      this.processingForm = true

      const data = this.form

      return new Promise((resolve, reject) => {
        this.$rasterLayerAPI
          .publish({ data })
          .then(response => {
            this.processingForm = false
            const { status } = response.data;
            if (status) {
              this.replaceShowModalPublishRasterLayer({ show: false })
              this.$toast.success(`Capa raster ha sido publicado con éxito`)
              this.getRasterLayers()
            }
            resolve(response)
          })
          .catch(error => {
            this.processingForm = false
            reject(error)
          })
      })
    }
  }
}
</script>
<style lang="scss">
.map {
  height: 200px;
}
</style>