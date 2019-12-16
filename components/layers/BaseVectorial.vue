<script>
import BtnOpenInnerModal from '@/components/buttons/BtnOpenInnerModal'

import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    BtnOpenInnerModal
  },

  mixins: [modalBaseActionsMixin],

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
