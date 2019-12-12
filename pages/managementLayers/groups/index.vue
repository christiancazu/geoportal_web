<template>
<base-page
  :page-header="pageHeader"
>
  <vue-tree-list
    ref="tree"
    :model="data"
    default-tree-node-name="Nuevo grupo de capas"
    default-expanded
    @click="onClick"
    @change-name="onChangeName"
    @delete-node="onDel"
    @add-node="onAddNode"
    @drop-before="onDropBefore"
    @drop-after="onDropAfter"
    @drop="onDrop"
  >
    <span
      slot="addTreeNodeIcon"
      class="icon-vtl"
    >📂</span>
    <span
      slot="editNodeIcon"
      class="icon-vtl"
    >📃</span>
    <span
      slot="delNodeIcon"
      class="icon-vtl"
    >✂️</span>
    <span
      slot="treeNodeIcon"
      class="icon-vtl"
    >📂</span>
  </vue-tree-list>

  <modal-add-group-layer
    :dialog-visible="dialogVisible"
    :form-add-group-layer="formAddGroupLayer"
    :rules-add-group-layer="rulesAddGroupLayer"
    @set-group-layer-name="setGroupLayerName"
    @close-modal="onCancelAddGroupLayer"
  >
    <el-form-item
      label="Título"
      prop="name"
    >
      <el-input
        v-model="formAddGroupLayer.name"
        type="text"
        autocomplete="off"
        :rules="rulesAddGroupLayer.name"
      />
    </el-form-item>
  </modal-add-group-layer>

  <pre>{{ newTree }}</pre>
</base-page>
</template>

<script>
/* eslint-disable no-unused-vars */
import BasePage from '@/components/base/pages/BasePage'
import ModalAddGroupLayer from '@/components/layers/ModalAddGroupLayer'

import { VueTreeList, Tree, TreeNode } from 'vue-tree-list'

import { treeTransform, getOldParentNode } from '@/helpers/treeManager'

import { ROOT_GROUP_LAYERS_FOLDER_NAME } from '@/config/constants'

export default {
  components: {
    BasePage,
    VueTreeList,
    ModalAddGroupLayer
  },

  data () {
    return {
      pageHeader: {
        title: 'Grupo de capas'
      },
      newTree: {},
      data: {},
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      structureTree: [],
      nodeAdded: {},
      dialogVisible: false,
      formAddGroupLayer: {
        name: ''
      },
      rulesAddGroupLayer: {
        name: [
          {
            required: true,
            message: 'El nombre del grupo de capas es requerido'
          }
        ]
      }
    }
  },

  async created () {
    await this.$store.dispatch('groupLayers/getStructureTree')

    // const structureTree = this.$store.state.groupLayers.structureTree
    // console.warn(structureTree)
    let data = JSON.parse(JSON.stringify(this.$store.state.groupLayers.structureTree))

    // const x = treeResolver(data)
    // console.warn('resolver', x)
    // console.warn(data)
    this.newTree = treeTransform(data)
    this.data = new Tree([this.newTree])
  },

  // async mounted () {
  //   setTimeout(() => {
  //     document.querySelectorAll('.el-icon-caret-right').forEach(e => {
  //       const newI = document.createElement('i')
  //       newI.setAttribute('class', 'fas fa-folder ts')
  //       newI.setAttribute('aria-hidden', 'true')
  //       newI.setAttribute('style', 'color: gold')
  //       e.parentNode.insertBefore( newI, e.nextSibling )
  //     })
  //   }, 1000)
  // },

  methods: {
    setGroupLayerName (name) {
      this.nodeAdded.name = name
      this.dialogVisible = false
      this.formAddGroupLayer.name = ''
    },

    onCancelAddGroupLayer () {
      console.warn(this.nodeAdded)
      this.nodeAdded.remove()
      this.dialogVisible = false
    },

    onDel (node) {
      console.log(node)
      node.remove()
    },

    onChangeName (params) {
      console.log(params)
    },

    onAddNode (params) {
      console.log('onaddNode', params)
      params.categoryGroupId = params.parent.id
      params.order = params.parent.order + 1
      params.addLeafNodeDisabled = true
      this.nodeAdded = params
      console.warn('nodeAdded', this.nodeAdded)

      // this.formAddGroupLayer.name = "NUEVO GRUPO DE CAPAS"
      this.dialogVisible = true
      // this.nodeAdded.name = 'gaaaaaaaaaaaaaaaa'

      // this.newTree = this.data
      this.getNewTree()
      this.data = new Tree([this.newTree])
    },

    onClick (params) {
      console.log(params)
    },

    addNode () {
      console.warn('x')
      var node = new TreeNode({ name: 'new node', isLeaf: false })
      if (!this.data.children) this.data.children = []
      this.data.addChildren(node)
    },

    onDropBefore ({node, target}) {
      console.warn('onDropBefore')
      const isRootLevel = this.preventDropOnRootLevel(node, target)
      console.warn(isRootLevel)
      // prevent drop in same level of main group layers
      // if (target.label === ROOT_GROUP_LAYERS_FOLDER_NAME) {
      //   node.moveInto(target)
      // }
    },

    onDropAfter ({node, target}) {
      console.warn('onDropAfter')
      const isRootLevel = this.preventDropOnRootLevel(node, target)
      console.warn(isRootLevel)
      // prevent drop in same level of main group layers
      // if (target.label === ROOT_GROUP_LAYERS_FOLDER_NAME) {
      //   node.moveInto(target)
      // }
    },

    onDrop ({node, target}) {
      console.warn('onDrop')
      // this.preventDropOnRootLevel(node, target)
    },

    preventDropOnRootLevel (node, target) {
      let isRootLevel = false
      // console.warn(node, node.categoryGroupId, target)
      // console.warn(target.label === ROOT_GROUP_LAYERS_FOLDER_NAME)
      if (target.label === ROOT_GROUP_LAYERS_FOLDER_NAME) {
        // const result = getOldParentNode(this.data, node.categoryGroupId)
        // // console.warn('result', node.categoryGroupId, result.id, result)
        // node.moveInto(result)
        this.data = new Tree([this.newTree])
        isRootLevel = true
      }
      return isRootLevel
      // return target.label === ROOT_GROUP_LAYERS_FOLDER_NAME
    },

    getNewTree () {
      var vm = this
      function _dfs (oldNode) {
        var newNode = {}

        for (var k in oldNode) {
          if (k !== 'children' && k !== 'parent') {
            newNode[k] = oldNode[k]
          }
        }

        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = []
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]))
          }
        }
        return newNode
      }

      vm.newTree = _dfs(vm.data)
    },
  },

  head: {
    title: 'Grupo de Capas | GEOVISOR'
  }
}
</script>

<style lang="scss">
/* selected group layer tree border color */
// .is-current > .el-tree-node__content {
//   border: 1px solid #DCDFE6
// }
// .ts {
//   text-shadow: -1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray;
// }
// .vtl-caret {
//   cursor: pointer;
// }
// .vtl-icon {
//   // font-size: 1.25rem;

// }
.icon-vtl {
  text-shadow: -1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray;
  font-family: 'Roboto', sans-serif !important;
  padding-right: .25rem;
  padding-left: .25rem;
    &:hover {
    cursor: pointer;
  }
}
// .vtl-tree-node:hover {
//   background-color: transparent;
// }
</style>