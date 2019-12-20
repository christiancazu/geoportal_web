<template>
<base-modal
  :modal="modal"
  :modal-type="modalType"
  @close-modal="closeModal"
>
  <template slot="modal-content">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
      label-position="top"
      class="demo-ruleForm"
    >
      <el-form-item
        label="Nombre"
        prop="name"
      >
        <el-input
          v-model="form.name"
          type="text"
          autocomplete="off"
          :rules="rules.name"
          autofocus
        />
      </el-form-item>

      <div class="text-xs-center">
        <el-button
          size="small"
          @click="closeModal()"
        >
          CERRAR
        </el-button>
        <el-button
          type="primary"
          size="small"
          native-type="submit"
          :loading="$store.state.spinners.processingForm"
          @click="saveGroupLayerName"
        >
          GUARDAR
        </el-button>
      </div>
    </el-form>
  </template>
</base-modal>
</template>

<script>
import BaseModal from '@/components/base/BaseModal'

import { name } from '@/config/form.rules'

import { CLOSE_MODAL } from '@/types/mutations'

export default {
  components: {
    BaseModal
  },

  data () {
    const
      dialogTitle = 'Registrar Grupo de capas',
      storeBaseName = 'groupLayers'
    return {
      dialogTitle,

      modalType: 'modalMain',

      modal: {
        store: storeBaseName,
        title: dialogTitle
      },
      storeBase: {
        name: storeBaseName,
        action: 'update'
      },
      form: {
        name: ''
      },
      rules: {
        name: name('grupo de capas')
      }
    }
  },

  methods: {
    async saveGroupLayerName () {
      let isFormValid = false
      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        this.$emit('set-group-layer-name', this.form.name)
        this.$refs.form.resetFields()
      }
    },

    closeModal () {
      this.$emit('close-modal')
      this.$store.commit(`groupLayers/${CLOSE_MODAL}`, 'modalMain')
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>
/* selected group layer tree border color */
.is-current > .el-tree-node__content {
  border: 1px solid #DCDFE6
}
</style>
