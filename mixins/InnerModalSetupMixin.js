import BtnOpenModalInner from '@/components/buttons/BtnOpenModalInner'
import BaseModal from '@/components/base/BaseModal'

import { mapActions } from 'vuex'

export default {
  components: {
    BaseModal,
    BtnOpenModalInner
  },

  computed: {
    dynamicComponent () {
      const { type, folderPath, name } = this.$store.state[this.storeBase.name].modalInner
      return type === 'page'
        ? () => import(`@/pages/${folderPath}/${name}`)
        : () => import(`@/components/${folderPath}/${name}`)
    }
  },

  methods: {
    ...mapActions({
      setDynamicComponentAsModalInner ({ }, component) {
        this.$store.dispatch(`${this.storeBase.name}/setDynamicModal`, {
          typeModal: 'modalInner',
          component
        })
      }
    }),

    openModal (component) {
      this.setDynamicComponentAsModalInner(this.modalInner[component])
    }
  },
}
