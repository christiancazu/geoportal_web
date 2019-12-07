<template>
<base-page :page-header="pageHeader">
  <el-form
    ref="form"
    v-loading="!profileLoaded"
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

      <upload-file
        :file="file"
        type-image
        avatar-image
        @on-file-valid="$_uploadFileMixin_valid"
        @delete-file="$_uploadFileMixin_clear()"
      />

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
        :xs="24" :sm="8"
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
        :xs="24" :sm="8"
      >
        <!-- provincia -->
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
        :xs="24" :sm="8"
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
import uploadFileMixin from '@/mixins/uploadFileMixin'

import {
  mapState,
  mapActions
} from 'vuex'

import {
  name,
  lastName,
  lastNameAditional,
  districtId
} from '@/config/form.rules'

import {
  ENABLE_PROCESSING_FORM,
  DISABLE_PROCESSING_FORM
} from '@/types/mutation-types.js'

import { USER_FILE_MAX_SIZE } from '@/config/constants'

export default {
  components: {
    BasePage
  },

  mixins: [uploadFileMixin],

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
        username: ''
      },
      rules: {
        name: name('usuario'),
        lastName,
        lastNameAditional,
        districtId
      },
      file: {
        type: 'image',
        availableExtensions: [
          'png',
          'jpg',
          'jpeg'
        ],
        maxSizeLabel: USER_FILE_MAX_SIZE.label,
        maxSizeLength: USER_FILE_MAX_SIZE.length,
        selected: null,
        imageUrl: ''
      },
      profileLoaded: false
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

  async created () {
    await this.fetchContext()
    this.assignExtensionsString()
  },

  methods: {
    ...mapActions({
      getProfile: 'users/getProfile',
      getRegions: 'public/getRegions',
      getProvinces: 'public/getProvinces',
      getDistricts: 'public/getDistricts'
    }),

    async fetchContext () {
      try {
        this.$store.commit(`spinners/${ENABLE_PROCESSING_FORM}`)
        await this.getProfile()

        this.profileLoaded = true

        this.assignFormFields()

        await this.getRegions()
        await this.getProvinces(this.$store.state.users.profile.regionId)
        await this.getDistricts(this.$store.state.users.profile.provinceId)
      }
      catch (error) {}
      this.$store.commit(`spinners/${DISABLE_PROCESSING_FORM}`)
    },

    assignFormFields () {
      Object.keys(this.form).forEach(key => (this.form[key] = this.profile[key]))
      this.file.imageUrl = this.form[this.file.type]
    },

    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        try {
          this.$store.commit(`spinners/${ENABLE_PROCESSING_FORM}`)

          const formData = this.objectToFormData()

          // just if image isn't null append to formdata
          if (this.file.selected !== null) {
            formData.append('image', this.file.selected)
          }

          // delete image prop from form if have the initial path url as string
          // before to be sended
          if (typeof this.form.image === 'string') {
            formData.delete('image')
          }

          await this.$store.dispatch('users/updateProfile', formData)

          /**
           * updating current auth.user state to view changes (image user)
           */
          const data = await this.$store.dispatch('users/getUserInfo')
          this.$store.commit('auth/SET', { key: 'user', value: data.user })

          this.$toast.success(this.$SUCCESS.USER.UPDATED)
        }
        catch (e) {}
        this.$store.commit(`spinners/${DISABLE_PROCESSING_FORM}`)
      } else {
        this.$toast.error(this.$ERRORS.INVALID_DATA)
      }
    },

    objectToFormData () {
      const formData = new FormData()

      Object.keys(this.form).forEach(key => {
        formData.append(key, this.form[key])
      })
      return formData
    },

    assignExtensionsString () {
      this.file.availableExtensions.forEach(e => {
        this.extensionsString += e + ', '
      })
      this.extensionsString = '(' + this.extensionsString.substring(0, this.extensionsString.length - 2) + ')'
    },

    onChangeRegion (regionId) {
      this.form.provinceId = ''
      this.form.districtId = ''
      this.getProvinces(regionId)
    },

    onChangeProvince (provinceId) {
      this.form.districtId = ''
      this.getDistricts(provinceId)
    },

    /**
     * @override mixin to prevent autocomplete on name field
     */
    $_uploadFileMixin_valid (file) {
      this.form[this.file.type] = file
      this.file.selected = file
    }
  },

  head: {
    title: 'Mi Perfil'
  }
}
</script>