<script>
import BtnOpenModalInner from '@/components/buttons/BtnOpenModalInner'

import BaseForm from '@/components/base/BaseForm'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    BaseForm,
    BtnOpenModalInner
  },

  computed: {
    ...mapState({
      groupLayers: state => state.groupLayers.dataContext
    })
  },

  created () {
    this.getGroupLayers()
  },

  methods: {
    ...mapActions({
      getGroupLayers: 'groupLayers/getDataContext'
    })
  }
}
</script>
