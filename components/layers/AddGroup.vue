<template>
<el-dialog
  :title="formTitle"
  :close-on-click-modal="false"
  :visible="dialogVisible"
  center
  class="dialog-responsive"
  append-to-body
>
  <el-form
    ref="form"
    :model="formAddGroupLayer"
    :rules="rulesAddGroupLayer"
    label-width="120px"
    label-position="top"
    class="demo-ruleForm"
    @submit.native.prevent
  >
    <slot />
    <div class="text-xs-center">
      <el-button
        size="small"
        @click="closeModal()"
      >
        CERRAR
      </el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        :loading="$store.state.spinners.processingForm"
        @click="saveGroupLayerName"
      >
        GUARDAR
      </el-button>
    </div>
  </el-form>
</el-dialog>
</template>

<script>
// import {
//   title,
//   categoryGroupId
// } from '@/config/form.rules'

// import treeResolver from '@/helpers/treeResolver'

export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    formAddGroupLayer: {
      type: Object, required: true
    },
    rulesAddGroupLayer: {
      type: Object, required: true
    },
  },

  data () {
    return {
      formTitle: 'Registrar nuevo grupo de capas',

      // context: {
      //   storeBase: 'groupLayers',
      //   mountedOn: this.modalBaseActionsMixin_mountedOn,
      //   storeAction: 'create',
      // },
      // messageToast: {
      //   baseName: 'LAYER',
      //   action: 'REGISTERED'
      // },
      // form: {
      //   order: 1,
      //   title: '',
      //   description: '',
      //   categoryGroupId: 1
      // },
      // rules: {
      //   title,
      //   categoryGroupId
      // },
      // structureTree: [],
    }
  },

  async created () {
    // await this.$store.dispatch('groupLayers/getStructureTree')

    // const structureTree = this.$store.state.groupLayers.structureTree
    // console.warn(structureTree)
    // // let _structure = JSON.parse(JSON.stringify(this.$store.state.portal.structure.structure))

    // // const x = treeResolver(_structure)
    // // console.warn('resolver', x)
    // this.structureTree.push(structureTree)
  },

  methods: {
    handleNodeClick (node) {
      this.form.categoryGroupId = node.id
      console.warn(node.id)
    },

    async saveGroupLayerName () {
      let isFormValid = false
      console.warn(this.formAddGroupLayer)
      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        this.$emit('set-group-layer-name', this.formAddGroupLayer.name)
        this.$refs.form.resetFields()
      }
    },

    closeModal () {
      this.$emit('close-modal')
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
/* selected group layer tree border color */
.is-current > .el-tree-node__content {
  border: 1px solid #DCDFE6
}
</style>
