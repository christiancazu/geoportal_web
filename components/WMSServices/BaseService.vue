<script>
import BaseForm from '@/components/base/BaseForm'

import BaseFormSetup from '@/components/base/setup/BaseFormSetup'

import InnerModalSetupMixin from '@/mixins/InnerModalSetupMixin'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    BaseForm
  },

  extends: BaseFormSetup,

  mixins: [InnerModalSetupMixin],

  computed: {
    ...mapState({
      WMSAuthors: state => state.WMSAuthors.dataContext,
      WMSCategories: state => state.WMSCategories.dataContext
    })
  },

  created () {
    this.getWMSAuthors()
    this.getWMSCategories()
  },

  methods: {
    ...mapActions({
      getWMSAuthors: 'WMSAuthors/getDataContext',
      getWMSCategories: 'WMSCategories/getDataContext'
    })
  }
}
</script>
