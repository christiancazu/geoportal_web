<template>
  <BaseModal
    title="Registrar nueva capa"
    :show-modal="showModalAddLayer"
    @action-modal="replaceShowModalAddLayer"
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
                :rules="rules.name"
              />
            </el-form-item>
            <el-form-item
              label="Grupo"
              prop="group"
            >
              <el-container>
                <el-select
                  v-model="form.groupId"
                  value-key="id"
                  :loading="loadingGroupLayers"
                  filterable
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in groupLayers"
                    :key="item.id"
                    :label="item.name"
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

        <el-checkbox
          class="font-weight-bold mb-2"
          v-model="showFormStyle"
        >Agregar Style</el-checkbox>
        <div v-if="showFormStyle">
          <div class="my-3 py-2">
            <el-divider content-position="left">
              <strong>Agregar Style</strong>
            </el-divider>
          </div>
          <!-- add style -->
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
                  :data="{style: true}"
                  action
                  :http-request="launchUploadAvatar"
                  :show-file-list="false"
                  :before-upload="beforeFileStyleUpload"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text pa-2">
                    <p class="ma-0">Suelta tu archivo .zip ó .shp aquí <br> ó <br><em>haz clic para cargar</em>
                    </p>
                  </div>
                </el-upload>
                <ul
                  v-if="fileStyleSelected"
                  class="el-upload-list el-upload-list--text px-3"
                >
                  <li
                    tabindex="0"
                    class="el-upload-list__item is-success"
                  >
                    <a class="el-upload-list__item-name">
                      <i class="el-icon-document"></i>
                      {{ fileStyleSelected.name }}
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
              <!-- nameStyle -->
              <el-form-item
                label="Nombre"
                prop="nameStyle"
              >
                <el-input
                  v-model="form.nameStyle"
                  type="text"
                  autocomplete="off"
                  :rules="rules.nameStyle"
                />
              </el-form-item>

              <!-- descriptionStyle -->
              <el-form-item
                label="Descripción"
                prop="descriptionStyle"
              >
                <el-input
                  v-model="form.descriptionStyle"
                  type="textarea"
                  :rows="3"
                  autocomplete="off"
                  :maxlength="300"
                  :show-word-limit="true"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        :disabled="processingForm"
        size="small"
        @click="replaceShowModalAddLayer({ show: false })"
      >CANCELAR</el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        :loading="processingForm"
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
  data () {
    return {
      processingForm: false,
      fileLayerSelected: null,
      fileStyleSelected: null,
      showFormStyle: false,
      form: {
        title: "",
        name: "",
        file: null,
        groupId: '',
        description: "",
        nameStyle: "",
        fileStyle: null,
        descriptionStyle: ""
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
            let itContainsBlanks = text.every(val => /[a-zA-Z_]/g.test(val))
            if (!itContainsBlanks) {
              return callback(new Error("Solo se admite letras y subguion '_'"))
            }
            callback();
          }
        }],
        nameStyle: [{
          required: true,
          validator: (rule, value, callback) => {
            console.log(rule, value)
            // if () {
            //   return callback(new Error("Seleccione su Provincia"));
            // }
            callback();
          }
        }],
      }
    };
  },

  computed: {
    ...mapState({
      groupLayers: state => state.groupLayers.groupLayers,
      loadingGroupLayers: state => state.groupLayers.loadingGroupLayers
    }),

    showModalAddLayer: {
      get () {
        return this.$store.state.modalsManagementLayer.showModalAddLayer;
      },
      set (value) {
        this.replaceShowModalAddLayer({ show: value });
      }
    }
  },

  watch: {
    showModalAddLayer: function (newState, oldState) {
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
      replaceShowModalAddLayer: "modalsManagementLayer/replaceShowModalAddLayer",
      getLayers: "layers/getLayers",
      getGroupLayers: 'groupLayers/getGroupLayers'
    }),

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.processingForm = true
          this.createLayer().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.form.resetFields();
              this.replaceShowModalAddLayer({ show: false });
              this.getLayers();
              this.$toast.success(`La capa se registro con éxito`)
            }
          });
        }
      });
    },

    createLayer () {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        if (!!this.form[val])
          formData.append(val, this.form[val]);
      });

      const data = formData;

      return new Promise((resolve, reject) => {
        this.$layerAPI
          .create({ data })
          .then(response => {
            this.processingForm = false
            resolve(response);
          })
          .catch(error => {
            this.processingForm = false
            reject(error)
          });
      });
    },

    launchUploadAvatar (option) {
      if (!option.data) {
        this.form.file = option.file;
        this.fileLayerSelected = option.file
      } else if (option.data.style) {
        this.form.fileStyle = option.file;
        this.fileStyleSelected = option.file
      }
    },

    beforeFileLayerUpload (file) {
      // const extension = (name.substring(name.lastIndexOf("."))).toLowerCase()
      const extension = `.${file.name.split('.').pop()}`
      const isSHP = extension === '.shp'
      const isZIP = extension === '.zip' || file.type === 'application/zip'
      const isRAR = extension === '.rar' || file.type === 'application/rar'

      let valid = isSHP || isZIP || isRAR

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
