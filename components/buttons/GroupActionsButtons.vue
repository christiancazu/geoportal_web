<template>
  <div>
    <el-tooltip content="Editar" placement="bottom">
      <el-button
        circle
        icon="el-icon-edit"
        size="small"
        type="primary"
        @click="$emit('open-edit-modal')"
      />
    </el-tooltip>

    <el-tooltip content="Eliminar" placement="bottom">
      <el-button
        edit
        delete
      />
      <base-btn-confirm
        :item-selected="ItemSelected"
        @confirmed-action="$emit('confirmed-action', $event)"
        accion="deleted"
        :title="DialogDeleteTitle"
        :body-text="DialogDeleteBodyText"
      />                
    </el-tooltip>
  </div>
</template>

<script>
import BaseBtnConfirm from "@/components/base/BaseBtnConfirm"

export default {
  components: {
    BaseBtnConfirm
  },

  props: {
    DialogDeleteTitle: {
      type: String, required: true,
    },
    DialogDeleteBodyText: {
      type: String, required: true,
    },
    ItemSelected: {
      type: Object, required: true,
    },
  }
}
</script>
