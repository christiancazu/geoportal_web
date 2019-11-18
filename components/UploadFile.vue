<template>
<div>
  <el-upload
    ref="uploadFile"
    class="upload-demo"
    :disabled="$store.state.spinners.processingForm"
    :http-request="onFileValid"
    :show-file-list="false"
    :before-upload="beforeFileUpload"
    drag action
  >
    <el-image
      v-if="imageUrl && typeImage"
      :src="imageUrl"
      fit="scale-down"
    />
    <template v-else>
      <i
        class="avatar-uploader-icon"
        :class="typeImage ? 'el-icon-picture' : 'el-icon-upload'"
      />
      <div class="el-upload__text pa-2">
        <p class="ma-0">Suelta tu archivo {{ extensionsString }} aquí <br> ó <br><em>haz clic para cargar</em>
        </p>
      </div>
    </template>
  </el-upload>
  <ul
    v-if="file.selected"
    class="el-upload-list el-upload-list--text px-3"
  >
    <li
      tabindex="0"
      class="el-upload-list__item is-success"
    >
      <a class="el-upload-list__item-name">
        <i class="el-icon-document" />
        {{ file.selected.name }}
      </a>
      <label class="el-upload-list__item-status-label">
        <i class="el-icon-upload-success el-icon-circle-check" />
      </label>
      <el-tooltip
        class="item"
        effect="dark" content="Eliminar archivo" placement="top"
      >
        <i
          class="el-icon-close"
          @click="deleteFile()"
        />
      </el-tooltip>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    file: {
      type: Object,
      default: () => ({
        availableExtensions: { type: Array, required: true },
        selected: { type: File, default: () => {} }
      })
    },
    typeImage: {
      type: Boolean, default: false
    }
  },

  data () {
    return {
      extensionsString: '',
      imageUrl: ''
    }
  },

  mounted () {
    this.assignExtensionsString()
  },

  methods: {
    onFileValid ({ file }) {
      if (this.typeImage) this.imageUrl = URL.createObjectURL(file)
      this.$emit('on-file-valid', file)
    },

    beforeFileUpload (currentFile) {
      const currentExtension = `.${currentFile.name.split('.').pop()}`

      const isExtensionValid = this.file.availableExtensions.includes(currentExtension) // || currentFile.type === 'application/zip'

      if (!isExtensionValid) {
        this.$message.error(`Solo se acepta archivos ${this.extensionsString}`)
      }
      return isExtensionValid
    },

    assignExtensionsString () {
      this.file.availableExtensions.forEach(e => {
        this.extensionsString += e + ' ó '
      })
      this.extensionsString = this.extensionsString.substring(0, this.extensionsString.length - 2)
    },

    /**
     * only can clean file if proccessingForm is false
     *
     */
    deleteFile () {
      if (!this.$store.state.spinners.processingForm) {
        this.imageUrl = ''
        this.$emit('delete-file')
      }
    }
  }
}
</script>
