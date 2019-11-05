<template>
  <base-form
    :form-title="formTitle"
    :form="form"
    :rules="rules"
    :context="context"
    :message-toast="messageToast"
    @reset-form="resetForm()"
  >
    <template v-slot:content>
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
            />
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

import { 
  mapState, 
  mapActions } from "vuex"

import { 
  title,
  name,
  order } from '@/config/form.rules'

export default {
  components: {
    BaseForm
  },

  data () {
    return {
      formTitle: 'Actualizar capa vectorial',

      context: {
        storeBase: 'vectorialLayers',
        modalStateName: 'modalEditVectorialLayer',
        storeAction: 'update',
      },
      messageToast: {
        baseName: 'LAYER',
        action: 'UPDATED'
      },

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
        title,
        name,
        order,
      }
    };
  },

  created () {
    this.getGroupLayers()
    this.assignFormFields()
  },

  computed: {
    ...mapState({
      itemContext (state) {
        return state[this.context.storeBase].itemContext
      }, 
      groupLayers: state => state.groupLayers.dataContext
    })
  },

  watch: {
    itemContext () {
      this.assignFormFields()
    }
  },

  methods: {
    ...mapActions({
      getGroupLayers: 'groupLayers/getDataContext'
    }),

    assignFormFields () {
      Object.keys(this.form).forEach(key => this.form[key] = this.itemContext[key])
    },

    // resetForm () {
    //   if (this.form.shapeFile) {
    //     this.form.shapeFile = null
    //     this.fileLayerSelected = null
    //   }
    // },

    // launchUploadAvatar (option) {
    //   this.form.file = option.file;
    //   this.fileLayerSelected = option.file
    //   const nameFile = option.file.name.split('.')
    //   this.form.name = nameFile[0]
    //   this.form.title = nameFile[0]
    // }
  }
}
</script>
