<template>
  <BaseModal
    title="Registrar Servicios WMS"
    :show-modal="showModalAddWMSService"
    @action-modal="replaceShowModalAddWMSService"
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
        <!-- name -->
        <el-form-item
          label="Nombres"
          prop="name"
        >
          <el-input
            v-model="form.name"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <!-- weburl -->
        <el-form-item
          label="URL"
          prop="url"
        >
          <el-input
            v-model="form.url"
            type="text"
            autocomplete="off"
          />
        </el-form-item>

        <el-row :gutter="10">
          <el-col
            :xs="24"
            :sm="12"
          >
            <!-- region -->
            <el-form-item
              label="Autores"
              prop="author"
            >
              <el-container>
                <el-select
                  v-model="form.idAuthor"
                  value-key="id"
                  filterable
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in WMSAuthors"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-button
                  icon="el-icon-circle-plus"
                  circle
                  type="text"
                  class="pa-0 pl-1 ma-0"
                  style="font-size: 1.7rem;"
                  :disabled="processingForm"
                  @click="replaceShowModalAddWMSAuthor({ show:true })"
                ></el-button>
              </el-container>
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
          >
            <!-- category -->
            <el-form-item
              label="Categorías"
              prop="Categories"
            >
              <el-container>
                <el-select
                  v-model="form.idCategory"
                  filterable
                  value-key="id"
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in WMSCategories"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-button
                  icon="el-icon-circle-plus"
                  circle
                  type="text"
                  class="pa-0 pl-1 ma-0"
                  style="font-size: 1.7rem;"
                  :disabled="processingForm"
                  @click="replaceShowModalAddWMSCategory({ show: true })"
                ></el-button>
              </el-container>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item
          label="Descripción"
          prop="description"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            autocomplete="off"
            :maxlength="300"
            :show-word-limit="true"
          />
        </el-form-item>
        <el-form-item class="text-xs-right">
          <el-switch
            v-model="form.isEnabled"
            active-value="True"
            inactive-value="False"
            :active-text="form.isEnabled ? 'Servicio Activo': 'Servicio Inactivo' "
          ></el-switch>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        size="small"
        :disabled="processingForm"
        @click="replaceShowModalAddWMSService({ show: false })"
      >CANCELAR</el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        :loading="processingForm"
        @click.prevent="submitForm"
      >GUARDAR</el-button>
    </template>
    <template v-slot:modals>
      <ModalAddWMSAuthor />
      <ModalAddWMSCategory />
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";

import BaseModal from "@/components/base/BaseModal.vue";
import BasePopover from "@/components/base/BasePopover.vue";
import ModalAddWMSAuthor from "@/components/WMSServices/ModalAddWMSAuthor.vue";
import ModalAddWMSCategory from "@/components/WMSServices/ModalAddWMSCategory.vue";
export default {
  components: {
    BaseModal,
    BasePopover,
    ModalAddWMSAuthor,
    ModalAddWMSCategory
  },

  data () {
    return {
      processingForm: false,
      form: {
        name: "",
        description: "",
        url: "",
        idAuthor: '',
        isEnabled: "True",
        idCategory: '',
        isPublic: "True"
      },

      rules: {
        name: [{
          required: true,
          message: "El nombre es requerido"
        }],
        url: [{
          required: true,
          message: "El nombre es requerido"
        }]
      }
    };
  },

  watch: {
    showModalAddWMSService: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        return false;
      }
      if (newState) {
        this.getWMSCategories();
        this.getWMSAuthors();
      }
    }
  },

  computed: {
    ...mapState({
      WMSAuthors: state => state.WMSAuthors.WMSAuthors,
      loadingWMSAuthors: state => state.WMSAuthors.loadingWMSAuthors,
      WMSCategories: state => state.WMSCategories.WMSCategories,
      loadingWMSCategories: state => state.WMSCategories.loadingWMSCategories,
      showModalAddWMSService: state => state.modalsWMSServices.showModalAddWMSService,
    })
  },

  methods: {
    ...mapActions({
      replaceShowModalAddWMSService:
        "modalsWMSServices/replaceShowModalAddWMSService",
      replaceShowModalAddWMSAuthor:
        "modalsWMSServices/replaceShowModalAddWMSAuthor",
      getWMSCategories: "WMSCategories/getWMSCategories",
      getWMSAuthors: "WMSAuthors/getWMSAuthors",
      getWMSServices: "WMSServices/getWMSServices",
      replaceShowModalAddWMSCategory:
        "modalsWMSServices/replaceShowModalAddWMSCategory"
    }),

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.processingForm = true
          this.createWMSService().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.form.resetFields();
              this.replaceShowModalAddWMSService({ show: false });
              this.getWMSServices();
              this.$toast.success(`El servicio se registro con éxito`)
            }
          });
        }
      });
    },

    createWMSService () {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        formData.append(val, this.form[val]);
      });

      const data = formData;

      return new Promise((resolve, reject) => {
        this.$WMSServiceAPI
          .create({ data })
          .then(response => {
            this.processingForm = false
            resolve(response);
          })
          .catch(error => {
            this.processingForm = false
            reject(error)
          });
      });
    },
  }
};
</script>
<style lang="scss">
</style>
