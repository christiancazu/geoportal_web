<template>
<base-form
  :form-title="formTitle"
  :rules="rules"
  :form="form"
  :context="context"
  :message-toast="messageToast"
  @apply-custom-functionality-to-form="ApplyCustomFunctionalityToForm"
>
  <template v-slot:content>

    <el-row
      :gutter="10"
      align="bottom"
      justify="center"
    >
      <el-col :md="12">
        <!-- image -->
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
      </el-col>
      <el-col :md="12">
        <!-- username -->
        <el-form-item label="Nombre de Usuario">
          <el-input
            v-model="form.username"
            type="text"
            disabled
            autocomplete="off"
          />
        </el-form-item>

        <!-- email -->
        <el-form-item label="Correo Electrónico">
          <el-input
            v-model="form.email"
            disabled
            type="text"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="8"
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
      </el-col>
      <el-col
        :xs="24"
        :sm="8"
      >
        <!-- lasname -->
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
      </el-col>
      <el-col
        :xs="24"
        :sm="8"
      >
        <!-- lasname -->
        <el-form-item
          label="Segundo apellido"
          prop="lastNameAditional"
        >
          <el-input
            v-model="form.lastNameAditional"
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
            :loading="loadRegions"
            placeholder="Select"
            @change="onChangeRegion"
          >
            <el-option
              v-for="item in regions"
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
        <!-- porvincia -->
        <el-form-item
          ref="provinceId"
          label="Provincia"
          prop="provinceId"
        >
          <el-select
            v-model="form.provinceId"
            value-key="id"
            :loading="loadProvinces"
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
            :loading="loadDistricts"
            placeholder="Select"
          >
            <el-option
              v-for="item in districts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :xs="12"
        :sm="12"
        :md="12"
      >
        <el-form-item
          class="text-xs-center"
          label="Privilegio"
        >
          <el-switch
            v-model="form.userTypeId"
            class="text-xs-center"
            style="display: block"
            inactive-color="#6376f7"
            active-color="#6376f7"
            inactive-text="Administrador"
            active-text="Usuario"
            inactive-value="AD"
            active-value="US"
          />
        </el-form-item>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="12"
      >
        <el-form-item
          class="text-xs-center label-success"
          label="Cuenta"
        >
          <el-switch
            v-model="form.status"
            class="text-xs-center"
            style="display: block"
            inactive-color="#67C23A"
            active-color="#67C23A"
            inactive-text="Activa"
            active-text="Inactiva"
            inactive-value="AC"
            active-value="IN"
          />
        </el-form-item>
      </el-col>
    </el-row>

  </template>
</base-form>
</template>
<script>

import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'
import uploadFileMixin from '@/mixins/uploadFileMixin'

import {
  name,
  lastName
} from '@/config/form.rules'

import { mapState, mapActions } from 'vuex'

export default {
  mixins: [
    modalBaseActionsMixin,
    uploadFileMixin
  ],

  data () {
    return {
      formTitle: 'Actualizar datos de usuario',

      context: {
        storeBase: 'users',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'update',
      },
      messageToast: {
        baseName: 'USER',
        action: 'UPDATED'
      },
      form: {
        id: '',
        username: '',
        email: '',
        userTypeId: '',
        provinceId: '',
        regionId: '',
        districtId: '',
        name: '',
        lastName: '',
        lastNameAditional: '',
        image: null,
        status: 'AC'
      },
      rules: {
        name,
        lastName
      },
      file: {
        type: 'image', // it's property name file inside form
        availableExtensions: [
          '.png',
          '.jpg',
          '.jpeg'
        ],
        maxSizeLabel: '2MB',
        maxSizeLength: 262144, // (bytes units) ~ 262144 bytes = 2mb
        selected: null,
        imageUrl: ''
      },
    }
  },

  computed: {
    ...mapState({
      itemContext (state) {
        return state[this.context.storeBase].itemContext
      },
      regions: state => state.public.regions,
      provinces: state => state.public.provinces,
      districts: state => state.public.districts
    }),

    loadRegions () {
      return this.regions.lenght
    },
    loadProvinces () {
      return this.regions.lenght
    },
    loadDistricts () {
      return this.regions.lenght
    }
  },

  watch: {
    itemContext () {
      this.assignFormFields()
    }
  },

  created () {
    this.assignFormFields()
    this.getRegions()
  },

  methods: {
    ...mapActions({
      getRegions: 'public/getRegions',
      getProvinces: 'public/getProvinces',
      getDistricts: 'public/getDistricts',
      replaceProvinces: 'public/replaceProvinces',
      replaceDistricts: 'public/replaceDistricts',
    }),

    assignFormFields () {
      Object.keys(this.form).forEach(key => {
        this.form[key] = this.itemContext[key]
      })
      this.file.imageUrl = this.form[this.file.type]

      this.getProvinces(this.form["regionId"])
      this.getDistricts(this.form["provinceId"])
    },

    /**
     * getting formData by reference from BaseForm component
     * to apply custom functionality
     *
     * @param {Object} formData
     */
    ApplyCustomFunctionalityToForm (formData) {
      if (formData.get(this.file.type) === null || typeof formData.get(this.file.type) === 'string')
        formData.delete(this.file.type)
    },
    /*
    launchUploadAvatar (option) {
      this.imageSelected = URL.createObjectURL(option.file)
      this.form.uploadImage = option.file
    },

    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('La imagen debe estar en formato JPG!')
      }
      if (!isLt2M) {
        this.$message.error('La imagen excede los 2MB!')
      }
      return isJPG && isLt2M
    },*/

    onChangeRegion (regionId) {
      const params = {
        region: regionId
      }
      this.replaceProvinces({ provinces: null })
      this.replaceDistricts({ districts: null })
      this.form.provinceId = ''
      this.form.districtId = ''

      this.getProvinces({ params })
    },

    onChangeProvince (provinceId) {
      const params = {
        province: provinceId
      }

      this.replaceDistricts({ districts: null })
      this.form.districtId = ''
      this.getDistricts({ params })
    }
  }
}
</script>
<style lang="scss">
.label-success {
  .el-switch__label.is-active {
    color: #67c23a;
  }
}
</style>
