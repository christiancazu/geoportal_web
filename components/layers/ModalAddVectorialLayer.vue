<template>
  <base-form
    :form-title="formTitle"
    :form="form"
    :rules="rules"
    :store-base="storeBase"
    :modal-state-name="modalStateName"
    :store-action="storeAction"
    :message-toast-base-name="messageToastBaseName"
    :message-toast-action="messageToastAction"
    @reset-form="resetForm()"
  >
    <template v-slot:content>
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

            <upload-file 
              :available-file-extensions="availableFileExtensions"
              @on-file-valid="onFileValid"
             />

            <ul
              v-if="fileSelected"
              class="el-upload-list el-upload-list--text px-3"
            >
              <li
                tabindex="0"
                class="el-upload-list__item is-success"
              >
                <a class="el-upload-list__item-name">
                  <i class="el-icon-document"></i>
                  {{ fileSelected.name }}
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
                :loading="$store.state.spinners.loadingTable"
                filterable
                placeholder="Select"
              >
                <el-option
                  v-for="item in groupLayers"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id"
                />
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
    </template>
  </base-form>
</template>
<script>
import BaseForm from '@/components/base/BaseForm'
import UploadFile from '@/components/UploadFile'

import { mapState, mapActions } from "vuex"

export default {
  components: {
    BaseForm, UploadFile
  },

  data () {
    return {
      formTitle: 'Registrar capa vectorial',
      // state context
      modalStateName: 'modalAddVectorialLayer',
      storeBase: 'vectorialLayers',
      storeAction: 'create',
      // message context
      messageToastBaseName: 'LAYER',
      messageToastAction: 'REGISTERED',
      // file settings
      fileType: 'shapeFile',
      availableFileExtensions: ['.shp', '.zip'],
      fileSelected: null,
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
      groupLayers: state => state.groupLayers.dataContext
    })
  },

  mounted () {
    this.getGroupLayers()
  },

  methods: {
    ...mapActions({
      getGroupLayers: 'groupLayers/getDataContext'
    }),

    resetForm () {
      if (this.form.shapeFile) {
        this.form.shapeFile = null
        this.fileSelected = null
      }
    },

    onFileValid(file) {
      this.form[this.fileType] = file;
      this.fileSelected = file;
      const nameFile = file.name.split(".");
      this.form.name = nameFile[0];
      this.form.title = nameFile[0];
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
}
</script>
