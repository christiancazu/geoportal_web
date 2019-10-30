<template>
  <el-button
    size="mini"
    type="primary"
    icon="el-icon-plus"
    @click="$emit('add-item-context')"
  >
    {{ btnAddName }}
  </el-button>
</template>

<script>
export default {
  props: {
    btnAddName: {
      type: String, required: true
    }
  }
}
</script>
