<script>
import BaseFormParent from '@/components/base/parents/BaseFormParent'

import BtnOpenModalInner from '@/components/buttons/BtnOpenModalInner'

import BaseModal from '@/components/base/BaseModal'

import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    BaseModal,
    BtnOpenModalInner
  },

  extends: BaseFormParent,

  mixins: [modalBaseActionsMixin],

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
