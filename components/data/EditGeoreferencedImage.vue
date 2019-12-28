<template>
<base-form
  :form="form"
  :rules="rules"
  :store-base="storeBase"
  :message-toast="messageToast"
  @apply-before-submit-form="applyBeforeSubmitForm"
  @close-modal="closeModal"
>
  <template v-slot:form-content>
    <el-row
      :gutter="10"
      align="bottom"
      justify="center"
    >
      <el-col>
        <el-form-item
          label="Marca"
          prop="geometry"
        >

          <marker-geo-json
            v-if="$store.state[storeBase.name].modalMain.visible"
            ref="markerGeoJson"
            :map="map"
            :marker="marker"
            @on-marker-lng-lat="onMarkerLngLat"
            @update-marker-lng-lat="onMarkerLngLat"
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

        <!-- Descripción -->
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
            :show-word-limit="true"
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
import BaseGeoreferencedImage from './BaseGeoreferencedImage'

import { mapState } from 'vuex'

import { title } from '@/config/form.rules'

export default {
  extends: BaseGeoreferencedImage,

  data () {
    return {
      dialogTitle: 'Actualizar punto georeferenciado',

      /** BASEFORM SETTINGS */
      storeBase: {
        name: 'georeferencedImages',
        action: 'updateItemContext'
      },
      messageToast: {
        baseName: 'IMAGE',
        action: 'UPDATED'
      },
      form: {
        id: null,
        title: '',
        geometry: {
          type: "Feature",
          properties: {},
          geometry: {
            type: "Point",
            coordinates: []
          }
        },
        description: '',
        image: null
      },
      rules: {
        title
      },
      file: {
        type: 'image', // it's property name file inside form
        availableExtensions: [
          'png',
          'jpg',
          'jpeg'
        ],
        selected: null,
        imageUrl: ''
      },
      map: {
        latLng: [
          -9.190481498666669,
          -74.61914062500001
        ],
        zoom: 4
      },
      marker: {
        latLng: [],
        visible: true
      },

      initialMarkerLatLng: []
    }
  },

  computed: {
    ...mapState({
      itemContext (state) {
        return state[this.storeBase.name].itemContext
      }
    })
  },

  watch: {
    itemContext: { // smart watcher
      handler: 'assignFormFields',
      immediate: true
    }
  },

  methods: {
    assignFormFields () {
      this.form.id = this.itemContext.id
      this.form.title = this.itemContext.title
      this.form.description = this.itemContext.description
      this.form.image = this.itemContext.image

      const { type , coordinates } = JSON.parse(this.itemContext.marker)

      this.form.geometry.geometry.type = type

      const [lng, lat] = coordinates

      this.form.geometry.geometry.coordinates = [lat, lng]

      this.marker.latLng = [lat, lng]
      this.initialMarkerLatLng = [lat, lng]

      // setting image src
      this.file.imageUrl = this.form[this.file.type]
    },

    /**
     * getting formData by reference from BaseForm component
     * to apply custom functionality
     *
     * @param {Object} formData
     */
    applyBeforeSubmitForm (formData) {
      if (formData.get(this.file.type) === null || typeof formData.get(this.file.type) === 'string')
        formData.delete(this.file.type)

      try {
        // if try to update with the same initial marker coordinates
        if (JSON.stringify(this.initialMarkerLatLng) === JSON.stringify(this.form.geometry.geometry.coordinates)) {
          this.form.geometry.geometry.coordinates = this.form.geometry.geometry.coordinates.reverse()
          this.marker.latLng = this.initialMarkerLatLng
        }
        formData.set('geometry', JSON.stringify(this.form.geometry))

      } catch (e) {
        this.$toast.error('El GeoJSON es inválido')
      }
    }
  }
}
</script>
