<template>
  <BaseModal
    title="Agregar Autor"
    :show-modal="showModalAddWMSAuthor"
    :append-to-body="true"
    @action-modal="replaceShowModalAddWMSAuthor"
  >
    <template v-slot:content>
      <el-form
        ref="formWMSAuthor"
        label-position="top"
        status-icon
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :disabled="processingFormWMSAuthor"
        @submit.prevent="submitFormWMSAuthor"
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

        <!-- weburl -->
        <el-form-item label="URL">
          <el-input
            v-model="form.webUrl"
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
        :disabled="processingFormWMSAuthor"
        @click="replaceShowModalAddWMSAuthor({ show: false })"
      >CANCELAR</el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        :loading="processingFormWMSAuthor"
        @click.prevent="submitFormWMSAuthor"
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
      processingFormWMSAuthor: false,
      form: {
        name: "",
        description: "",
        webUrl: "",
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
    showModalAddWMSAuthor: {
      get () {
        return this.$store.state.modalsWMSServices.showModalAddWMSAuthor;
      },
      set (value) {
        this.replaceShowModalAddWMSAuthor({ show: value });
      }
    }
  },

  methods: {
    ...mapActions({
      getWMSAuthors: "WMSAuthors/getWMSAuthors",
      replaceShowModalAddWMSAuthor:
        "modalsWMSServices/replaceShowModalAddWMSAuthor"
    }),

    submitFormWMSAuthor () {
      this.$refs.formWMSAuthor.validate(valid => {
        if (valid) {
          this.processingFormWMSAuthor = true
          this.createWMSAuthor().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.formWMSAuthor.resetFields();
              this.replaceShowModalAddWMSAuthor({ show: false });
              this.getWMSAuthors();
              this.$toast.success(`El Author se registro con éxito`)
            }
          });
        }
      });
    },

    createWMSAuthor () {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        formData.append(val, this.form[val]);
      });

      return new Promise((resolve, reject) => {
        this.$WMSAuthorAPI
          .create({ data: formData })
          .then(response => {
            this.processingFormWMSAuthor = false
            resolve(response);
          })
          .catch(error => {
            this.processingFormWMSAuthor = false
            reject(error)
          });
      });
    },
  }
};
</script>
<style lang="scss">
</style>
