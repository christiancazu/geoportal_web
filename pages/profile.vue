<template>
<base-page
  :page-header="pageHeader"
  :fit-content="true"
>
  <el-form
    ref="form"
    label-position="top"
    status-icon
    :model="form"
    :rules="rules"
    label-width="120px"
    :disabled="$store.state.spinners.processingForm"
    class="demo-ruleForm"
  >
    <el-form-item
      label="Imagen de Perfil"
      class="text-xs-center"
    >
      <el-upload
        class="avatar-uploader"
        action
        :disabled="$store.state.spinners.processingForm"
        :show-file-list="false"
        name="image"
        :http-request="launchUploadAvatar"
        :before-upload="beforeAvatarUpload"
      >
        <img
          v-if="form.image"
          :src="form.image"
          class="avatar"
        >
        <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
        />
      </el-upload>
    </el-form-item>
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
      >
        <el-form-item
          label="Nombre de Usuario"
          prop="username"
        >
          <el-input
            v-model="form.username"
            type="text"
            disabled
            autocomplete="off"
          />
        </el-form-item>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
      >
        <el-form-item
          label="Correo Electrónico"
          prop="email"
        >
          <el-input
            v-model="form.email"
            disabled
            type="text"
            autocomplete="off"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
      >
        <el-form-item
          label="Nombres"
          prop="name"
        >
          <el-input
            v-model="form.name"
            :disabled="$store.state.spinners.processingForm"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
      >
        <el-form-item
          label="Apellido Paterno"
          prop="lastName"
        >
          <el-input
            v-model="form.lastName"
            :disabled="$store.state.spinners.processingForm"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="8"
      >
        <el-form-item
          label="Apellido Materno"
          prop="lastNameAditional"
        >
          <el-input
            v-model="form.lastNameAditional"
            :disabled="$store.state.spinners.processingForm"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="8"
      >
        <!-- regionId -->
        <el-form-item
          label="Región"
          prop="regionId"
        >
          <el-select
            v-model="form.regionId"
            value-key="id"
            filterable
            :loading="$store.state.spinners.processingForm"
            placeholder="Select"
            @change="onChangeRegion"
          >
            <el-option
              v-for="region in regions" :key="region.id"
              :label="region.name"
              :value="region.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        :xs="24"
        :sm="8"
      >
        <!-- porvincia -->
        <el-form-item
          ref="provinceId"
          label="Provincia"
          prop="provinceId"
        >
          <el-select
            v-model="form.provinceId"
            value-key="id"
            :disabled="!form.regionId"
            :loading="$store.state.spinners.processingForm"
            filterable
            placeholder="Select"
            @change="onChangeProvince"
          >
            <el-option
              v-for="item in provinces"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col
        :xs="24"
        :sm="8"
      >
        <!-- distrito -->
        <el-form-item
          ref="districtId"
          label="Distrito"
          prop="districtId"
        >
          <el-select
            v-model="form.districtId"
            value-key="id"
            filterable
            :disabled="!form.provinceId"
            :loading="$store.state.spinners.processingForm"
            placeholder="Select"
          >
            <el-option
              v-for="district in districts" :key="district.id"
              :label="district.name"
              :value="district.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="text-xs-center mb-0">
      <el-button
        :loading="$store.state.spinners.processingForm"
        type="primary"
        size="small"
        @click="submitForm"
      >
        GUARDAR
      </el-button>
    </el-form-item>
  </el-form>
</base-page>
</template>
<script>

import BasePage from '@/components/base/pages/BasePage'

import { mapState, mapActions } from 'vuex'

import {
  username,
  districtId
} from '@/config/form.rules'

export default {
  components: {
    BasePage
  },

  data () {
    return {
      pageHeader: {
        title: 'MI PERFIL'
      },
      form: {
        districtId: null,
        email: '',
        id: null,
        image: '',
        lastName: '',
        lastNameAditional: null,
        name: '',
        provinceId: null,
        regionId: null,
        status: '',
        userTypeId: '',
        username: '',
      },
      rules: {
        name: username,
        districtId
      },

      file: {
        availableExtensions: [
          '.png',
          '.jpg',
          '.jpeg'
        ],
        maxSize: 262144 // (bytes units) => 262144 bytes = 2mb
      },
      extensionsString: '',


      imageSelected: null
    }
  },

  computed: {
    ...mapState({
      user: state => state.auth.user,
      profile: state => state.users.profile,
      regions: state => state.public.regions,
      provinces: state => state.public.provinces,
      districts: state => state.public.districts
    })
  },

  created () {
    this.fetchContext()
    this.assignExtensionsString()
  },

  methods: {
    ...mapActions({
      getProfile: 'users/getProfile',
      getRegions: 'public/getRegions',
      getProvinces: 'public/getProvinces',
      getDistricts: 'public/getDistricts',
      // replaceDistricts: 'regions/replaceDistricts'
    }),

    async fetchContext () {
      try {
        this.$store.commit('spinners/ENABLE_PROCESSING_FORM')
        await this.getProfile()

        this.assignFormFields()

        await this.getRegions()
        await this.getProvinces(this.$store.state.users.profile.regionId)
        await this.getDistricts(this.$store.state.users.profile.provinceId)
      }
      catch (error) {}
      this.$store.commit('spinners/DISABLE_PROCESSING_FORM')
    },

    assignFormFields () {
      Object.keys(this.form).forEach(key => (this.form[key] = this.profile[key]))
    },

    setFormField (data) {
      this.profile = data
      this.profile.email = this.user.email

      this.form.name = data.name
      this.form.lastName = data.lastName
      this.form.lastNameAditional = data.lastNameAditional
      this.form.status = data.status
      this.form.districtId = data.districtId || ''

      this.form.institute = data.institute
      this.form.subject = data.subject
      this.imageSelected = data.image

      this.getProvinces({ params: { id: data.regionId } })
      this.getDistricts({ params: { id: data.provinceId } })
    },

    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        console.warn(this.form)
      }
    },

    modifyProfile () {
      const data = new FormData()
      let keys = Object.keys(this.form)
      keys.forEach(val => {
        data.append(val, this.form[val])
      })

      return new Promise((resolve, reject) => {
        this.$userAPI
          .putProfile({ data })
          .then(response => {
            this.processingForm = false
            if (response.data.status)
              this.$toast.success('Su perfil ha sido actualizado con éxito')

            resolve(response)
          })
          .catch(error => {
            this.processingForm = false
            reject(error)
          })
      })
    },

    launchUploadAvatar (option) {
      this.imageSelected = URL.createObjectURL(option.file)
      this.form.image = option.file
    },

    beforeAvatarUpload (currentFile) {
      const currentExtension = `.${currentFile.name.split('.').pop()}`

      const isExtensionValid = this.file.availableExtensions.includes(currentExtension)

      if (!isExtensionValid) {
        this.$message.error(`Solo se acepta archivos ${this.extensionsString}`)
        return isExtensionValid
      }

      const currentImageSize = currentFile.size

      const isImageSizeValid = currentImageSize < this.file.maxSize

      if (!isImageSizeValid) {
        this.$message.error('La imagen excede los 2MB!')
        return isImageSizeValid
      }

      return true
    },

    assignExtensionsString () {
      this.file.availableExtensions.forEach(e => {
        this.extensionsString += e + ' ó '
      })
      this.extensionsString = this.extensionsString.substring(0, this.extensionsString.length - 2)
    },

    onChangeRegion (regionId) {
      this.form.provinceId = ''
      this.form.districtId = ''
      this.getProvinces(regionId)
    },

    onChangeProvince (provinceId) {
      this.form.districtId = ''
      this.getDistricts(provinceId)
    }
  },

  head: {
    title: 'Mi Perfil',
  }
}
</script>
