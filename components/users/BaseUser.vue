<script>
import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'
import uploadFileMixin from '@/mixins/uploadFileMixin'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
  mixins: [
    modalBaseActionsMixin,
    uploadFileMixin
  ],

  data: () => ({
    file: {
      type: 'image', // it's property name file inside form
      availableExtensions: [
        'png',
        'jpg',
        'jpeg'
      ],
      selected: null,
      maxSizeLabel: '2MB',
      maxSizeLength: 262144 // (bytes units) ~ 262144 bytes = 2mb
    }
  }),

  computed: {
    ...mapState({
      regions: state => state.public.regions,
      provinces: state => state.public.provinces,
      districts: state => state.public.districts,
    })
  },

  created () {
    this.getRegions()
  },

  methods: {
    ...mapActions({
      getRegions: 'public/getRegions',
      getProvinces: 'public/getProvinces',
      getDistricts: 'public/getDistricts'
    }),

    onChangeRegion (regionId) {
      this.form.provinceId = ''
      this.form.districtId = ''
      this.getProvinces(regionId)
    },

    onChangeProvince (provinceId) {
      this.form.districtId = ''
      this.getDistricts(provinceId)
    },

    /**
     * @override mixin to prevent autocomplete on name field
     */
    $_uploadFileMixin_valid (file) {
      this.form[this.file.type] = file
      this.file.selected = file
    },

    /**
     * getting formData by reference from BaseForm component
     * to apply custom functionality
     *
     * @param {Object} formData
     */
    ApplyCustomFunctionalityToForm (formData) {
      if (formData.get(this.file.type) === null || typeof formData.get(this.file.type) === 'string')
        formData.delete(this.file.type)
    }
  }
}
</script>