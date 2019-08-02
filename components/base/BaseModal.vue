<template>
  <div>
    <el-dialog
      :title="title"
      center
      :visible.sync="showModalNow"
      :append-to-body="appendToBody"
      :width="$breakpoint.xs ? '100%' : '50%'"
    >
      <slot name="content" />

      <span
        slot="footer"
        class="dialog-footer"
      >
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
  },

  computed: {
    showModalNow: {
      get () {
        return this.showModal
      },
      set (value) {
        this.$emit('action-modal', { show: value })
      }
    }
  },

  mounted() {
    console.log(this.$break)
  },

  methods: {

  },
};
</script>

