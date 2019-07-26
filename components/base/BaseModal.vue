<template>
  <div>
    <el-dialog
      :title="title"
      center
      :visible.sync="showModal"
      :append-to-body="appendToBody"
    >
      <slot name="content" />

      <span slot="footer" class="dialog-footer">
        <slot name="actions" />
      </span>

      <slot name="modals" />

    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
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
  }
};
</script>
