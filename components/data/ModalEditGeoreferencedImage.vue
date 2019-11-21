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

import { mapState } from 'vuex'

import { title } from '@/config/form.rules'

export default {
  mixins: [
    modalBaseActionsMixin,
    uploadFileMixin
  ],

  data () {
    return {
      formTitle: 'Actualizar imagen georeferencial',

      context: {
        storeBase: 'georeferencedImages',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'update'
      },
      messageToast: {
        baseName: 'IMAGE',
        action: 'UPDATED'
      },
      form: {
        id: null,
        title: '',
        description: '',
        image: null
      },
      rules: {
        title
      },
      file: {
        type: 'image', // it's property name file inside form
        availableExtensions: [
          '.png',
          '.jpg',
          '.jpeg'
        ],
        selected: null,
        imageUrl: ''
      }
    }
  },

  computed: {
    ...mapState({
      itemContext (state) {
        return state[this.context.storeBase].itemContext
      }
    })
  },

  watch: {
    itemContext () {
      this.assignFormFields()
    }
  },

  created () {
    this.assignFormFields()
  },

  methods: {
    assignFormFields () {
      Object.keys(this.form).forEach(key => (this.form[key] = this.itemContext[key]))
      this.file.imageUrl = this.form[this.file.type]
    },

    /**
     * getting formData by reference from BaseForm component
     * to apply custom functionality
     *
     * @param {Object} formData
     */
    ApplyCustomFunctionalityToForm (formData) {
      if (formData[this.file.type] === null || typeof formData[this.file.type] === 'string')
        formData.delete(this.file.type)
    }
  },
}
</script>
