<template>
  <el-dialog
    :title="title"
    :close-on-click-modal="false"
    :visible.sync="showModalNow"
    :append-to-body="appendToBody"
    top="2vh"
  >
    <slot name="content" />

    <template slot="footer">
      <div class="text-xs-center">
        <slot name="actions" />
      </div>
    </template>

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
      get() {
        return this.showModal;
      },
      set(value) {
        this.closeModal(this.nameState);
      }
    }
  }
};
</script>
<style lang="scss">
$color-danger: #ff3547;
$color-success: #00c851;
$color-info: #33b5e5;
.danger {
  background: $color-danger;
}
.info {
  background: $color-info;
}
</style>
