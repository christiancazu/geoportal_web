<script>
import BaseForm from '@/components/base/BaseForm'

import BaseFormSetup from '@/components/base/setup/BaseFormSetup'

import InnerModalSetupMixin from '@/mixins/InnerModalSetupMixin'

import {
  mapState,
  mapActions
} from 'vuex'

import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from "@/types/mutations"

export default {
  components: {
    BaseForm,
  },

  extends: BaseFormSetup,

  mixins: [InnerModalSetupMixin],

  data: () => ({
    // tree context
    dataTree: [],
    filterGroupLayerName: '',
    defaultProps: {
      children: 'children',
      label: 'label'
    }
  }),

  computed: {
    ...mapState({
      structureTree: state => state.groupLayers.structureTree
    })
  },

  watch: {
    filterGroupLayerName (val) {
      this.$refs.tree.filter(val)
    },

    /**
     * re-resolve structure if change state
     */
    structureTree () {
      this.dataTree = []
      this.dataTree.push(this.structureTree)
    }
  },

  async created () {
    this.init()
  },

  methods: {
    ...mapActions({
      getStructureTree: 'groupLayers/getStructureTree'
    }),

    /**
     * featching structureTree & set as dataTree
     *
     */
    async init () {
      try {
        this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'loadingPage')
        await this.getStructureTree()
        this.dataTree = []
        this.dataTree.push(this.structureTree)
        // seting as hightlight groupLayerId (apply only on Edits component)
        this.setParentNodeHighLight()
      } catch (error) {
      }
      this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'loadingPage')
    },

    filterNode (value, data) {
      if (!value) return true
      this.form.order = null
      this.form.groupLayerId = null
      return data.label.toUpperCase().indexOf(value.toUpperCase()) !== -1
    },

    onSelectedGroupLayer (data) {
      this.form.order = data.order + 1
      this.form.groupLayerId = data.id
    }
  }
}
</script>
