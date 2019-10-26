import objectToFormDataMixin from '@/mixins/objectToFormDataMixin'
// import BaseForm from '@/components/base/BaseForm'

export default {

  mixins: [objectToFormDataMixin],

  methods: {
    async $_formMixin_submit () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)
      // if (isFormValid) {
      //   const data = this.$_objectToFormDataMixin_transform();
        
      //   try {
      //     await this.$vectorialLayerAPI.create({ data })

      //     this.$refs.form.resetFields()
      //     this.getVectorialLayers()
      //     this.$toast.success(this.$SUCCESS.LAYER.REGISTERED)
      //     this.$_modalVisibilityMixin_close('modalAddVectorialLayer')

      //   } catch (e) {}
      // }
    }
  }
}
