<template>
<base-form
  :form="form"
  :rules="rules"
  :store-base="storeBase"
  :message-toast="messageToast"
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
      </el-col>
    </el-row>

    <el-row
      :gutter="10"
      type="flex"
    >
      <el-col
        :xs="22" :sm="22" :md="22"
      >
        <el-input
          v-model="filterGroupLayerName"
          clearable
          placeholder="Filtrar capas"
          class="my-2"
        />
      </el-col>

      <el-col
        :xs="2" :sm="2" :md="2"
      >
        <!-- open modal inner -->
        <btn-open-modal-inner
          icon="el-icon-edit"
          tooltip="Editar Grupo de capas"
          class="my-2"
          @open-modal="openModal('modalAddGroupLayers')"
        />
      </el-col>
    </el-row>

    <!-- group layers tree -->
    <el-form-item
      label="Grupo de Capas"
      prop="groupLayerId"
    >
      <el-tree
        ref="tree"
        v-loading="$store.state.spinners.loadingPage"
        :data="dataTree"
        :props="defaultProps"
        :filter-node-method="filterNode"
        default-expand-all
        highlight-current
        class="my-2"
        @node-click="onSelectedGroupLayer"
      />
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
        show-word-limit
      />
    </el-form-item>

    <!-- innerComponent on modal -->
    <base-modal
      :modal="$store.state[storeBase.name].modalInner"
      modal-type="modalInner"
    >
      <template v-slot:modal-content>
        <component
          :is="dynamicComponent"
          :store-mounted="{ name: storeBase.name, typeModal: 'modalInner' }"
        />
      </template>
    </base-modal>
  </template>
</base-form>
</template>
<script>
import BaseVectorialAndRaster from './BaseVectorialAndRaster'

import uploadFileMixin from '@/mixins/uploadFileMixin'

import {
  title,
  groupLayerId,
  rasterFile,
  nameAlpha
} from '@/config/form.rules'

export default {
  extends: BaseVectorialAndRaster,

  mixins: [uploadFileMixin],

  data () {
    return {
      dialogTitle: 'Registrar capa raster',

      /** BASEFORM SETTINGS */
      storeBase: {
        name: 'rasterLayers',
        action: 'createItemContext'
      },
      modalInner: {
        modalAddGroupLayers: {
          type: 'page',
          folderPath: 'managementLayers/groups',
          name: 'index'
        }
      },
      messageToast: {
        baseName: 'LAYER',
        action: 'REGISTERED'
      },
      form: {
        title: '',
        name: '',
        order: null,
        rasterFile: null,
        groupLayerId: null,
        description: ''
      },
      rules: {
        title,
        groupLayerId,
        rasterFile,
        name: nameAlpha
      },
      file: {
        type: 'rasterFile',
        availableExtensions: ['zip'],
        selected: null
      },
    }
  },

  methods: {
    applyAfterSubmitForm () { // clear file
      this.form[this.file.type] = null
      this.file.selected = ''
      // call again init (tree structure reset & fetch TreeStructure)
      this.init()
    }
  }
}
</script>
