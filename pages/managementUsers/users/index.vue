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
      label="Nombres"
      prop="name"
    />
    <el-table-column
      label="Apellidos"
      prop="fullName"
    />
    <el-table-column
      label="Correo Electrónico"
      prop="email"
    />
    <el-table-column
      label="Rol"
      prop="tag"
      align="center"
    >
      <template slot-scope="scope">
        <el-tag
          type="primary"
          disable-transitions
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
import pageActionsMixin from '@/mixins/pageActionsMixin'
import GroupActionsButtons from '@/components/buttons/GroupActionsButtons'


export default {
  components: {
    GroupActionsButtons
  },

  mixins: [pageActionsMixin],


  data () {
    return {
      pageHeader: {
        title: 'Usuarios',
        btnAddName: 'Nuevo usuario'
      },
      modalMain: {
        storeBase: 'users',
        addComponent: 'ModalAddUser',
        editComponent: 'ModalEditUser',
        folderName: 'users'
      },

      messageToast: {
        baseName: 'USERS'
      },

      filterCriteriaProps: [
        'name',
        'fullName',
        'email',
        'username'
      ]
    }
  },

  head: {
    title: 'Usuarios | GEOVISOR',
  },
}
</script>
