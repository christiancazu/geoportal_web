<script>
import BaseForm from '@/components/base/BaseForm'

import BaseFormSetup from '@/components/base/setup/BaseFormSetup'

import uploadFileMixin from '@/mixins/uploadFileMixin'

import {
  mapState,
  mapActions
} from 'vuex'

import { USER_FILE_MAX_SIZE } from '@/config/constants'

export default {
  components: {
    BaseForm
  },

  extends: BaseFormSetup,

  mixins: [uploadFileMixin],

  data: () => ({
    /** UPLOADFILE SETTINGS */
    file: {
      type: 'image', // it's property name file inside form
      availableExtensions: [
        'png',
        'jpg',
        'jpeg'
      ],
      selected: null,
      maxSizeLabel: USER_FILE_MAX_SIZE.label,
      maxSizeLength: USER_FILE_MAX_SIZE.length,
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
    applyBeforeSubmitForm (formData) {
      if (formData.get(this.file.type) === null || typeof formData.get(this.file.type) === 'string')
        formData.delete(this.file.type)
    }
  }
}
</script>