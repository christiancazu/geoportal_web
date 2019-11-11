<template>
<base-modal
  title="Publicar capa raster"
  name-state="modalPublishRasterLayer"
  :show-modal="modalPublishRasterLayer"
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
      :disabled="$store.state.spinners.processingForm"
      @submit.prevent="submitForm"
    >

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
      :disabled="$store.state.spinners.processingForm"
      @click="$_modalVisibilityMixin_close('modalPublishRasterLayer')"
    >CANCELAR</el-button>
    <el-button
      size="small"
      :loading="$store.state.spinners.processingForm"
      type="primary"
      native-type="submit"
      @click.prevent="submitForm"
    >PUBLICAR</el-button>
  </template>
</base-modal>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import BaseModal from '@/components/base/BaseModal.vue'

export default {
  components: {
    BaseModal
  },
  data () {
    return {
      form: {
        title: '',
        description: '',
      },
      rules: {
        title: [
          {
            required: true,
            message: 'El título es requrido'
          }
        ]
      }
    }
  },



  computed: {
    ...mapState({
      modalPublishRasterLayer: state => state.modalsVisibilities.modalPublishRasterLayer,
      currentRasterLayer: state => state.rasterLayers.currentRasterLayer
    })
  },

  watch: {
    modalPublishRasterLayer: function (newState, /*oldState*/) {
      if (!newState) {
        this.$refs.form.resetFields()
        return false
      }
      this.form.title = this.currentRasterLayer.title
      this.form.identificator = this.currentRasterLayer.identificator
    }
  },

  methods: {
    ...mapActions({
      getRasterLayers: 'rasterLayers/getRasterLayers'
    }),

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.publishRasterLayer()
        }
      })
    },

    publishRasterLayer () {

      const data = this.form

      console.log(data)

      return new Promise((resolve, reject) => {
        this.$rasterLayerAPI
          .publish({ data })
          .then(response => {
            this.$_modalVisibilityMixin_close('modalPublishRasterLayer')
            this.$toast.success('Capa raster ha sido publicado con éxito')
            this.getRasterLayers()
            resolve(response)
          })
          .catch(error => {
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