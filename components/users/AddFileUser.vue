<template>
<base-form
  :form="form"
  :rules="rules"
  :store-base="storeBase"
  :message-toast="messageToast"
  @apply-after-submit-form="applyAfterSubmitForm"
  @close-modal="closeModal"
>
  <template v-slot:form-content>

    <el-row
      :gutter="10"
      align="bottom"
      justify="center"
    >
      <el-col :md="24">
        <!-- image -->
        <el-form-item
          label="Cargar Archivo Excel"
          class="text-xs-center upload-file"
          prop="excel_file"
        >

          <upload-file
            :file="file"
            @on-file-valid="$_uploadFileMixin_valid"
            @delete-file="$_uploadFileMixin_clear()"
          />

        </el-form-item>
      </el-col>
    </el-row>
  </template>
</base-form>
</template>

<script>
import BaseForm from '@/components/base/BaseForm'
import BaseFormSetup from '@/components/base/setup/BaseFormSetup'

import uploadFileMixin from '@/mixins/uploadFileMixin'

import { USER_FILE_MAX_SIZE } from '@/config/constants'

import {
  file
} from '@/config/form.rules'

export default {
  components: {
    BaseForm
  },

  extends: BaseFormSetup,

  mixins: [uploadFileMixin],

  data () {
    return {
      dialogTitle: 'Registrar usuarios',

      /** BASEFORM SETTINGS */
      storeBase: {
        name: 'users',
        action: 'uploadFileUser'
      },
      messageToast: {
        baseName: 'FILE',
        action: 'REGISTERED'
      },
      form: {
        excel_file: null,
      },
      rules: { // TO DEFINE
        excel_file: file
      },
      file: {
        type: 'excel_file',
        availableExtensions: [
          'xls',
          'xlsx'
        ],
        selected: null
      }
    }
  },

  methods: {
    applyAfterSubmitForm () { // clear file
      this.file.selected = null
      this.form.excel_file = null
    }
  },
}
</script>

<style lang="scss">
.el-icon-view.password {
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 3;
  &.view-enable {
    color: #6376f7
  }
}
</style>
