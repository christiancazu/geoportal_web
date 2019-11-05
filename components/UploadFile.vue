<template>
  <el-upload
    ref="uploadFile"
    class="upload-demo"              
    :http-request="onFileValid"
    :show-file-list="false"
    :before-upload="beforeFileUpload"
    drag action
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text pa-2">
      <p class="ma-0">Suelta tu archivo {{ extensionsString }} aquí <br> ó <br><em>haz clic para cargar</em>
      </p>
    </div>
  </el-upload>
</template>

<script>
export default {
  props: {
    availableFileExtensions: {
      type: Array, required: true
    } 
  },

  data() {
    return {
      extensionsString: ''
    }
  },

  mounted () {
    this.availableFileExtensions.forEach(e => {
      this.extensionsString += e + " ó "
    })
    this.extensionsString = this.extensionsString.substring(0, this.extensionsString.length - 2)
  },
  
  methods: {
    onFileValid ({ file }) {
      this.$emit('on-file-valid', file)
    },

    beforeFileUpload (file) {
      const currentExtension = `.${file.name.split('.').pop()}`

      const isValid = this.availableFileExtensions.includes(currentExtension) || file.type === 'application/zip'

      if (!isValid) {
        this.$message.error(`Solo se acepta archivos ${this.extensionsString}`);
      }
      return isValid
    },
  }
}
</script>
