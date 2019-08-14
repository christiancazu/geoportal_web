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
        <el-form-item label="URL">
          <el-input
            v-model="form.webUrl"
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
                  v-model="form.authorId"
                  value-key="id"
                  filterable
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in WMSAuthors"
                    :key="item.id"
                    :label="item.name"
                    :value="item"
                  ></el-option>
                </el-select>
                <el-button
                  icon="el-icon-circle-plus"
                  circle
                  type="text"
                  class="pa-0 pl-1 ma-0"
                  style="font-size: 1.7rem;"
                  @click="replaceShowModalAddWMSAuthor({ show:true })"
                ></el-button>
              </el-container>
            </el-form-item>
          </el-col>
          <el-col
            :xs="24"
            :sm="12"
          >
            <!-- porvincia -->
            <el-form-item
              label="Categorías"
              prop="Categories"
            >
              <el-container>
                <el-select
                  v-model="form.categoryId"
                  value-key="id"
                  filterable
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in WMSCategories"
                    :key="item.id"
                    :label="item.name"
                    :value="item"
                  ></el-option>
                </el-select>
                <el-button
                  icon="el-icon-circle-plus"
                  circle
                  type="text"
                  class="pa-0 pl-1 ma-0"
                  style="font-size: 1.7rem;"
                  @click="replaceShowModalAddWMSCategory({ show: true })"
                ></el-button>
              </el-container>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row
          :gutter="10"
          align="bottom"
          justify="center"
        >
          <el-col :md="12">
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
          </el-col>
          <el-col :md="12">
            <!-- image -->
            <el-form-item
              label="Imagen de Servicio"
              class="text-xs-center"
            >
              <el-upload
                class="avatar-uploader"
                action
                :http-request="launchUploadAvatar"
                :show-file-list="false"
                name="image"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="imageSelected"
                  :src="imageSelected"
                  class="avatar"
                />
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        size="small"
        @click="replaceShowModalAddWMSService({ show: false })"
      >CANCELAR</el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
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
      imageSelected: "",
      form: {
        name: "",
        description: "",
        webUrl: "",
        image: ""
      },

      rules: {
        name: [
          {
            required: true,
            message: "El nombre es requerido"
          }
        ]
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
      WMSServices: state => state.WMSServices.WMSServices
    }),

    showModalAddWMSService: {
      get () {
        return this.$store.state.modalsWMSServices.showModalAddWMSService;
      },
      set (value) {
        this.replaceShowModalAddWMSService({ show: value });
      }
    }
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

    onChangeZindex (val) {
      // console.log(val, "val");
    },

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.createWMSService().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.form.resetFields();
              this.replaceShowModalAddWMSService({ show: false });
              this.getWMSServices();
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
            resolve(response);
          })
          .catch(error => reject(error));
      });
    },

    launchUploadAvatar (option) {
      this.imageSelected = URL.createObjectURL(option.file);
      this.form.image = option.file;
    },

    beforeAvatarUpload (file) {
      const isJPG = file.type === "image/png" || file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("La imagen debe estar en formato JPG!");
      }
      if (!isLt2M) {
        this.$message.error("La imagen excede los 2MB!");
      }
      return isJPG && isLt2M;
    },

    onchangeRegions (region) {
      const params = {
        id: region.id
      };
      this.replaceProvinces({ provinces: null });
      this.replaceDistricts({ districts: null });
      this.$refs.province.resetField();
      this.$refs.districtId.resetField();

      this.getProvinces({ params });
    },

    onchangeProvinces (province) {
      const params = {
        id: province.id
      };

      this.replaceDistricts({ districts: null });
      this.$refs.districtId.resetField();
      this.getDistricts({ params });
    }
  }
};
</script>
<style lang="scss">
</style>
