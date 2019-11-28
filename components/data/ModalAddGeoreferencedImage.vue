<template>
<base-form
  :form-title="formTitle"
  :form="form"
  :rules="rules"
  :context="context"
  :message-toast="messageToast"
  @apply-custom-functionality-to-form="ApplyCustomFunctionalityToForm"
>
  <template v-slot:content>
    <el-row
      :gutter="10"
      align="bottom"
      justify="center"
    >
      <el-col>
        <el-form-item
          label="GeoJSON"
          prop="geometry"
        >

          <marker-geo-json
            @on-marker-lng-lat="onMarkerLngLat"
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
          label="Imagen georeferencial"
          class="text-xs-center upload-file"
          prop="image"
        >

          <upload-file
            :file="file"
            type-image
            @on-file-valid="$_uploadFileMixin_valid"
            @delete-file="$_uploadFileMixin_clear()"
          />

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

        <!-- geometry -->
        <el-form-item
          label="Descripción"
          prop="description"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
            autocomplete="off"
            :maxlength="300"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </template>
</base-form>
</template>

<script>
/* eslint-disable array-element-newline */
/* eslint-disable array-bracket-newline */
import MarkerGeoJson from '@/components/leafLet/MarkerGeoJson'

import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'
import uploadFileMixin from '@/mixins/uploadFileMixin'

import {
  title,
  geometry,
  image
} from '@/config/form.rules'

export default {
  components: {
    MarkerGeoJson
  },

  mixins: [
    modalBaseActionsMixin,
    uploadFileMixin
  ],

  data () {
    return {
      formTitle: 'Registrar imagen georeferencial',

      context: {
        storeBase: 'georeferencedImages',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'create',
      },
      messageToast: {
        baseName: 'IMAGE',
        action: 'REGISTERED'
      },
      form: {
        title: '',
        description: '',
        image: null,
        geometry: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: [
              0,
              0
            ]
          }
        }
      },
      rules: {
        title,
        geometry,
        image
      },
      file: {
        type: 'image', // it's property name file inside form
        availableExtensions: [
          'png',
          'jpg',
          'jpeg'
        ],
        selected: null
      }
    }
  },
  methods: {
    onMarkerLngLat (lngLat) {
      this.form.geometry.geometry.coordinates = lngLat
    },

    /**
     * getting formData by reference from BaseForm component
     * to apply custom functionality
     *
     * @param {Object} formData
     */
    ApplyCustomFunctionalityToForm (formData) {
      try {
        formData.set('geometry', JSON.stringify(this.form.geometry))
      } catch (e) {
        this.$toast.success('El GeoJSON es inválido')
      }
    }
  }
}
</script>
