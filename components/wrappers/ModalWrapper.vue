<template>
<el-dialog
  :title="'gaaaaaa'"
  :close-on-click-modal="false"
  :visible="$store.state[store.name].innerComponent.visible"
  append-to-body
  destroy-on-close
  top="2vh"
  class="dialog-responsive"
  @close="closeModal()"
>

  <component :is="dynamicComponent" />

</el-dialog>
</template>

<script>
export default {
  props: {
    store: {
      type: Object,
      default: () => ({
        name: { type: String, required: true },
        action: { type: String, required: true }
      })
    },
    dialogTitle: { type: String, default: 'DIALOG TITLE' },
    page: {
      type: Object,
      default: () => ({
        folderRoot: { type: String, required: true },
        folderName: { type: String, required: true },
        component: { type: String, required: true },
      })
    },
  },

  computed: {
    dynamicComponent () {
      return () => import(`@/pages/${this.page.folderName}/${this.page.component}`)
    }
  },

  mounted () {
    console.warn('mountd modal wrapper')
  },

  methods: {
    closeModal () {
      console.warn(this.store.name)
      this.$store.commit(`${this.store.name}/CLOSE_INNER_MODAL`)
    },
  }
}
</script>

<style>

</style>