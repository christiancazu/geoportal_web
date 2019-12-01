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
          label="Región"
          prop="regionId"
        >
          <el-select
            v-model="form.regionId"
            value-key="id"
            filterable
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
        :xs="24" :sm="8"
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
        :xs="12" :sm="12" :md="12"
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
        :xs="12" :sm="12" :md="12"
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
import BaseUser from './BaseUser'

import {
  name,
  lastName,
  provinceId,
  regionId,
  districtId
} from '@/config/form.rules'

import { mapState } from 'vuex'

export default {
  extends: BaseUser,

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
        lastName,
        provinceId,
        regionId,
        districtId
      }
    }
  },

  computed: {
    ...mapState({
      itemContext (state) {
        return state[this.context.storeBase].itemContext
      }
    })
  },

  watch: {
    itemContext () {
      this.assignFormFields()
    }
  },

  created () {
    this.assignFormFields()
  },

  methods: {
    assignFormFields () {
      Object.keys(this.form).forEach(key => {
        this.form[key] = this.itemContext[key]
      })
      this.file.imageUrl = this.form[this.file.type]

      this.getProvinces(this.form['regionId'])
      this.getDistricts(this.form['provinceId'])
    }
  }
}
</script>

<style lang="scss">
// cuenta activa color switch active
.label-success {
  .el-switch__label.is-active {
    color: #67c23a;
  }
}
</style>
