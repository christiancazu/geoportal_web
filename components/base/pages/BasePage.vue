<template>
<el-card
  shadow="never"
  :class="[
    {
      'pa-4': isMountedAsPage
    },
    ['border-none']
  ]"
>
  <div
    slot="header"
    class="space-between"
  >
    <span class="my-0 font-weight-bold text-uppercase">
      {{ pageHeader.title }}
    </span>

    <div>
      <slot name="btn-header" />

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


  </div>

  <slot />

</el-card>
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
    isMountedAsPage: {
      type: Boolean, default: true
    }
  }
}
</script>
