<script>
import MarkerGeoJson from '@/components/leafLet/MarkerGeoJson'

import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'
import uploadFileMixin from '@/mixins/uploadFileMixin'

export default {
  components: {
    MarkerGeoJson
  },

  mixins: [
    modalBaseActionsMixin,
    uploadFileMixin
  ],

  methods: {
    onMarkerLngLat (lngLat) {
      this.form.geometry.geometry.coordinates = lngLat
    }
  }
}
</script>
