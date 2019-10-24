<template>
  <BaseModal
    title="Registrar nueva capa vectorial"
    :show-modal="modalAddVectorialLayer"
    name-state="modalAddVectorialLayer"
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
                :before-upload="beforeFileLayerUpload"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text pa-2">
                  <p class="ma-0">Suelta tu archivo .zip ó .shp aquí <br> ó <br><em>haz clic para cargar</em>
                  </p>
                </div>
              </el-upload>

              <ul
                v-if="fileLayerSelected"
                class="el-upload-list el-upload-list--text px-3"
              >
                <li
                  tabindex="0"
                  class="el-upload-list__item is-success"
                >
                  <a class="el-upload-list__item-name">
                    <i class="el-icon-document"></i>
                    {{ fileLayerSelected.name }}
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
        @click="$_modalVisibilityMixin_close('modalAddVectorialLayer')"
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
import objectToFormDataMixin from '@/mixins/objectToFormDataMixin'

export default {
  components: {
    BaseModal
  },

  mixins: [objectToFormDataMixin],

  data () {
    return {
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
      modalAddVectorialLayer: state => state.modalsVisibilities.modalAddVectorialLayer
    })
  },

  watch: {
    modalAddVectorialLayer (newState, oldState) {
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
      getVectorialLayers: "vectorialLayers/getVectorialLayers",
      getGroupLayers: 'groupLayers/getGroupLayers'
    }),

    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        const data = this.$_objectToFormDataMixin_transform();
        
        try {
          await this.$vectorialLayerAPI.create({ data })

          this.$refs.form.resetFields()
          this.getVectorialLayers()
          this.$toast.success(this.$SUCCESS.LAYER.REGISTERED)
          this.$_modalVisibilityMixin_close('modalAddVectorialLayer')

        } catch (e) {}
      }
    },

    launchUploadAvatar (option) {
      this.form.shapeFile = option.file;
      this.fileLayerSelected = option.file
      const nameFile = option.file.name.split('.')
      this.form.name = nameFile[0]
      this.form.title = nameFile[0]
    },

    beforeFileLayerUpload (file) {
      // const extension = (name.substring(name.lastIndexOf("."))).toLowerCase()
      const extension = `.${file.name.split('.').pop()}`
      const isSHP = extension === '.shp'
      const isZIP = extension === '.zip' || file.type === 'application/zip'

      let valid = isSHP || isZIP

      if (!valid) {
        this.$message.error("Solo se acepta archivos .zip ó .shp");
      }
      return valid
    },
    beforeFileStyleUpload (file) {
      // const extension = (name.substring(name.lastIndexOf("."))).toLowerCase()
      const extension = `.${file.name.split('.').pop()}`
      const isSHP = extension === '.sld'

      if (!isSHP) {
        this.$message.error("Solo se acepta archivos .zip ó .shp");
      }
      return isSHP
    }
  }
};
</script>
