<template>
<base-page
  :page-header="pageHeader"
>
  <vue-tree-list
    ref="tree"
    :model="dataTree"
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
        autofocus
      />
    </el-form-item>
  </modal-add-group-layer>

  <!-- <el-dialog
    title="Tips"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button
        type="primary"
        @click="dialogVisible = false"
      >Confirm</el-button>
    </span>
  </el-dialog> -->

  <pre>{{ backUpTree }}</pre>
</base-page>
</template>

<script>
import BasePage from '@/components/base/pages/BasePage'
import ModalAddGroupLayer from '@/components/layers/ModalAddGroupLayer'

import { VueTreeList, Tree, /*TreeNode*/ } from 'vue-tree-list'

import { $_helper_treeTransform } from '@/helpers/treeManager'

// import { ROOT_GROUP_LAYERS_FOLDER_NAME } from '@/config/constants'

export default {
  components: {
    BasePage,
    VueTreeList,
    ModalAddGroupLayer
  },

  data () {
    return {
      dialogVisible: false, //
      pageHeader: {
        title: 'Grupo de capas'
      },
      modalMain: {
        storeBase: 'groupLayers',
        addComponent: 'ModalAddGroupLayer',
        folderName: 'layers'
      },
      backUpTree: {},
      dataTree: {},
      nodeAdded: {},
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

    // cloning state
    let data = JSON.parse(JSON.stringify(this.$store.state.groupLayers.structureTree))

    // init tree
    this.backUpTree = $_helper_treeTransform(data)
    this.dataTree = new Tree([this.backUpTree])
    this.updateTree()
  },

  methods: {
    setGroupLayerName (name) {
      this.nodeAdded.name = name
      this.dialogVisible = false
      this.formAddGroupLayer.name = ''
      this.updateTree()
    },

    onCancelAddGroupLayer () {
      this.nodeAdded.remove()
      this.dialogVisible = false
      this.updateTree()
    },

    onDel (node) {
      // prevent to delete if have children nodes
      if (node.children !== null && node.children.length) {
        this.$toast.info(this.$INFO.GROUP_LAYER.INVALID_DELETE)
      } else {
        node.remove()
        this.updateTree()
      }
    },

    onChangeName () {
      this.updateTree()
    },

    onAddNode (node) {
      this.updateTree()

      node.categoryGroupId = node.parent.id
      node.order = node.parent.order + 1
      node.addLeafNodeDisabled = true
      this.nodeAdded = node

      this.dialogVisible = true
      node.changeName(this.nodeAdded.name)
    },

    onClick (node) {
      console.log(node)
    },

    // addNode () {
    //   var node = new TreeNode({ name: 'new node', isLeaf: false })
    //   if (!this.dataTree.children) this.dataTree.children = []
    //   this.dataTree.addChildren(node)
    // },

    onDropBefore ({target}) {
      this.preventDropOnRootLevel(target)
    },

    onDropAfter ({target}) {
      this.preventDropOnRootLevel(target)
    },

    onDrop (/*{node, target}*/) {
      this.updateTree()
    },

    preventDropOnRootLevel (target) {
      if (target.id === 1) {
        this.$toast.info(this.$INFO.GROUP_LAYER.INVALID_DROP)
        this.dataTree = new Tree([$_helper_treeTransform(this.backUpTree.children[0])])
      }
      this.updateTree()
    },

    updateTree () {
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

      vm.backUpTree = _dfs(vm.dataTree)
    }
  },

  head: {
    title: 'Grupo de Capas | GEOVISOR'
  }
}
</script>

<style lang="scss">
.icon-vtl {
  font-family: 'Roboto', sans-serif !important;
  padding-right: .25rem;
  padding-left: .25rem;
  text-shadow: -1px 0 gray, 0 1px gray, 1px 0 gray, 0 -1px gray;
    &:hover {
    cursor: pointer;
  }
}
</style>
