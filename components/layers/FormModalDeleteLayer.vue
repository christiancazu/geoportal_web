<template>
  <BaseModal
    title="Eliminar capa vectorial"
    :show-modal="showModalDeleteLayer"
    @action-modal="replaceShowModalDeleteLayer"
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
        <el-row :gutter="14">
          <el-col
            :xs="24"
            :md="{span:12, offset:12}"
            :sm="24"
            :lg="{span:12, offset:12}"
            class="text-xs-center"
          >
            <h1>gasdas</h1>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        :disabled="processingForm"
        size="small"
        @click="replaceShowModalDeleteLayer({ show: false })"
      >
        CANCELAR
      </el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        :loading="processingForm"
        @click.prevent="submitForm"
      >
        ELIMINAR
      </el-button>
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal.vue";
import { SUCCESS } from '@/config/messages'

export default {
  components: {
    BaseModal
  },
  data () {
    return {
      processingForm: false,
      fileLayerSelected: null,
      fileStyleSelected: null,
      showFormStyle: false,
      form: {
        title: "",
        order: 0,
        name: "",
        shapeFile: null,
        groupLayerId: '',
        description: ""
      },

      rules: {
        title: [{
          required: true,
          message: "El nombre de usuario es requerido"
        }],
        groupLayerId: [{
          required: true,
          message: "Seleccione un Grupo de capa"
        }],
        order: [{
          required: true,
          type: 'number',
          message: " "
        }],
        name: [{
          required: true,
          // pattern: /^[z0-9\s.,\/#!$%\^&\*;:{}=\-+'´`~()”“"…]+$/g,
          validator: (rule, value, callback) => {
            let text = value.split('')
            let itContainsBlanks = text.every(val => /[a-zA-Z0-9_]/g.test(val))
            if (!itContainsBlanks) {
              return callback(new Error("Solo se admite letras y subguion '_'"))
            }
            callback();
          }
        }]
      }
    };
  },

  computed: {
    ...mapState({
      groupLayers: state => state.groupLayers.groupLayers,
      loadingGroupLayers: state => state.groupLayers.loadingGroupLayers,
      showModalDeleteLayer: state => state.modalsManagementLayer.showModalDeleteLayer
    })
  },

  watch: {
    showModalDeleteLayer (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        this.fileLayerSelected = null
        return false;
      }
      this.getGroupLayers()
    }
  },

  methods: {
    ...mapActions({
      replaceShowModalDeleteLayer: "modalsManagementLayer/replaceShowModalDeleteLayer",
      getLayers: "layers/getLayers",
      getGroupLayers: 'groupLayers/getGroupLayers'
    }),

    async submitForm () {
      let isFormValid = false
      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        this.processingForm = true

        const data = this.objectToFormData();
        
        try {
          await this.$layerAPI.create({ data })

          this.$refs.form.resetFields()
          this.replaceShowModalDeleteLayer({ show: false })
          this.getLayers()
          this.$toast.success(SUCCESS.LAYER.REGISTERED)

        } catch (error) {
          const errorMessage = typeof error.response !== 'undefined' ? error.response.data : ERRORS.ERROR_TRY_LATER
          this.$toast.error(errorMessage)

        } finally {
          this.processingForm = false
        }
      }
    }
  }
};
</script>
