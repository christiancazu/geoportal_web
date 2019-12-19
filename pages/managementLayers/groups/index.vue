<template>
<base-page
  :page-header="pageHeader"
  :is-mounted-as-page="isMountedAsPage"
>
  <template slot="btn-header">
    <el-button
      :loading="$store.state.spinners.loadingPage"
      size="mini"
      type="primary"
      icon="el-icon-refresh"
      @click="refreshGroupLayers()"
    >
      Reestablecer grupos
    </el-button>
  </template>

  <el-alert
    title="Importante"
    type="info"
    description="Recuerde guardar los cambios antes de abandonar la página"
    show-icon
    effect="dark"
  />

  <div v-loading="$store.state.spinners.loadingPage">

    <vue-tree-list
      class="my-4"
      style="min-height: 50vh"
      :model="dataTree"
      default-tree-node-name="Nuevo grupo de capas"
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
      >➕</span>
      <span
        slot="editNodeIcon"
        class="icon-vtl"
      >📝</span>
      <span
        slot="delNodeIcon"
        class="icon-vtl"
      >❌</span>
      <span
        slot="treeNodeIcon"
        class="icon-vtl"
      >📂</span>
    </vue-tree-list>

    <add-group-layer
      @set-group-layer-name="setGroupLayerName"
      @close-modal="onCancelAddGroupLayer"
    />

    <div class="text-xs-center mb-0">
      <el-button
        :loading="$store.state.spinners.processingForm"
        type="primary"
        size="small"
        @click="onSubmit"
      >
        GUARDAR
      </el-button>
    </div>
  </div>

  <pre>{{ backUpTree }}</pre>
</base-page>
</template>

<script>
import BasePage from '@/components/base/pages/BasePage'
import AddGroupLayer from '@/components/layers/AddGroup'

import { VueTreeList, Tree, /*TreeNode*/ } from 'vue-tree-list'

import { $_helper_treeTransform } from '@/helpers/treeManager'

import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '@/types/mutations'

export default {
  components: {
    BasePage,
    VueTreeList,
    AddGroupLayer
  },

  props: {
    storeMounted: { type: Object, default: () => ({}) }
  },

  data () {
    return {
      pageHeader: {
        title: 'Grupo de capas'
      },
      modalMain: {
        addComponent: {
          type: 'component',
          folderPath: 'layers',
          name: 'AddGroup'
        }
      },
      backUpTree: {},
      dataTree: {},
      nodeAdded: {},
      isMountedAsPage: true
    }
  },

  created () {
    this.init()
    // used this property only if the page will be used also as modalº
    // eslint-disable-next-line no-extra-boolean-cast
    if (!!this.storeMounted.name) this.isMountedAsPage = false
  },

  methods: {
    setGroupLayerName (name) {
      this.nodeAdded.name = name
      this.nodeAdded = {}
      this.updateTree()
      this.$store.commit('groupLayers/CLOSE_MODAL', 'modalMain')
    },

    onCancelAddGroupLayer () {
      try {
        this.nodeAdded.remove()
      } catch (error) {

      }
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

      this.$store.commit('groupLayers/OPEN_MODAL', 'modalMain')

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
    },

    async init () {
      this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'loadingPage')
      try {
        await this.$store.dispatch('groupLayers/getStructureTree')

        // cloning state
        let data = JSON.parse(JSON.stringify(this.$store.state.groupLayers.structureTree))

        // init tree
        this.backUpTree = $_helper_treeTransform(data)
        this.dataTree = new Tree([this.backUpTree])
        this.updateTree()
      } catch (error) {}

      this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'loadingPage')
    },

    refreshGroupLayers () {
      this.init()
    },

    onSubmit () {
      this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')
      try {
        alert('#TODO: SEND TO GROUP_LAYERS PUT ENDPOINT')
        this.updateTree()
      } catch (error) {}

      this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')

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
