<template>
<base-page-actions
  :page-header="pageHeader"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
  :message-toast="messageToast"
>
  <template
    v-slot:page-table="{
      openModalEditItemContext,
      confirmedActionDeleteItemContext,
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
          @confirmed-action="confirmedActionDeleteItemContext"
        />
      </template>
    </el-table-column>
  </template>
</base-page-actions>
</template>

<script>
import BasePageActions from '@/pages/base/BasePageActions'

import GroupActionsButtons from '@/components/buttons/GroupActionsButtons'

export default {
  components: {
    GroupActionsButtons
  },

  extends: BasePageActions,

  data () {
    return {
      pageHeader: {
        title: 'Gestión de usuarios',
        btnAddName: 'Nuevo usuario'
      },
      modalMain: {
        storeBase: 'users',
        addComponent: 'AddUser',
        editComponent: 'EditUser',
        folderName: 'users'
      },
      messageToast: {
        baseName: 'USER'
      },
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
