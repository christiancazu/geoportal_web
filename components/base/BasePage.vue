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
        
        <slot name="page-header" />
      
      </div>

      <slot name="page-body" />

    </el-card>
    
    <slot name="page-modals" />
  
  </div>
</template>

<script>
export default {
  props: {
    pageHeaderTitle: {
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

<style>
.fit-page-body {
  width: fit-page-body;
}
</style>
