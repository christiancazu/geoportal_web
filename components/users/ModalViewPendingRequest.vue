<template>
  <BaseModal
    title="Detalle de solicitud"
    :show-modal="showModalViewPendingRequest"
    @action-modal="replaceShowModalViewPendingRequest"
    v-if="currentPendingRequest"
  >
    <template v-slot:content>
      <div class="text-request">
        <label class="text-uppercase">{{ `${currentPendingRequest.name} ${currentPendingRequest.lastName} ${currentPendingRequest.lastNameAditional}` }}</label>
        <p class="ma-0">{{ `${currentPendingRequest.email}` }}</p>
        <p class="text-uppercase ma-0">{{ `${currentPendingRequest.institute}` }}</p>
      </div>
      <div class="my-3 text-request">
        <label class="text-uppercase">Motivo de uso: </label>
        <p class="text-capitalize ma-0"> {{ `${currentPendingRequest.subject}` }}</p>
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
          :disabled="processingRejection"
        >
          <el-form-item
            label="¿Porque rechazó esta solicitud?"
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
    </template>
    <template v-slot:actions>
      <el-button
        class="ma-2"
        type="danger"
        size="small"
        native-type="submit"
        :disabled="processingAcceptance"
        :loading="processingRejection"
        @click.prevent="submitFormReject"
      >RECHAZAR SOLICITUD</el-button>
      <el-button
        class="ma-2"
        type="success"
        size="small"
        native-type="submit"
        :disabled="processingRejection"
        :loading="processingAcceptance"
        @click.prevent="acceptRequest"
      >APROBAR SOLICITUD</el-button>
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal.vue";

export default {
  components: {
    BaseModal
  },
  data () {
    return {
      processingRejection: false,
      processingAcceptance: false,
      isRejectRequest: false,
      form: {
        observation: ''
      },
      rules: {
        observation: [{
          required: true,
          message: "Este campo es requerido"
        }]
      }
    };
  },

  watch: {
    showModalViewPendingRequest: function (newState, oldState) {
      if (!newState) {
        return false;
      }
    }
  },

  computed: {
    ...mapState({
      currentPendingRequest: state => state.userRequests.currentPendingRequest,
      showModalViewPendingRequest: state => state.modalsManagementUser.showModalViewPendingRequest
    })
  },

  methods: {
    ...mapActions({
      replaceShowModalViewPendingRequest: "modalsManagementUser/replaceShowModalViewPendingRequest",
      getPendingRequests: "userRequests/getPendingRequests",
    }),

    submitFormReject () {
      if (!this.isRejectRequest) {
        this.isRejectRequest = true
        return false
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.rejectRequest()
        }
      });
    },

    rejectRequest () {
      this.processingRejection = true
      const data = {
        observation: this.form.observation,
        id: this.currentPendingRequest.id
      }
      new Promise((resolve, reject) => {
        this.$userRequestAPI.rejected({ data })
          .then(response => {
            this.processingRejection = false
            this.$toast.success(`La solicitud se rechazó con éxito`)
            this.replaceShowModalViewPendingRequest({ show: false })
            resolve(response)
            this.getPendingRequests()
          }).catch(error => {
            this.processingRejection = false
            reject(error)
          })
      })
    },

    acceptRequest () {
      if (this.isRejectRequest) {
        this.isRejectRequest = false
        return false
      }

      this.processingAcceptance = true
      const data = {
        id: this.currentPendingRequest.id
      }

      new Promise((resolve, reject) => {
        this.$userRequestAPI.approve({ data })
          .then(response => {
            this.processingAcceptance = false
            this.$toast.success(`La solicitud se aprobó con éxito`)
            this.replaceShowModalViewPendingRequest({ show: false })
            this.getPendingRequests()
            resolve(response)
          }).catch(error => {
            this.processingAcceptance = false
            reject(error)
          })
      })
    },
  }
};
</script>
<style lang="scss">
.text-request {
  line-height: 1.2rem;
  letter-spacing: 0.4px;
}
</style>