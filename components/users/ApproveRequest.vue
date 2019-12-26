<template>
<div>
  <div class="text-request">
    <label>Nombres y apellidos: </label>
    <p>
      {{ `${itemContext.name} ${itemContext.lastName} ${itemContext.lastNameAditional}` }}
    </p>

    <label>Email: </label>
    <p>{{ itemContext.email }}</p>

    <label>Institución: </label>
    <p>{{ itemContext.institute }}</p>

    <label>Motivo de uso: </label>
    <p>{{ itemContext.subject }}</p>
  </div>

  <base-form
    :form="form"
    :rules="rules"
    :store-base="storeBase"
    :message-toast="messageToast"
    custom-actions
    @close-modal="closeModal"
  >
    <template v-slot:form-content>
      <el-form-item
        label="¿Cuál es la razón para denegar esta solicitud?"
        prop="observation"
      >
        <el-input
          v-model="form.observation"
          type="textarea"
          :rows="3"
          autocomplete="off"
          :maxlength="300"
          show-word-limit
        />
      </el-form-item>
    </template>

    <template v-slot:form-custom-actions>
      <el-button
        type="danger"
        size="small"
        :disabled="$store.state.spinners.processingForm"
        :loading="$store.state.spinners.processingForm"
        @click.prevent="submitForm('rejectItemContext')"
      >
        RECHAZAR
      </el-button>
      <el-button
        type="success"
        size="small"
        :disabled="$store.state.spinners.processingForm"
        :loading="$store.state.spinners.processingForm"
        @click.prevent="submitForm('approveItemContext')"
      >
        APROBAR
      </el-button>
    </template>
  </base-form>
</div>
</template>

<script>
import BaseForm from '@/components/base/BaseForm'

import BaseFormSetup from '@/components/base/setup/BaseFormSetup'

import {
  mapState,
  mapActions
} from 'vuex'

import {
  observation
} from '@/config/form.rules'

import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from "@/types/mutations"

export default {
  components: {
    BaseForm
  },

  extends: BaseFormSetup,

  data () {
    return {
      dialogTitle: 'Solicitud pendiente',

      storeBase: {
        name: 'requests'
      },
      messageToast: {
        baseName: 'TODO',
        action: 'TODO'
      },

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
      getDataContext: 'requests/getDataContext'
    }),

    /**
     * getting the actions of the current store to send the submit request
     * @param {String} action
     *
     */
    async submitForm (action) {
      this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')

      const formData = new FormData()
      formData.append('observation', this.form.observation)
      formData.append('id', this.itemContext.id)

      try {
        await this.$store.dispatch(`${this.storeBase.name}/${action}`, formData)

        if (action === 'rejectItemContext') {
          this.$toast.info(this.$SUCCESS.REQUEST.REJECTED)
        } else {
          this.$toast.success(this.$SUCCESS.REQUEST.APPROVED)
        }

        await this.getDataContext()
        this.closeModal()
      }
      catch (e) {}
      this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')

    }
  }
}
</script>

<style lang="scss">
.text-request {
  & label {
    font-weight: 900
  }
}
</style>
