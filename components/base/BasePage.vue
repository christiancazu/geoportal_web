<template>
  <div class="ma-4" :class="{'content-center': fitContent}" >
    <el-card shadow="always" :class="{'fit-content': fitContent}">
      <div
        class="space-between"
        slot="header"
      >
        <p class="mt-1 mb-0 font-weight-bold">{{ title }}</p>
        <slot name="itemsActions" />
      </div>

      <slot name="content" />

    </el-card>
    <slot name="modals" />
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    fitContent: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss">
  .fit-content{
    width: fit-content;
  }
</style>