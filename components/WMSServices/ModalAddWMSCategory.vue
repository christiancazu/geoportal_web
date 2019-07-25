<template>
  <div>
    <el-dialog
      title="Registrar Servicio WMS"
      top="2vh"
      :visible.sync="showModalAddWMSService"
    >
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
        <el-form-item
          label="Apellido"
          prop="lastName"
        >
          <el-input
            v-model="form.lastName"
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
              label="Región"
              prop="region"
            >
              <el-container>
                <el-select
                  v-model="form.region"
                  value-key="id"
                  filterable
                  placeholder="Select"
                  @change="onchangeRegions"
                >
                  <el-option
                    v-for="item in regions"
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
              label="Provincia"
              prop="province"
              ref="province"
            >
              <el-container>
                <el-select
                  v-model="form.region"
                  value-key="id"
                  filterable
                  placeholder="Select"
                  @change="onchangeRegions"
                >
                  <el-option
                    v-for="item in regions"
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
              label="¿Porque desea usar el Geoportal?"
              prop="subject"
            >
              <el-input
                v-model="form.subject"
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
              label="Imagen de Perfil"
              class="text-xs-center"
            >
              <el-upload
                class="avatar-uploader"
                action=""
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
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="replaceShowModalAddWMSService({ show: false })">Cancel</el-button>
        <el-button
          type="primary"
          native-type="submit"
          @click.prevent="submitForm"
        >Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      imageSelected: '',
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        description: '',
        webUrl: '',
        image: '',
      },

      rules: {
        name: [{
          required: true,
          message: "El nombre es requerido"
        }]
      }
    };
  },

  watch: {
    showModalAddWMSService: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields()
        return false
      }
    }
  },

  computed: {
    ...mapState({
      regions: state => state.regions.regions,
      loadingRegions: state => state.regions.loadingRegions,
      provinces: state => state.regions.provinces,
      loadingProvinces: state => state.regions.loadingProvinces,
      districts: state => state.regions.districts,
      loadingDistricts: state => state.regions.loadingDistricts,
    }),

    showModalAddWMSService: {
      get () {
        return this.$store.state.modalsWMSServices.showModalAddWMSService
      },
      set (value) {
        this.replaceShowModalAddWMSService({ show: value })
      }
    }
  },

  created () {
    this.getRegions()
  },

  methods: {
    ...mapActions({
      replaceShowModalAddWMSService: 'modalsWMSServices/replaceShowModalAddWMSService',
      getRegions: 'regions/getRegions',
      getProvinces: 'regions/getProvinces',
      getDistricts: 'regions/getDistricts',
      replaceProvinces: 'regions/replaceProvinces',
      replaceDistricts: 'regions/replaceDistricts',
      getWMSServices: 'WMSServices/getWMSServices',
    }),

    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.createUser().then(response => {
            const { status } = response.data
            if (status) {
              this.$refs.form.resetFields()
              this.replaceShowModalAddWMSService({ show: false })
              this.getWMSServices()

            }
          })
        }
      })
    },

    createUser () {
      const formData = new FormData()

      let keys = Object.keys(this.form)
      keys.forEach(val => {
        formData.append(val, this.form[val])
      })

      const data = formData

      return new Promise((resolve, reject) => {
        this.$userAPI.create({ data })
          .then(response => {
            resolve(response)
          }).catch(error => reject(error))
      })
    },

    launchUploadAvatar (option) {
      this.imageSelected = URL.createObjectURL(option.file);
      this.form.image = option.file
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
      }
      this.replaceProvinces({ provinces: null })
      this.replaceDistricts({ districts: null })
      this.$refs.province.resetField()
      this.$refs.districtId.resetField()

      this.getProvinces({ params })
    },

    onchangeProvinces (province) {
      const params = {
        id: province.id
      }

      this.replaceDistricts({ districts: null })
      this.$refs.districtId.resetField()
      this.getDistricts({ params })
    }
  },
};
</script>
<style lang="scss">

</style>