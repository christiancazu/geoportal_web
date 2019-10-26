<template>
  <base-form
    :form-title="formTitle"
    :form="form"
    :rules="rules"
    :store-base="storeBase"
    :modal-state-name="modalStateName"
    :store-action="storeAction"
    :message-toast-base-name="messageToastBaseName"
    :message-toast-action="messageToastAction"
    @reset-form="resetForm()"
    :can-publish="!currentItemContext.isPublished"
  >
    <template slot="content">
      <el-row :gutter="14">
        <el-col
          :xs="24"
          :md="{span:12, offset:12}"
          :sm="24"
          :lg="{span:12, offset:12}"
          class="text-xs-center"
        >
          <el-form-item
            prop="order"
            size="mini"
            :inline-message="true"
          >
            <label
              class="pr-2"
              for=""
            >N° de orden: </label>
            <el-input-number
              size="mini"
              v-model="form.order"
              controls-position="right"
              :min="1"
              type="number"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item
        label="Título"
        prop="title"
      >
        <el-input
          v-model="form.title"
          type="text"
          autocomplete="off"
          :rules="rules.title"
        />
      </el-form-item>
      <el-form-item
        label="Grupo"
        prop="groupLayerId"
      >
        <el-container>
          <el-select
            v-model="form.groupLayerId"
            value-key="id"
            :loading="$store.state.spinners.loadingTable"
            filterable
            placeholder="Select"
          >
            <el-option
              v-for="item in groupLayers"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-container>
      </el-form-item>
      <!-- Descripción -->
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
        />
      </el-form-item>
    </template>
  </base-form>
</template>
<script>
import BaseForm from "@/components/base/BaseForm"

import { mapState, mapActions } from "vuex"

export default {
  components: {
    BaseForm
  },

  data () {
    return {
      modalStateName: 'modalEditVectorialLayer',
      storeBase: 'vectorialLayers',
      storeAction: 'update',
      formTitle: 'Actualizar capa vectorial',
      messageToastBaseName: 'LAYER',
      messageToastAction: 'UPDATED',

      fileLayerSelected: null,
      fileStyleSelected: null,
      showFormStyle: false,
      form: {
        id: null,
        order: null,
        title: "",
        name: "",
        groupLayerId: '',
        description: "",
        status: true
      },

      rules: {
        title: [{
          required: true,
          message: "El nombre de usuario es requerido"
        }],
        name: [{
          required: true,
          // pattern: /^[z0-9\s.,\/#!$%\^&\*;:{}=\-+'´`~()”“"…]+$/g,
          validator: (rule, value, callback) => {
            let text = value.split('')
            let itContainsBlanks = text.every(val => /[a-zA-Z0-9_]/g.test(val))
            if (!itContainsBlanks) {
              return callback(new Error("Solo se admite letras y subguion '_'"))
            }
            callback();
          }
        }],
        order: [{
          required: true,
          message: " "
        }],
      }
    };
  },

  created () {
    this.getGroupLayers()
    this.assignFormFields()
  },

  computed: {
    ...mapState({
      currentItemContext: state => state.vectorialLayers.currentItemContext,
      groupLayers: state => state.groupLayers.dataContext,
      })
  },

  watch: {
    currentItemContext (newState, oldState) {
      this.assignFormFields()
    }
  },

  methods: {
    ...mapActions({
      getGroupLayers: 'groupLayers/getDataContext',
      getVectorialLayers: "vectorialLayers/getVectorialLayers",
      updateVectorialLayer: "vectorialLayers/updateVectorialLayer"
    }),

    assignFormFields () {
      Object.keys(this.form).forEach(key => this.form[key] = this.currentItemContext[key])
    },

    resetForm () {
      if (this.form.shapeFile) {
        this.form.shapeFile = null
        this.fileLayerSelected = null
      }
    },

    // async submitForm () {
    //   let isFormValid = false

    //   await this.$refs.form.validate(result => isFormValid = result)

    //   if (isFormValid) {
    //     const data = this.$_objectToFormDataMixin_transform();

    //     try {          
    //       await this.updateVectorialLayer({
    //         id: this.currentItemContext.id,
    //         data
    //       })
    //       this.$refs.form.resetFields()
    //       this.$toast.success(this.$SUCCESS.LAYER.UPDATED)
    //       this.$_modalVisibilityMixin_close('modalEditVectorialLayer')

    //       await this.getVectorialLayers()

    //     } catch (e) {}
    //   }
    // },

    launchUploadAvatar (option) {
      this.form.file = option.file;
      this.fileLayerSelected = option.file
      const nameFile = option.file.name.split('.')
      this.form.name = nameFile[0]
      this.form.title = nameFile[0]
    }
  }
};
</script>
