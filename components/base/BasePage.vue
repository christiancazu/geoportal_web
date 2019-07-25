<template>
  <div class="ma-3">
    <el-card shadow="always">
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
    }
  }
}
</script>
