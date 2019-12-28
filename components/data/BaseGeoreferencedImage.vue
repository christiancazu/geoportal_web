<script>
import BaseForm from '@/components/base/BaseForm'
import BaseFormSetup from '@/components/base/setup/BaseFormSetup'

import MarkerGeoJson from '@/components/leafLet/MarkerGeoJson'

import uploadFileMixin from '@/mixins/uploadFileMixin'

export default {
  components: {
    BaseForm,
    MarkerGeoJson
  },

  extends: BaseFormSetup,

  mixins: [uploadFileMixin],

  methods: {
    onMarkerLngLat (lngLat) {
      this.form.geometry.geometry.coordinates = lngLat
    }
  }
}
</script>
