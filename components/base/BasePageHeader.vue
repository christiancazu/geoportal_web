<template>
  <el-button
    size="mini"
    type="primary"
    icon="el-icon-plus"
    @click="$emit('on-load-add-modal-state-name')"
  >
    {{ btnAddName }}
  </el-button>
</template>

<script>
export default {
  props: {
    btnAddName: {
      type: String,
      required: true
    }
  }
}
</script>
