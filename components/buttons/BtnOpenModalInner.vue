<template>
<el-tooltip
  :content="tooltip"
  placement="top"
>
  <el-button
    :icon="icon"
    circle
    :type="icon === 'el-icon-circle-plus' ? 'text' : 'primary'"
    class="pa-1 pl-1 ma-0"
    :style="fontSize"
    :disabled="$store.state.spinners.processingForm"
    @click="$emit('open-modal')"
  />
</el-tooltip>
</template>

<script>
export default {
  props: {
    tooltip: { type: String, required: true },
    icon: { type: String, default: 'el-icon-circle-plus' }
  },
  computed: {
    fontSize () {
      return { fontSize: this.icon === 'el-icon-circle-plus' ? '2rem' : '1.5rem' }
    }
  }
}
</script>
