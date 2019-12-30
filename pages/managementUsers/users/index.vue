<template>
<page-actions
  :page-header="pageHeader"
  :store-base="storeBase"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
  :message-toast="messageToast"
>

  <template slot="btn-header">
    <el-button
      :loading="$store.state.spinners.loadingPage"
      size="mini"
      type="primary"
      icon="el-icon-upload"
      @click="openModalAddFileUser('addFileComponent')"
    >
      Cargar Archivo
    </el-button>
  </template>

  <template
    v-slot:page-table="{
      openModalEditItemContext,
      deleteItemContext
    }"
  >
    <el-table-column
      label="Nombre completo"
      prop="fullName"
    />
    <el-table-column
      label="Correo electrónico"
      prop="email"
    />
    <el-table-column
      label="Rol"
      prop="tag"
      align="center"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.userType.id === 'AD' ? 'success' : 'info'"
          disable-transitions
          effect="plain"
        >
          {{ scope.row.userType.id === 'AD' ? 'Admin': 'Usuario' }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="Acción"
      align="center"
      width="120"
    >
      <template slot-scope="scope">
        <group-actions-buttons
          :item-selected="scope.row"
          dialog-delete-title="¿Desabilitar usuario?"
          dialog-delete-body-text="Esta acción no se podra revertir ¿Esta seguro de continuar?"
          @open-edit-modal="openModalEditItemContext(scope.row)"
          @confirmed-action="deleteItemContext"
        />
      </template>
    </el-table-column>
  </template>
</page-actions>
</template>

<script>
import PageActionsSetup from '@/components/base/setup/PageActionsSetup'

import GroupActionsButtons from '@/components/buttons/GroupActionsButtons'

export default {
  components: {
    GroupActionsButtons
  },

  extends: PageActionsSetup,

  data () {
    return {
      /** PAGE ACTIONS SETTINGS */
      pageHeader: {
        title: 'Gestión de usuarios',
        btnAddName: 'Nuevo usuario'
      },
      storeBase: {
        name: 'users'
      },
      modalMain: { // main modal settings
        addComponent: {
          type: 'component',
          folderPath: 'users',
          name: 'AddUser'
        },
        editComponent: {
          type: 'component',
          folderPath: 'users',
          name: 'EditUser'
        },
        addFileComponent: {
          type: 'component',
          folderPath: 'users',
          name: 'AddFileUser'
        }
      },
      messageToast: {
        baseName: 'USER'
      },
      filterCriteriaProps: [ // criterias to search based on columns of table
        'fullName',
        'email',
        'username'
      ]
    }
  },

  methods: {
    /**
     * custom function to open approveRequestComponent modal
     */
    openModalAddFileUser (component) {
      this.$store.dispatch(`${this.storeBase.name}/setDynamicModal`, {
        typeModal: 'modalMain',
        component: this.modalMain[component]
      })
    }
  },

  head: {
    title: 'Usuarios | GEOVISOR'
  }
}
</script>
