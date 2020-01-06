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
      default-tree-node-name=""
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
        v-if="!!storeMounted.name"
        size="small"
        @click="closeModal()"
      >
        CERRAR
      </el-button>
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
      dataTree: new Tree([
        {
          name: '',
          id: 1,
          children: []
        }
      ]),
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

    async onDel (node) {
      // prevent to delete if have children nodes
      if (node.children !== null && node.children.length) {
        this.$toast.info(this.$INFO.GROUP_LAYER.INVALID_DELETE)
      } else {
        try {
          this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'loadingPage')
          await this.$store.dispatch('groupLayers/deleteItemContext', node.id)
          node.remove()
          this.refreshGroupLayers()
          this.$toast.success(this.$SUCCESS.GROUP_LAYER.DELETED)
        } catch (error) {

        }
        this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'loadingPage')
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

    onClick (/*node*/) {
      // console.log(node)
    },

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
      const vm = this
      function _dfs (oldNode) {
        const newNode = {}

        for (let k in oldNode) {
          if (k !== 'children' && k !== 'parent') {
            newNode[k] = oldNode[k]
          }
        }

        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = []
          for (let i = 0, len = oldNode.children.length; i < len; i++) {
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
        let data = Object.assign({}, this.$store.state.groupLayers.structureTree)
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

    async onSubmit () {
      this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')
      try {
        await this.$store.dispatch(`groupLayers/updateStructure`, this.backUpTree.children[0])
        this.$toast.success(this.$SUCCESS.GROUP_LAYER.UPDATED)
        this.refreshGroupLayers()
      } catch (error) {}
      this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')
    },

    /**
     * mutating CLOSE_MODAL on his storeMounted when close btn is clicked
     */
    closeModal () {
      this.$store.commit(`${this.storeMounted.name}/CLOSE_MODAL`, this.storeMounted.typeModal)
    }
  },

  head: {
    title: 'Grupo de capas | GEOVISOR'
  }
}
</script>

