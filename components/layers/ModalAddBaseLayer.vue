<template>
<base-form
  :form-title="formTitle"
  :form="form"
  :rules="rules"
  :context="context"
  :message-toast="messageToast"
  @clear-form="clearForm"
>
  <template v-slot:content>
    <el-row :gutter="10">

      <!-- tooltip -->
      <el-col>
        <el-alert
          :title="alert.title"
          :description="alert.description"
          :closable="false"
          type="info"
          effect="dark"
          show-icon
          class="mb-3 mt-0"
        />
      </el-col>

      <el-col
        :xs="24" :sm="12"
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
              <el-tooltip
                :content="tooltip.preview ? tooltip.messagePreview : tooltip.messageNotUrl"
                :placement="tooltip.preview ? 'top' : 'bottom'"
              >
                <el-button
                  icon="el-icon-full-screen"
                  @click="previewBaseMap"
                />
              </el-tooltip>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item
          prop="isUrlValid"
        >
          <el-checkbox
            v-model="form.isUrlValid"
          >
            Estoy seguro que la URL es válida
          </el-checkbox>
        </el-form-item>

      </el-col>
      <el-col
        :xs="24" :sm="12"
      >
        <transition
          name="page"
        >
          <div v-if="validUrlToPreviewMap">
            <label>Mapa previo</label>
            <marker-geo-json
              :tile-layer="tileLayer"
              @on-tile-error="onTileError"
            />
          </div>
        </transition>
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
        show-word-limit
      />
    </el-form-item>

    <el-checkbox
      v-model="needAuthentication"
      class="mb-3"
    >
      Necesita Autenticación
    </el-checkbox>
    <el-form-item
      v-if="needAuthentication"
      label="Token"
      prop="authenticationToken"
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
      />
    </el-form-item>

    <el-form-item class="text-xs-right">
      <el-switch
        v-model="form.isActive"
        :active-text="form.isActive ? 'Mapa Base Activo': ' Mapa Base Inactivo' "
      />
    </el-form-item>
  </template>
</base-form>
</template>

<script>
import BaseBaseLayer from './BaseBaseLayer'

import {
  name,
  url,
  isUrlValid
} from '@/config/form.rules'

export default {
  extends: BaseBaseLayer,

  data () {
    return {
      formTitle: 'Registrar mapa base',

      context: {
        storeBase: 'baseLayers',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'create',
      },
      messageToast: {
        baseName: 'LAYER',
        action: 'REGISTERED'
      },
      tileLayer: {
        url: ''
      },
      needAuthentication: false,
      validUrlToPreviewMap: false,

      alert: {
        title: 'Importante',
        description: 'Si al presionar la vista previa del mapa se muestra en blanco la URL podría ser no válida.'
      },
      tooltip: {
        preview: true,
        messagePreview : 'Ver vista previa del mapa',
        messageNotUrl : 'Debe indicar una URL válida para ver la vista previa del mapa'
      },
      rangeZoom: [
        5,
        18
      ],
      marks: {
        1: 'min: 1',
        20: 'max: 20'
      },
      form: {
        name: '',
        url: '',
        description: '',
        author: '',
        minZoom: '',
        maxZoom: '',
        authenticationToken: '',
        isActive: true,
        isUrlValid: false // only used on front-end form to confirm if url is valid
      },
      rules: {
        name: name('mapa base'),
        url,
        isUrlValid,
        // dynamic rule if checkbock needAuthentication is checked
        authenticationToken: [
          {
            // eslint-disable-next-line no-unused-vars
            validator: (rule, value, callback) => {
              if (this.needAuthentication && !value) {
                return callback(new Error("El token es requerido"))
              }
              callback()
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },

  watch: {
    rangeZoom () {
      this.form.minZoom = this.rangeZoom[0]
      this.form.maxZoom = this.rangeZoom[1]
    }
  },

  methods: {
    clearForm () {
      this.validUrlToPreviewMap = false
    }
  },
}
</script>
