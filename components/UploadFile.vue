<template>
<div>
  <el-upload
    ref="uploadFile"
    class="upload-demo"
    :http-request="onFileValid"
    :show-file-list="false"
    :before-upload="beforeFileUpload"
    drag action
  >
    <i class="el-icon-upload" />
    <div class="el-upload__text pa-2">
      <p class="ma-0">Suelta tu archivo {{ extensionsString }} aquí <br> ó <br><em>haz clic para cargar</em>
      </p>
    </div>
  </el-upload>
  <ul
    v-if="fileSelected"
    class="el-upload-list el-upload-list--text px-3"
  >
    <li
      tabindex="0"
      class="el-upload-list__item is-success"
    >
      <a class="el-upload-list__item-name">
        <i class="el-icon-document" />
        {{ fileSelected.name }}
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
    availableFileExtensions: { type: Array, required: true },
    fileSelected: { type: File, default: () => {} }
  },

  data () {
    return {
      extensionsString: ''
    }
  },

  mounted () {
    this.assignExtensionsString()
  },

  methods: {
    onFileValid ({ file }) {
      this.$emit('on-file-valid', file)
    },

    beforeFileUpload (file) {
      const currentExtension = `.${file.name.split('.').pop()}`

      const isExtensionValid = this.availableFileExtensions.includes(currentExtension) || file.type === 'application/zip'

      if (!isExtensionValid) {
        this.$message.error(`Solo se acepta archivos ${this.extensionsString}`)
      }
      return isExtensionValid
    },

    assignExtensionsString () {
      this.availableFileExtensions.forEach(e => {
        this.extensionsString += e + ' ó '
      })
      this.extensionsString = this.extensionsString.substring(0, this.extensionsString.length - 2)
    },

    deleteFile () {
      this.$emit('delete-file')
    }
  }
}
</script>
