<script>
import MarkerGeoJson from '@/components/leafLet/MarkerGeoJson'

import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'

import { URL_MAP_REG_EX } from '@/config/constants'

export default {
  components: {
    MarkerGeoJson
  },

  mixins: [modalBaseActionsMixin],


  methods: {
    async previewBaseMap () {
      if (await this.isValidUrlMap()) {
        this.validUrlToPreviewMap = true
        this.tileLayer.url = this.form.url
        this.tooltip.preview = true
      } else {
        this.validUrlToPreviewMap = false
        this.showisUrlValid = false
        this.tooltip.preview = false
      }
    },

    isValidUrlMap () {
      return new Promise(res => res(URL_MAP_REG_EX.test(this.form.url)))
    },

    onTileError () {
      this.showisUrlValid = true
    }
  }

}
</script>
