<template>
<div>
  <el-tooltip
    content="Editar"
    placement="bottom"
  >
    <el-button
      circle
      icon="el-icon-edit"
      size="small"
      type="primary"
      @click="$emit('open-edit-modal')"
    />
  </el-tooltip>

  <el-tooltip
    content="Eliminar"
    placement="bottom"
  >
    <el-button
      edit
      delete
    />
    <base-btn-confirm
      :item-selected="itemSelected"
      accion="deleted"
      :title="dialogDeleteTitle"
      :body-text="dialogDeleteBodyText"
      @confirmed-action="$emit('confirmed-action', $event)"
    />
  </el-tooltip>
</div>
</template>

<script>
import BaseBtnConfirm from '@/components/base/BaseBtnConfirm'

export default {
  components: {
    BaseBtnConfirm
  },

  props: {
    dialogDeleteTitle: { type: String, required: true },
    dialogDeleteBodyText: { type: String, required: true },
    itemSelected: { type: Object, default: () => ({}) }
  }
}
</script>
