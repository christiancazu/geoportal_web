<template>
  <div>
    <el-dialog
      class="testtttt"
      :title="title"
      :visible.sync="showModalNow"
      :append-to-body="appendToBody"
    >
      <slot name="content" />

      <template slot="footer">
        <slot name="actions" />
      </template>

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
  },

  computed: {
    showModalNow: {
      get() {
        return this.showModal;
      },
      set(value) {
        this.$emit("action-modal", { show: value });
      }
    }
  },

  mounted() {
    console.log(this.$break);
  },

  methods: {}
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
