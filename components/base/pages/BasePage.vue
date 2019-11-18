<template>
<div
  :class="[
    { 'page-body-center': fitContent },
    ['mb-5']
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
</div>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style lang="scss">
.fit-content{
  width: fit-content;
}
</style>
