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
        <!-- title -->
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
          prop="group"
        >
          <el-container>
            <el-select
              v-model="form.categoryGroupId"
              value-key="id"
              filterable
              :loading="$store.state.spinners.loadingTable"
              placeholder="Select"
            >
              <el-option
                v-for="item in groupLayers" :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-container>
        </el-form-item>
        <!-- Descripción 
        -->
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
            :show-word-limit="true"
          />
        </el-form-item>
    </template>
  </base-form>
</template>

<script>
import BaseForm from '@/components/base/BaseForm'

import { 
  mapState,
  mapActions } from "vuex"

import { 
  title,
  order } from '@/config/form.rules'

export default {
  components: {
    BaseForm
  },
  data () {
    return {
      formTitle: 'Registrar nuevo grupo de capa',

      context: {
        storeBase: 'groupLayers',
        modalStateName: 'modalAddGroupLayer',
        storeAction: 'create',
      },
      messageToast: {
        baseName: 'LAYER',
        action: 'REGISTERED'
      },
      form: {
        order: '1',
        title: "",
        description: "",
        categoryGroupId: ''
      },

      rules: {
        title,
        order
      }
    };
  },

  computed: {
    ...mapState({
      groupLayers: state => state.groupLayers.dataContext
    })
  },

  mounted () {
    this.getGroupLayers()
  },

  methods: {
    ...mapActions({
      getGroupLayers: 'groupLayers/getDataContext'
    }),
  }
}
</script>
