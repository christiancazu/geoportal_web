<template>
  <BaseModal
    title="Nueva imagen georeferenciada"
    name-state="modalAddGeoreferencedImage"
    :show-modal="modalAddGeoreferencedImage"
  >
    <template v-slot:content>
      <el-form
        ref="form"
        label-position="top"
        status-icon
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :disabled="processingForm"
        @submit.prevent="submitForm"
      >

      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        size="small"
        :disabled="processingForm"
        @click="$_modalVisibilityMixin_close('modalAddGeoreferencedImage')"
      >CANCELAR</el-button>
      <el-button
        size="small"
        :loading="processingForm"
        type="primary"
        native-type="submit"
        @click.prevent="submitForm"
      >GUARDAR</el-button>
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
      processingForm: false,
      form: {},
      rules: {}
    }
  },

  computed: {
    ...mapState({
      modalAddGeoreferencedImage: state => state.modalsVisibilities.modalAddGeoreferencedImage
    })
  },
}
</script>
<style lang="scss">
.map {
  height: 200px;
}
</style>