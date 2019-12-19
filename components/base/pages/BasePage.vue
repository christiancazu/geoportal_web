<template>
<div
  :class="{
    'page-body-center': fitContent,
    'ma-4': isMountedAsPage
  }"
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

      <slot name="btn-header" />

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
    },
    isMountedAsPage: {
      type: Boolean,
      default: true
    }
  }
}
</script>
