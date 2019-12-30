<template>
<base-page
  :page-header="pageHeader"
  :is-mounted-as-page="isMountedAsPage"
>
  <base-form
    :form="form"
    :rules="rules"
    :store-base="storeBase"
    :message-toast="messageToast"
    :is-mounted-as-page="isMountedAsPage"
    @apply-before-submit-form="applyBeforeSubmitForm"
    @apply-after-submit-form="applyAfterSubmitForm"
  >
    <template v-slot:form-content>
      <el-row
        type="flex"
        :gutter="10"
        justify="center"
      >
        <el-col
          :xs="24" :md="8"
        >
          <el-form-item
            label="Imagen de perfil"
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
        </el-col>

        <el-col
          :xs="24" :md="8"
        >
          <el-form-item
            label="Nombre de usuario"
            prop="username"
          >
            <el-input
              v-model="form.username"
              type="text"
              disabled
              autocomplete="off"
            />
          </el-form-item>

          <el-form-item
            label="Correo electrónico"
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
          :xs="24" :sm="12" :md="8"
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
          :xs="24" :sm="12" :md="8"
        >
          <el-form-item
            label="Apellido paterno"
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
          :xs="24" :sm="12" :md="8"
        >
          <el-form-item
            label="Apellido materno"
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
    </template>
  </base-form>
</base-page>
</template>

<script>
import BasePage from '@/components/base/pages/BasePage'
import BaseForm from '@/components/base/BaseForm'

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
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '@/types/mutations'

import { USER_FILE_MAX_SIZE } from '@/config/constants'

export default {
  components: {
    BasePage,
    BaseForm
  },

  mixins: [uploadFileMixin],

  data () {
    return {
      // base-page component settings
      pageHeader: {
        title: 'Mi Perfil'
      },
      // base-form component settings
      storeBase: {
        name: 'users',
        action: 'updateProfile'
      },
      messageToast: {
        baseName: 'USER',
        action: 'UPDATED'
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
      isMountedAsPage: true,
      // upload-file component settings
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
      }
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
        this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')
        await this.getProfile()

        this.assignFormFields()

        await this.getRegions()
        await this.getProvinces(this.$store.state.users.profile.regionId)
        await this.getDistricts(this.$store.state.users.profile.provinceId)
      }
      catch (error) {}
      this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')
    },

    assignFormFields () {
      Object.keys(this.form).forEach(key => (this.form[key] = this.profile[key]))
      this.file.imageUrl = this.form[this.file.type]
    },

    assignExtensionsString () {
      this.file.availableExtensions.forEach(e => this.extensionsString += e + ', ')
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
     * getting formData by reference from BaseForm component
     * to apply custom functionality
     *
     * @param {Object} formData
     */
    applyBeforeSubmitForm (formData) {
      if (formData.get(this.file.type) === null || typeof formData.get(this.file.type) === 'string')
        formData.delete(this.file.type)
    },

    /**
     * apply custom functionality BaseForm component has submited
     * update profile image on sidebar after update
     *
     * @param {Object} formData
     */
    async applyAfterSubmitForm () {
      if (typeof this.form.image === 'string') return
      try {
        const { user } = await this.$store.dispatch('users/getUserInfo')
        this.$store.commit('auth/SET', { key: 'user', value: user })
      } catch (error) {}
    },

    /**
     * @override mixin to prevent autocomplete on name field
     */
    $_uploadFileMixin_valid (file) {
      this.form[this.file.type] = file
      this.file.selected = file
    },

    /**
     * @override mixin to prevent delete name
     *
     */
    $_uploadFileMixin_clear () {
      this.form[this.file.type] = null
      this.file.selected = null
    }
  },

  head: {
    title: 'Mi Perfil'
  }
}
</script>
