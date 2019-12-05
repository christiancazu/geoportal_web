<template>
<base-form
  :form-title="formTitle"
  :form="form"
  :rules="rules"
  :context="context"
  :message-toast="messageToast"
  @clear-form="$_uploadFileMixin_clear()"
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
            v-model="form.order"
            size="mini"
            controls-position="right"
            :min="1"
            type="number"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row
      :gutter="10"
      align="bottom"
      justify="center"
    >
      <el-col :md="12">
        <!-- file -->
        <el-form-item
          class="text-xs-center upload-file"
          prop="rasterFile"
        >

          <upload-file
            :file="file"
            @on-file-valid="$_uploadFileMixin_valid"
            @delete-file="$_uploadFileMixin_clear()"
          />

        </el-form-item>
      </el-col>
      <el-col :md="12">
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

        <!-- name -->
        <el-form-item
          label="Nombre de Capa"
          prop="name"
        >
          <el-input
            v-model="form.name"
            type="text"
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
                v-for="item in groupLayers" :key="item.id"
                :label="item.title"
                :value="item.id"
              />
            </el-select>

            <!-- open second modal -->
            <btn-open-second-modal :modal-second="modalSecond" />

          </el-container>
        </el-form-item>
      </el-col>
    </el-row>
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
        :show-word-limit="true"
      />
    </el-form-item>
  </template>
</base-form>
</template>
<script>
import BaseRasterLayer from './BaseRasterLayer'

import uploadFileMixin from '@/mixins/uploadFileMixin'

import {
  title,
  groupLayerId,
  order,
  rasterFile,
  nameAlpha
} from '@/config/form.rules'

export default {
  extends: BaseRasterLayer,

  mixins: [uploadFileMixin],

  data () {
    return {
      formTitle: 'Registrar capa raster',

      context: {
        storeBase: 'rasterLayers',
        mountedOn: this.modalBaseActionsMixin_mountedOn,
        storeAction: 'create',
      },
      modalSecond: {
        component: 'ModalAddGroupLayer',
        folderName: 'layers',
        tooltip: 'Agregar grupo de capas'
      },
      messageToast: {
        baseName: 'LAYER',
        action: 'REGISTERED'
      },
      file: {
        type: 'rasterFile',
        availableExtensions: ['zip'],
        selected: null
      },
      form: {
        title: '',
        order: 0,
        name: '',
        rasterFile: null,
        groupLayerId: '',
        description: ''
      },
      rules: {
        title,
        groupLayerId,
        order,
        rasterFile,
        name: nameAlpha
      }
    }
  }
}
</script>
