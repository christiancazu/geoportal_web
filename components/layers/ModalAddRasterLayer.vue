<template>
  <BaseModal
    title="Registrar nueva capa raster"
    :show-modal="modalAddRasterLayer"
    name-state="modalAddRasterLayer"
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
        <el-row
          :gutter="10"
          align="bottom"
          justify="center"
        >
          <el-col :md="12">
            <!-- file -->
            <el-form-item
              class="text-xs-center upload-file"
              prop="file"
            >
              <el-upload
                ref="uploadFile"
                class="upload-demo"
                drag
                action
                :http-request="launchUploadAvatar"
                :show-file-list="false"
                :before-upload="beforeFileUpload"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text pa-2">
                  <p class="ma-0">Suelta tu archivo .zip aquí <br> ó <br><em>haz clic para cargar</em>
                  </p>
                </div>
              </el-upload>

              <ul
                v-if="fileRasterLayerSelected"
                class="el-upload-list el-upload-list--text px-3"
              >
                <li
                  tabindex="0"
                  class="el-upload-list__item is-success"
                >
                  <a class="el-upload-list__item-name">
                    <i class="el-icon-document"></i>
                    {{ fileRasterLayerSelected.name }}
                  </a>
                  <label class="el-upload-list__item-status-label">
                    <i class="el-icon-upload-success el-icon-circle-check"></i>
                  </label>
                  <i class="el-icon-close"></i>
                  <i class="el-icon-close-tip">delete</i>
                </li>

              </ul>
            </el-form-item>
          </el-col>
          <el-col :md="12">
            <!-- title -->
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

            <!-- name -->
            <el-form-item
              label="Nombre de Capa"
              prop="name"
            >
              <el-input
                v-model="form.name"
                type="text"
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
          </el-col>
        </el-row>
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
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        :disabled="$store.state.spinners.processingForm"
        size="small"
        @click="$_modalVisibilityMixin_close('modalAddRasterLayer')"
      >
        CANCELAR
      </el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        :loading="$store.state.spinners.processingForm"
        @click.prevent="submitForm"
      >
        GUARDAR
      </el-button>
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
      fileRasterLayerSelected: null,
      fileStyleSelected: null,
      showFormStyle: false,
      form: {
        title: "",
        order: 0,
        name: "",
        rasterFile: null,
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
      modalAddRasterLayer: state => state.modalsVisibilities.modalAddRasterLayer
    })
  },

  watch: {
    modalAddRasterLayer (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        this.fileRasterLayerSelected = null
        return false;
      }
      this.getGroupLayers()
    }
  },

  methods: {

    ...mapActions({
      getRasterLayers: 'rasterLayers/getRasterLayers',
      getGroupLayers: 'groupLayers/getGroupLayers'
    }),

    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        const data = this.$_objectToFormDataMixin_transform();
        
        try {
          await this.$rasterLayerAPI.create({ data })

          this.$refs.form.resetFields()
          this.getRasterLayers()
            this.$_modalVisibilityMixin_close('modalAddRasterLayer')
          this.$toast.success(this.$SUCCESS.LAYER.REGISTERED)

        } catch (e) {}
      }
    },

    launchUploadAvatar (option) {
      this.form.rasterFile = option.file;
      this.fileRasterLayerSelected = option.file
      const nameFile = option.file.name.split('.')
      this.form.name = nameFile[0]
      this.form.title = nameFile[0]
    },

    beforeFileUpload (file) {
      const extension = `.${file.name.split('.').pop()}`
      const isZIP = extension === '.zip' || file.type === 'application/zip'
      const isRAR = extension === '.rar' || file.type === 'application/rar'

      let valid = isZIP || isRAR

      if (!valid) {
        this.$message.error("Solo se acepta archivos .zip");
      }
      return valid
    }
  }
};
</script>
