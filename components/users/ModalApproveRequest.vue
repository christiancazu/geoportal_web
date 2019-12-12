<template>
<el-dialog
  title="Aprobar solicitud de registro"
  :close-on-click-modal="false"
  :visible="$store.state.modalsVisibilities[context.mountedOn].visibility"
  top="2vh"
  @close="closeModal()"
>
  <div class="text-request">
    <label class="text-uppercase">
      {{ `${itemContext.name} ${itemContext.lastName} ${itemContext.lastNameAditional}` }}
    </label>
    <p class="ma-0">{{ `${itemContext.email}` }}</p>
    <p class="text-uppercase ma-0">{{ `${itemContext.institute}` }}</p>
  </div>
  <div class="my-3 text-request">
    <label class="text-uppercase">Motivo de uso: </label>
    <p class="text-capitalize ma-0"> {{ `${itemContext.subject}` }}</p>
  </div>
  <div v-if="isRejectRequest">
    <el-form
      ref="form"
      label-position="top"
      status-icon
      :model="form"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :disabled="$store.state.spinners.processingForm"
    >
      <el-form-item
        label="¿Cual es la razón para denegar esta solicitud?"
        prop="observation"
      >
        <el-input
          v-model="form.observation"
          type="textarea"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
  </div>
  <div class="text-xs-center">
    <el-button
      class="ma-2"
      type="danger"
      size="small"
      native-type="submit"
      :disabled="$store.state.spinners.processingForm"
      :loading="isRejectRequest && $store.state.spinners.processingForm"
      @click.prevent="submitFormReject"
    >
      RECHAZAR SOLICITUD
    </el-button>
    <el-button
      class="ma-2"
      type="success"
      size="small"
      native-type="submit"
      :disabled="$store.state.spinners.processingForm"
      :loading="!isRejectRequest && $store.state.spinners.processingForm"
      @click.prevent="acceptRequest"
    >
      APROBAR SOLICITUD
    </el-button>
  </div>
</el-dialog>
</template>

<script>
import { observation } from '@/config/form.rules'

import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      context: {
        storeBase: 'requests',
        mountedOn: 'mainModal',
        storeAction: 'approve'
      },

      isRejectRequest: false,
      form: {
        observation: ''
      },
      rules: {
        observation
      }
    }
  },

  computed: {
    ...mapState({
      itemContext: state => state.requests.itemContext
    })
  },

  methods: {
    ...mapActions({
      getDataContext: 'requests/getDataContext',
      approveItemContext: 'requests/approveItemContext',
      rejectItemContext: 'requests/rejectItemContext',
    }),

    async submitFormReject () {
      if (!this.isRejectRequest) {
        this.isRejectRequest = true
        return false
      }

      let isFormValid = false

      const formData = new FormData()
      formData.append('observation', this.form.observation)
      formData.append('id', this.itemContext.id)

      await this.$refs.form.validate(valid => isFormValid = valid)

      if (isFormValid) {
        try {
          await this.rejectItemContext(formData)
          this.$toast.info(this.$SUCCESS.REQUEST.REJECT)
          await this.getDataContext()
          this.closeModal()
        }
        catch (e) {}
      }
    },

    async acceptRequest () {
      if (this.isRejectRequest) {
        this.isRejectRequest = false
        return false
      }
      const formData = new FormData()
      formData.append('id', this.itemContext.id)

      try {
        await this.approveItemContext(formData)

        this.$toast.success(this.$SUCCESS.REQUEST.APPROVED)

        await this.getDataContext()

        this.closeModal()
      }
      catch (e) { }
    },

    resetForm () {
      if (this.isRejectRequest) {
        this.$refs.form.resetFields()
        this.isRejectRequest = false
      }
    },

    closeModal () {
      this.resetForm()
      this.$store.commit('modalsVisibilities/CLOSE_MODAL', this.context.mountedOn)
    }
  }
}
</script>

<style lang="scss">
.text-request {
  line-height: 1.2rem;
  letter-spacing: 0.4px;
}
</style>
