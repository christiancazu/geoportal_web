<template>
<div
  :class="[
    { 'page-body-center': fitContent },
    ['ma-4']
  ]"
>
  <el-card
    shadow="never"
    style="border: none"
  >
    <div
      slot="header"
      class="space-between"
    >
      <p class="mt-1 mb-0 font-weight-bold text-uppercase">
        {{ pageHeader.title }}
      </p>

      <template v-if="pageHeader.btnAddName">
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-plus"
          @click="$emit('open-add-modal')"
        >
          {{ pageHeader.btnAddName }}
        </el-button>
      </template>
    </div>

    <slot />

  </el-card>

  <base-modal :modal="modal">
    <template v-slot:modal-content>
      <component :is="dynamicComponent" />
    </template>
  </base-modal>

</div>
</template>

<script>
import BaseModal from '@/components/base/BaseModal'

export default {
  components: {
    BaseModal,
  },

  props: {
    pageHeader: {
      type: Object,
      default: () => ({
        title: { type: String, required: true },
        btnAddName: { type: String, required: false }
      })
    },
    fitContent: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Object,
      default: () => ({
        folderRoot: { type: String, required: true },
        folderName: { type: String, required: true },
        store: { type: String, required: true },
        addComponent: { type: String, required: true },
        editComponent: { type: String, required: true }
      })
    },
  },

  computed: {
    dynamicComponent () {
      const { folderRoot, folderName, component } = this.$store.state[this.modal.store].modal
      console.warn('basepage', folderRoot, folderName, component)
      return folderRoot === 'pages'
        ? () => import(`@/pages/${folderName}/${component}`)
        : () => import(`@/components/${folderName}/${component}`)
    }
  }
}
</script>
