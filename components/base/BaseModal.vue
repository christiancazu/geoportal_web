<template>
<el-dialog
  :title="formTitle"
  :close-on-click-modal="false"
  :visible="$store.state.modalsVisibilities['secondModal'].visibility"
  top="2vh"
  class="dialog-responsive"
  append-to-body
  @close="closeModal()"
>
  <component
    :is="dynamicComponent"
  />

  <!-- actions -->
  <div class="text-xs-center">
    <el-button
      size="small"
      @click="closeModal()"
    >
      CERRAR
    </el-button>
  </div>

</el-dialog>
</template>

<script>
export default {
  props: {
    formTitle: {
      type: String, default: 'GAAA'
    },
    context: {
      type: Object,
      default: () => ({
        mountedOn: { type: String, required: true }
      })
    },
  },

  computed: {
    dynamicComponent () {
      const { folderRoot, folderName, component } = this.$store.state.modalsVisibilities.baseModal
      return folderRoot === 'pages'
        ? () => import(`@/pages/${folderName}/${component}`)
        : () => import(`@/components/${folderName}/${component}`)
      // @/pages && @/components can't be dynamic for that use ternary operator
    }
  },

  methods: {
    closeModal () {
      this.$store.commit('modalsVisibilities/CLOSE_MODAL', 'secondModal')
    }
  }

}
</script>
