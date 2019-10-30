<template>
  <div :class="[
    { 'page-body-center': fitContent },
    ['ma-4']
  ]">
    <el-card 
      shadow="always" 
      :class="{ 'fit-page-body': fitContent }"
    >
      <div
        class="space-between"
        slot="header"
      >
        <p class="mt-1 mb-0 font-weight-bold text-uppercase">
          {{ pageHeaderTitle }}
        </p>

        <template v-if="pageHeaderBtnAddName">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-plus"
            @click="$emit('open-add-modal')"
          >
            {{ pageHeaderBtnAddName }}
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
    pageHeaderTitle: {
      type: String, required: true
    },
    pageHeaderBtnAddName: {
      type: String, required: false
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
