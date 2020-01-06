<template>
<base-form
  :form="form"
  :rules="rules"
  :store-base="storeBase"
  :message-toast="messageToast"
  @close-modal="closeModal"
>
  <template v-slot:form-content>
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
        node-key="id"
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
      />
    </el-form-item>

    <el-form-item
      class="text-xs-left"
      label="Capa habilitada"
    >
      <el-switch
        v-model="form.enabled"
        inactive-color="#6376f7"
        active-color="#6376f7"
        inactive-text="No"
        active-text="Si"
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

import { mapState } from 'vuex'

import {
  title,
  nameAlpha,
  order
} from '@/config/form.rules'

export default {
  extends: BaseVectorialAndRaster,

  data () {
    return {
      dialogTitle: 'Actualizar capa vectorial',

      /** BASEFORM SETTINGS */
      storeBase: {
        name: 'vectorialLayers',
        action: 'updateItemContext'
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
        action: 'UPDATED'
      },
      form: {
        id: null,
        order: null,
        title: '',
        name: '',
        groupLayerId: '',
        description: '',
        enabled: null,
        status: true
      },
      rules: {
        title,
        name: nameAlpha,
        order
      }
    }
  },

  computed: {
    ...mapState({
      itemContext (state) {
        return state[this.storeBase.name].itemContext
      }
    })
  },

  watch: {
    itemContext: { // smart watcher
      handler: 'assignFormFields',
      immediate: true
    }
  },

  methods: {
    assignFormFields () {
      Object.keys(this.form).forEach(key => this.form[key] = this.itemContext[key])
    },

    /**
     * apply same delay that modal visible
     */
    setParentNodeHighLight () {
      setTimeout(() => this.$refs.tree.setCurrentKey({id: this.itemContext.groupLayerId}), 260)
    }
  }
}
</script>
