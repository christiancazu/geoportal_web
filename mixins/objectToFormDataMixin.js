export default {
  methods: {
    $_objectToFormDataMixin_transform () {
      const formData = new FormData();

      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key])
      })

      return formData
    },
  }
}
