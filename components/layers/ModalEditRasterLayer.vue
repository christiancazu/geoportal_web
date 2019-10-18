<template>
  <BaseModal
    title="Modificar capa raster"
    :show-modal="modalEditRasterLayer"
    name-state="modalEditRasterLayer"
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
            <el-form-item
              prop="order"
              size="mini"
              :inline-message="true"
            >
              <label
                class="pr-2"
                for=""
              >N° de orden: </label>
              <el-input-number
                size="mini"
                v-model="form.order"
                controls-position="right"
                :min="1"
                type="number"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="Título"
          prop="title"
        >
          <el-input
            v-model="form.title"
            type="text"
            autocomplete="off"
            :rules="rules.title"
          />
        </el-form-item>
        <el-form-item
          label="Grupo"
          prop="groupLayerId"
        >
          <el-container>
            <el-select
              v-model="form.groupLayerId"
              value-key="id"
              :loading="loadingGroupLayers"
              filterable
              placeholder="Select"
            >
              <el-option
                v-for="item in groupLayers"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-container>
        </el-form-item>
        <!-- Descripción -->
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
        <el-form-item
          label="¿Habilitado?"
          prop="status"
        >
          <el-switch
            v-model="form.status"
            :active-text="form.status? 'SI': 'NO'"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        :disabled="processingForm"
        size="small"
        @click="$_modalVisibilityMixin_close('modalEditRasterLayer')"
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
        GUARDAR
      </el-button>
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal";
import objectToFormDataMixin from '@/mixins/objectToFormDataMixin'

export default {
  components: {
    BaseModal
  },

  mixins: [objectToFormDataMixin],

  data () {
    return {
      processingForm: false,
      fileLayerSelected: null,
      fileStyleSelected: null,
      showFormStyle: false,
      form: {
        order: null,
        title: "",
        name: "",
        groupLayerId: '',
        description: "",
        status: true
      },

      rules: {
        title: [{
          required: true,
          message: "El nombre de usuario es requerido"
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
        }],
        order: [{
          required: true,
          message: " "
        }],
      }
    };
  },

  computed: {
    ...mapState({
      currentRasterLayer: state => state.rasterLayers.currentRasterLayer,
      groupLayers: state => state.groupLayers.groupLayers,
      loadingGroupLayers: state => state.groupLayers.loadingGroupLayers,
      modalEditRasterLayer: state => state.modalsVisibilities.modalEditRasterLayer
    })
  },

  watch: {
    modalEditRasterLayer (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        this.fileLayerSelected = null
        return false;
      }
      this.getGroupLayers()
    },

    currentRasterLayer (newState, oldState) {
      this.form.order = this.currentRasterLayer.order
      this.form.title = this.currentRasterLayer.title
      this.form.description = this.currentRasterLayer.description
      this.form.groupLayerId = this.currentRasterLayer.groupLayerId
    }
  },

  methods: {
    ...mapActions({
      getGroupLayers: 'groupLayers/getGroupLayers',
      getRasterLayers: 'rasterLayers/getRasterLayers',
      updateRasterLayer: 'rasterLayers/updateRasterLayer',
    }),

    async submitForm () {
      this.processingForm = false
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        const data = this.$_objectToFormDataMixin_transform();

        try {          
          await this.updateRasterLayer({
            id: this.currentRasterLayer.id,
            data
          })
          this.$refs.form.resetFields()
          this.$toast.success(this.$SUCCESS.LAYER.UPDATED)

          await this.getRasterLayers()

        } catch (error) {
          const errorMessage = typeof error.response !== 'undefined' ? error.response.data : this.$ERRORS.ERROR_TRY_LATER
          this.$toast.error(errorMessage)

        } finally {
          this.processingForm = false
        }
      }
    },

    launchUploadAvatar (option) {
      this.form.file = option.file;
      this.fileLayerSelected = option.file
      const nameFile = option.file.name.split('.')
      this.form.name = nameFile[0]
      this.form.title = nameFile[0]
    }
  }
};
</script>
