<template>
  <BaseModal
    title="Registrar Categoría WMS"
    :show-modal="modalAddWMSCategory"
    :append-to-body="true"
    @action-modal="SHOW_MODAL_WMS('modalAddWMSCategory')"
    @close-modal="HIDE_MODAL_WMS('modalAddWMSCategory'); $refs.formWMSCategory.resetFields()"
  >
    <template v-slot:content>
      <el-form
        ref="formWMSCategory"
        label-position="top"
        status-icon
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :disabled="processingForm"
        @submit.prevent="submitFormWMSCategory"
      >
        <!-- name -->
        <el-form-item
          label="Nombre"
          prop="name"
        >
          <el-input
            v-model="form.name"
            type="text"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="Descripción">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            autocomplete="off"
            :maxlength="300"
            :show-word-limit="true"
          />
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        size="small"
        :disabled="processingForm"
        @click="HIDE_MODAL_WMS('modalAddWMSCategory')"
      >CANCELAR</el-button>
      <el-button
        size="small"
        native-type="submit"
        type="primary"
        :loading="processingForm"
        @click.prevent="submitFormWMSCategory"
      >GUARDAR</el-button>
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
import BaseModal from "@/components/base/BaseModal.vue";
import BasePopover from "@/components/base/BasePopover.vue";
import { SUCCESS } from "@/config/messages";

export default {
  components: {
    BaseModal,
    BasePopover
  },

  data () {
    return {
      processingForm: false,
      form: {
        name: "",
        description: "",
        isPublic: "True"
      },

      rules: {
        name: [{
          required: true,
          message: "El nombre es requerido"
        }]
      }
    };
  },

  computed: {
    ...mapState('modalsWMSServices', {
      modalAddWMSCategory: state => state.modalAddWMSCategory
    })
  },

  methods: {
    ...mapActions({
      getWMSCategories: "WMSCategories/getWMSCategories"
    }),

    ...mapMutations({
      SHOW_MODAL_WMS: 'modalsWMSServices/SHOW_MODAL_WMS',
      HIDE_MODAL_WMS: 'modalsWMSServices/HIDE_MODAL_WMS'
    }),

    submitFormWMSCategory () {
      this.$refs.formWMSCategory.validate(valid => {
        if (valid) {
          this.processingForm = true
          this.createWMSCategory().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.formWMSCategory.resetFields();
              this.getWMSCategories();
              this.$toast.success(this.$toast.success(SUCCESS.CATEGORY.REGISTERED))
            }
          });
        }
      });
    },

    createWMSCategory () {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        formData.append(val, this.form[val]);
      });

      return new Promise((resolve, reject) => {
        this.$WMSCategoryAPI
          .create({ data: formData })
          .then(response => {
            this.processingForm = false
            resolve(response);
          })
          .catch(error => {
            this.processingForm = false
            reject(error)
          });
      });
    }
  }
};
</script>
<style lang="scss">
</style>
