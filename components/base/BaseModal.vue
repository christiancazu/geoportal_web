<template>
<el-dialog
  :title="title"
  :close-on-click-modal="false"
  :visible.sync="showModalNow"
  :append-to-body="appendToBody"
  top="2vh"
>
  <slot name="content" />

  <div class="text-xs-center">
    <slot name="actions" />
  </div>

  <slot name="modals" />

</el-dialog>
</template>

<script>

export default {
  props: {
    nameState: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    showModal: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    showModalNow: {
      get () {
        return this.showModal
      },
      set () {
        this.$_modalVisibilityMixin_close(this.nameState)
      }
    }
  }
}
</script>
