<script>
import MarkerGeoJson from '@/components/leafLet/MarkerGeoJson'

import BaseForm from '@/components/base/BaseForm'

import uploadFileMixin from '@/mixins/uploadFileMixin'

export default {
  components: {
    BaseForm,
    MarkerGeoJson
  },

  mixins: [uploadFileMixin],

  methods: {
    onMarkerLngLat (lngLat) {
      this.form.geometry.geometry.coordinates = lngLat
    }
  }
}
</script>
