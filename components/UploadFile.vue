<template>
  <el-upload
    ref="uploadFile"
    class="upload-demo"              
    :http-request="launchUploadAvatar"
    :show-file-list="false"
    :before-upload="beforeFileUpload"
    drag
    action
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text pa-2">
      <p class="ma-0">Suelta tu archivo .zip ó .shp aquí <br> ó <br><em>haz clic para cargar</em>
      </p>
    </div>
  </el-upload>
</template>

<script>
export default {
  props: {
    availableExtensions: {
      type: Array, required: true
    }
  },
  
  methods: {
    launchUploadAvatar ({ file }) {
      this.form.shapeFile = file;
      this.fileSelected = file
      const nameFile = file.name.split('.')
      this.form.name = nameFile[0]
      this.form.title = nameFile[0]
    },

    beforeFileLayerUpload (file) {
      // const extension = (name.substring(name.lastIndexOf("."))).toLowerCase()
      const extension = `.${file.name.split('.').pop()}`
      const isSHP = extension === '.shp'
      const isZIP = extension === '.zip' || file.type === 'application/zip'

      let valid = isSHP || isZIP

      if (!valid) {
        this.$message.error("Solo se acepta archivos .zip ó .shp");
      }
      return valid
    },
  }
}
</script>
