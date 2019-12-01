<script>
import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
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
