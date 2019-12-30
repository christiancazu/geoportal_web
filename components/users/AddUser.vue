<template>
<base-form
  :form="form"
  :rules="rules"
  :store-base="storeBase"
  :message-toast="messageToast"
  @apply-before-submit-form="applyBeforeSubmitForm"
  @apply-after-submit-form="applyAfterSubmitForm"
  @close-modal="closeModal"
>
  <template v-slot:form-content>

    <el-row
      :gutter="10"
      align="bottom"
      justify="center"
    >
      <el-col :md="12">
        <!-- image -->
        <el-form-item
          label="Imagen de perfil"
          class="text-xs-center upload-file"
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
        <el-form-item
          label="Nombre de usuario"
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
          label="Correo electrónico"
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
      <el-col
        :xs="24" :sm="11"
      >
        <!-- password_1 -->
        <el-form-item
          label="Contraseña"
          prop="password"
        >
          <el-input
            v-model="form.password"
            :type="passwordVisible ? 'text' : 'password'"
            autocomplete="off"
            :rules="rules.password"
          />
        </el-form-item>
      </el-col>

      <el-col
        :xs="24" :sm="2"
        align="center"
      >
        <el-tooltip
          effect="dark"
          content="Mostrar contraseña"
          placement="top"
        >
          <i
            class="el-icon-view password"
            :class="{ 'view-enable': passwordVisible }"
            @click="passwordVisible = !passwordVisible"
          />
        </el-tooltip>
      </el-col>

      <el-col
        :xs="24" :sm="11"
      >
        <!-- password_2 -->
        <el-form-item
          label="Confirmar contraseña"
          prop="passwordConfirmation"
        >
          <el-input
            v-model="form.passwordConfirmation"
            :type="passwordVisible ? 'text' : 'password'"
            autocomplete="off"
            :rules="rules.passwordConfirmation"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col
        :xs="24" :sm="8"
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
        :xs="24" :sm="8"
      >
        <!-- lastname -->
        <el-form-item
          label="Apellido paterno"
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
        :xs="24" :sm="8"
      >
        <!-- second lastname -->
        <el-form-item
          label="Apellido materno"
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
        :xs="24" :sm="8"
      >
        <!-- regionId -->
        <el-form-item
          ref="regionId"
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

    <el-row :gutter="10">
      <el-col
        :xs="12" :sm="12" :md="12"
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
        :xs="12" :sm="12" :md="12"
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
      label="¿Por qué desea usar el Geoportal?"
      prop="subject"
    >
      <el-input
        v-model="form.subject"
        type="textarea"
        :rows="3"
        autocomplete="off"
        :maxlength="300"
        show-word-limit
      />
    </el-form-item>
  </template>
</base-form>
</template>

<script>
import BaseUser from './BaseUser'

import {
  nameUser,
  nameAlpha,
  email,
  password,
  regionId,
  institute,
  subject,
  districtId,
  provinceId
} from '@/config/form.rules'

export default {
  extends: BaseUser,

  data () {
    return {
      dialogTitle: 'Registrar usuario',

      /** BASEFORM SETTINGS */
      storeBase: {
        name: 'users',
        action: 'createItemContext'
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
        regionId: null,
        provinceId: null,
        type: true
      },
      rules: {
        username: nameAlpha,
        name: nameUser('nombre'),
        lastName: nameUser('apellido'),
        lastNameAditional: nameUser('apellido'),
        email,
        password,
        regionId,
        institute,
        subject,
        districtId,
        provinceId,
        passwordConfirmation: [
          {
            // eslint-disable-next-line no-unused-vars
            validator: (rule, value, callback) => {
              if (value !== this.form.password) {
                return callback(new Error('La contraseña no coincide'))
              }
              callback()
            }
          }
        ]
      },
      passwordVisible: false
    }
  },

  methods: {
    applyAfterSubmitForm () { // clear image
      this.form.image = null
      this.file.selected = ''
    }
  },
}
</script>

<style lang="scss">
.el-icon-view.password {
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 3;
  &.view-enable {
    color: #6376f7
  }
}
</style>
