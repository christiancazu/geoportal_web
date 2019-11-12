<template>
<base-page-actions
  :page-header="pageHeader"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
  :message-toast="messageToast"
>
  <template
    v-slot:page-table="{
      confirmedActionDeleteItemContext,
    }"
  >
    <el-table-column
      label="Institución"
      prop="institute"
    />
    <el-table-column label="Nombres y Apellidos">
      <template
        slot-scope="scope"
      >{{ `${scope.row.name} ${scope.row.lastName} ${scope.row.lastNameAditional}` }}</template>
    </el-table-column>
    <el-table-column
      label="Correo Electrónico"
      prop="email"
    />
    <el-table-column
      label="Acción"
      align="center"
      width="120"
    >
      <template slot-scope="scope">
        <group-actions-buttons
          :item-selected="scope.row"
          dialog-delete-title="Eliminar usuario"
          dialog-delete-body-text="¿Está seguro de eliminar este usuario?"
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
import { mapActions, mapState } from 'vuex'
export default {
  components: {
    GroupActionsButtons
  },
  mixins: [pageActionsMixin],
  data () {
    return {
      pageHeader: {
        title: 'Usuarios pendientes',
      },
      modalMain: {
        storeBase: 'requests',
        folderName: ''
      },

      messageToast: {
        baseName: 'REQUEST'
      },

      filterCriteriaProps: [
        'name',
        'lastName',
        'lastNameAditional',
        'institute',
        'email',
        'subject',
      ]
    }
  },

  computed: {
    ...mapState({
      loadingPendingRequests: state => state.userRequests.loadingPendingRequests
    }),
  },

  methods: {
    ...mapActions({
      getPendingRequests: 'userRequests/getPendingRequests',
      replaceCurrentPendingRequest: 'userRequests/replaceCurrentPendingRequest',
    }),

    // eslint-disable-next-line no-unused-vars
    onLoadModalViewRequestPending (index, item) {
      this.replaceCurrentPendingRequest({ request: item })
      this.$_modalVisibilityMixin_open('modalViewPendingRequest')
    },

    // pagination
    onChangeCurrentPage: function (currentPage) {
      this.currentPage = currentPage
    },
    onChangePageSize: function (pagesize) {
      this.pagesize = pagesize
    }
  },

  head: {
    title: 'Solicitudes | GEOVISOR'
  },
}
</script>