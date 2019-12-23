<template>
<page-actions
  :page-header="pageHeader"
  :store-base="storeBase"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
  :message-toast="messageToast"
>
  <template
    v-slot:page-table="{
      openModalEdit,
      confirmedActionDeleteItemContext
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
          @open-edit-modal="openModalEdit(scope.row)"
          @confirmed-action="confirmedActionDeleteItemContext"
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
      pageHeader: {
        title: 'Gestión de usuarios',
        btnAddName: 'Nuevo usuario'
      },
      storeBase: {
        name: 'users'
      },
      // main modal settings
      modalMain: {
        addComponent: {
          type: 'component',
          folderPath: 'users',
          name: 'AddUser'
        },
        editComponent: {
          type: 'component',
          folderPath: 'users',
          name: 'EditUser'
        }
      },
      messageToast: {
        baseName: 'USER'
      },
      // criterias to search based on columns of table
      filterCriteriaProps: [
        'fullName',
        'email',
        'username'
      ]
    }
  },

  head: {
    title: 'Usuarios | GEOVISOR'
  }
}
</script>
