<template>
<base-form
  :form-title="formTitle"
  :rules="rules"
  :form="form"
  :context="context"
  :message-toast="messageToast"
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
          prop="image"
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
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
      </el-col>
      <el-col :md="12">
        <!-- username -->
        <el-form-item
          label="Nombre de Usuario"
          prop="username"
        >
          <el-input
            v-model="form.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>

        <!-- email-->
        <el-form-item
          label="Correo Electrónico"
          prop="email"
        >
          <el-input
            v-model="form.email"
            type="text"
            auto-complete="off"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :md="12">
        <!-- password_1 -->
        <el-form-item
          label="contraseña"
          prop="password"
        >
          <el-input
            v-model="form.password"
            type="password"
            autocomplete="off"
            :rules="rules.password"
          />
        </el-form-item>
      </el-col>
      <el-col :md="12">
        <!-- password_2 -->
        <el-form-item
          label="Confirmar contraseña"
          prop="passwordConfirmation"
        >
          <el-input
            v-model="form.passwordConfirmation"
            type="password"
            autocomplete="off"
            :rules="rules.passwordConfirmation"
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
        <!-- region -->
        <el-form-item
          label="Región"
          prop="region"
        >
          <el-select
            v-model="form.region"
            value-key="id"
            filterable
            placeholder="Select"
            :loading="loadRegions"
            @change="onchangeRegions"
          >
            <el-option
              v-for="item in regions"
              :key="item.id"
              :label="item.name"
              :value="item"
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
          ref="province"
          label="Provincia"
          prop="province"
        >
          <el-select
            v-model="form.province"
            :loading="loadProvinces"
            value-key="id"
            filterable
            placeholder="Select"
            @change="onchangeProvinces"
          >
            <el-option
              v-for="item in provinces"
              :key="item.id"
              :label="item.name"
              :value="item"
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
        <!-- instituto -->
        <el-form-item
          label="Institución"
          prop="institute"
        >
          <el-input
            v-model="form.institute"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
      </el-col>
      <el-col
        :xs="12"
        :sm="12"
        :md="12"
      >
        <el-form-item
          class="pl-4"
          label="Privilegio"
        >
          <el-switch
            v-model="form.type"
            class="text-xs-center"
            style="display: block"
            inactive-color="#6376f7"
            active-color="#6376f7"
            inactive-text="ADMINISTRADOR"
            active-text="USUARIO"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <!-- objetivo -->
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
  </template>
</base-form>
</template>
<script>
import modalBaseActionsMixin from '@/mixins/modalBaseActionsMixin'

import {
  username, lastName, lastNameAditional, name, email, password, region, institute, subject
} from '@/config/form.rules'
import { mapState, mapActions } from 'vuex'



export default {
  mixins: [modalBaseActionsMixin],

  data () {
    return {
      formTitle: 'Registrar usuario',
      context: {
        storeBase: 'users',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'create',
      },

      messageToast: {
        baseName: 'USER',
        action: 'REGISTERED'
      },

      form: {
        username: '',
        email: '',
        image: '',
        subject: null,
        name: '',
        lastName: '',
        lastNameAditional: '',
        institute: '',
        password: '',
        passwordConfirmation: '',
        districtId: null,
        region: null,
        province: null
      },

      imageSelected: null,

      rules: {
        username, lastName, lastNameAditional, name, email, password, region, institute, subject,
        passwordConfirmation: [
          {
            required: true,
            // eslint-disable-next-line no-unused-vars
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                return callback(new Error('La contraseña no coincide'))
              }
              callback()
            }
          }
        ],
        districtId: [
          {
            required: true,
            // eslint-disable-next-line no-unused-vars
            validator: (rule, value, callback) => {
              if (!this.form.province) {
                return callback(new Error('Seleccione su Distrito'))
              }
              callback()
            }
          }
        ],
        province: [
          {
            required: true,
            // eslint-disable-next-line no-unused-vars
            validator: (rule, value, callback) => {
              if (!this.form.region) {
                return callback(new Error('Seleccione su Provincia'))
              }
              callback()
            }
          }
        ]
      }
    }
  },

  computed: {
    ...mapState({
      regions: state => state.public.regions,
      provinces: state => state.public.provinces,
      districts: state => state.public.districts,
    }),

    loadRegions: function () {
      return this.regions.lenght ? true : false
    },
    loadProvinces: function () {
      return this.regions.lenght ? true : false
    },
    loadDistricts: function () {
      return this.regions.lenght ? true : false
    }
  },

  mounted () {
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


    launchUploadAvatar (option) {
      this.imageSelected = URL.createObjectURL(option.file)
      this.form.image = option.file
    },

    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/png' || file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('La imagen debe estar en formato JPG!')
      }
      if (!isLt2M) {
        this.$message.error('La imagen excede los 2MB!')
      }
      return isJPG && isLt2M
    },

    onchangeRegions (region) {
      const params = {
        region: region.id
      }
      this.replaceProvinces({ provinces: null })
      this.replaceDistricts({ districts: null })
      this.$refs.province.resetField()
      this.$refs.districtId.resetField()

      this.getProvinces({ params })
    },

    onchangeProvinces (province) {
      const params = {
        province: province.id
      }

      this.replaceDistricts({ districts: null })
      this.$refs.districtId.resetField()
      this.getDistricts({ params })
    }
  }
}
</script>
