<template>
  <div>
    <el-dialog
      title="Registrar Mapa Base"
      top="2vh"
      :visible.sync="showModalAddBaseMap"
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
        <!-- username -->
        <el-form-item
          label="Nombre del Mapa Base"
          prop="name"
        >
          <el-input
            v-model="form.name"
            type="text"
            autocomplete="off"
          />
        </el-form-item>

        <!-- email -->
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
        <el-form-item
          label="Referente"
        >
          <el-input
            v-model="form.author"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="Descripción"
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
        <el-checkbox
          class="mb-3"
          v-model="checked"
        >¿Necesita Autenticación?</el-checkbox>
        <el-form-item
          label="Token"
          v-if="checked"
        >
          <el-input
            v-model="form.authenticationToken"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Nivel de Zoom">
          <el-slider
            v-model="rangeZoom"
            range
            :min="1"
            :max="100"
            :marks="marks"
            class="mb-3 pl-5"
            style="width:80%;"
          >
          </el-slider>
        </el-form-item>

        <el-form-item class="text-xs-right">
          <el-switch
            v-model="form.isActive"
            :active-text="form.isActive ? 'Mapa Base Activo': ' Mapa Base Inactivo' "
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="replaceShowModalAddBaseMap({ show: false })">Cancel</el-button>
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
      checked: false,
      rangeZoom: [5, 18],
      form: {
        name: '',
        url: '',
        description: '',
        author: '',
        minZoom: '',
        maxZoom: '',
        authenticationToken: '',
        isActive: true
      },
      marks: {
        1: 'min: 1',
        100: '100 max',
      },
      rules: {
        name: [{
          required: true,
          message: "El nombre de usuario es requerido"
        }],
        url: [{
          required: true,
          message: "El nombre es requerido"
        }]
      }
    };
  },

  watch: {
    showModalAddBaseMap: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields()
        return false
      }
    }
  },

  computed: {
    ...mapState({
    }),

    showModalAddBaseMap: {
      get () {
        return this.$store.state.modalsManagementLayer.showModalAddBaseMap
      },
      set (value) {
        this.replaceShowModalAddBaseMap({ show: value })
      }
    }
  },

  created () {
  },

  methods: {
    ...mapActions({
      replaceShowModalAddBaseMap: 'modalsManagementLayer/replaceShowModalAddBaseMap',
      getBaseMaps: 'baseMaps/getBaseMaps',
    }),

    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.createBaseMap().then(response => {
            let { status } = response.data
            if (status) {
              this.replaceShowModalAddBaseMap({ show: false })
              this.getBaseMaps()
            }
          })

        }
      })
    },

    createBaseMap () {
      this.form.minZoom = this.rangeZoom[0]
      this.form.maxZoom = this.rangeZoom[1]

      const data = this.form

      return new Promise((resolve, reject) => {
        this.$baseMapAPI.create({ data })
          .then(response => {
            resolve(response)
          }).catch(error => reject(error))
      })
    },
  },
};
</script>