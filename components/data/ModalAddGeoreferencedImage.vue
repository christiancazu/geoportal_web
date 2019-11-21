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
          label="Geometría"
          prop="geometry"
        >
          <el-input
            v-model="form.geometry"
            type="textarea"
            :rows="3"
            autocomplete="off"
            :maxlength="300"
          />
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
import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'

import uploadFileMixin from '@/mixins/uploadFileMixin'

import {
  title,
  geometry,
  image
} from '@/config/form.rules'

export default {
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
        geometry: ''
      },
      rules: {
        title,
        geometry,
        image
      },
      file: {
        type: 'image', // it's property name file inside form
        availableExtensions: [
          '.png',
          '.jpg',
          '.jpeg'
        ],
        selected: null
      },
    }
  },

  methods: {
    /**
     * getting formData by reference from BaseForm component
     * to apply custom functionality
     *
     * @param {Object} formData
     */
    ApplyCustomFunctionalityToForm (formData) {
      try {
        formData.geometry = JSON.stringify(JSON.parse(formData.geometry))
      } catch (e) {
        console.error('invalid format on field geometry')
      }
    }
  }
}
</script>
