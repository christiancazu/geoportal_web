<template>
  <BaseModal
    title="Detalle del reporte"
    :show-modal="showModalViewReport"
    @action-modal="replaceShowModalViewReport"
    v-if="currentReport"
  >
    <template v-slot:content>

      <div class="text-request">
        <label class="text-uppercase">{{ `${currentReport.user}`}}</label>
        <p class="text-uppercase ma-0">{{ `${currentReport.subject}` }}</p>
      </div>
      <div class="my-3 text-request">
        <label class="text-uppercase">Descripción del reporte: </label>
        <p class="text-capitalize ma-0"> {{ `${currentReport.description}` }}</p>
      </div>
      <el-image
        :src="currentReport.image"
        fit="contain"
      >
        <div
          slot="placeholder"
          class="image-slot"
        >
          Loading<span class="dot">...</span>
        </div>
      </el-image>

    </template>
    <template v-slot:modals>
      <ModalViewBackup />
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal.vue";
import ModalViewBackup from "@/components/backups/ModalViewBackup.vue";

export default {
  components: {
    BaseModal,
    ModalViewBackup
  },
  computed: {
    ...mapState({
      currentReport: state => state.reports.currentReport,
      showModalViewReport: state => state.reports.showModalViewReport
    })
  },

  methods: {
    ...mapActions({
      replaceShowModalViewReport: "reports/replaceShowModalViewReport",
      getPendingRequests: "reports/getPendingRequests",
    })
  }
};
</script>
<style lang="scss">
.text-request {
  line-height: 1.2rem;
  letter-spacing: 0.4px;
}
.d-flex {
  display: flex;
}
</style>