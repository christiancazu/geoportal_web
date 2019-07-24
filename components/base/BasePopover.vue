<template>
  <div>
    <el-popover
      class="popover_author"
      :placement="placement"
      width="400"
      trigger="click"
      :title="title"
      @show="showPopover"
      @hide="hidePopover"
    >
      <slot name="content" />

      <div slot="reference">
        <slot name="activate" />
      </div>
    </el-popover>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: ''
    }
  },

  methods: {
    showPopover () {
      this.$emit('on-change-zindex', true)

    },
    hidePopover () {
      this.$emit('on-change-zindex', false)
    }
  },
}
</script>
