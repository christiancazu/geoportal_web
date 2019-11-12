import UploadFile from '@/components/UploadFile'

export default {
  components: {
    UploadFile
  },

  methods: {
    uploadFileMixin_clear () {
      this.form[this.file.type] = null
      this.file.selected = null
      this.form.name = ''
      this.form.title = ''
    },

    uploadFileMixin_valid (file) {
      this.form[this.file.type] = file
      this.file.selected = file
      const nameFile = file.name.split('.')[0]
      this.form.name = nameFile
      this.form.title = nameFile
    }
  }
}
