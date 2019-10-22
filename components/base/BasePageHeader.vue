<template>
  <el-button
    size="mini"
    type="primary"
    icon="el-icon-plus"
    @click="$_modalVisibilityMixin_open(modalAddStateName)"
  >
    {{ btnName }}
  </el-button>
</template>

<script>
export default {
  props: {
    modalAddStateName: {
      type: String,
      required: true
    },
    btnName: {
      type: String,
      required: true
    }
  }
}
</script>