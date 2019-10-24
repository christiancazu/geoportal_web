export default {
  methods: {
    // # TODO fix data to send to endpoint
    async publishSelectedLayer ({ itemSelected }) {
      try {
        await this.publishVectorialLayer({ 
          data: {
            pk: itemSelected.id
          } 
        })
        this.$toast.success(this.$SUCCESS.LAYER.PUBLISHED)

        await this.getVectorialLayers()
      } 
      catch (e) {}
    }
  }
}
