<template>
<base-page-actions
  :page-header="pageHeader"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
  :message-toast="messageToast"
>
  <template
    v-slot:page-table
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
        <el-tooltip
          content="Editar"
          placement="bottom"
        >
          <el-button
            circle
            icon="el-icon-edit"
            size="small"
            type="primary"
            @click="onLoadModalApproveItem(scope.row)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </template>
</base-page-actions>
</template>

<script>

import pageActionsMixin from '@/mixins/pageActionsMixin'
import { SET_CURRENT_PAGE_ON_TABLE } from '@/types/mutation-types'
import { SET_ITEM_CONTEXT } from '@/types/mutation-types'
import { ROWS_PER_PAGE_ON_TABLE } from '@/config/constants'


import { mapActions, mapState } from 'vuex'
export default {
  mixins: [pageActionsMixin],
  data () {
    return {
      pageHeader: {
        title: 'Usuarios pendientes',
      },
      modalMain: {
        storeBase: 'requests',
        approveComponent: 'ModalApproveRequest',
        folderName: 'users',
      },

      messageToast: {
        baseName: 'REQUEST'
      },

      filterCriteriaProps: [
        'name',
        'lastName',
        'lastNameAditional',
        'institute',
        'subject'
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

    onChangePageSize: function (pagesize) {
      this.pagesize = pagesize
    },

    deleteUser (item) {
      new Promise((resolve, reject) => {
        this.$userAPI.delete({ id: item.itemSelected.id })
          .then(response => {
            resolve(response)
            this.getUsers()
          }).catch(error => reject(error))
      })
    },

    onLoadModalApproveItem (item) {
      console.log('item', item)
      this.$store.commit(`${this.modalMain.storeBase}/${SET_ITEM_CONTEXT}`, {itemContext: item })

      this.$store.dispatch('modalsVisibilities/openModal', {
        modalType: 'mainModal',
        component: this.modalMain.approveComponent,
        folderName: this.modalMain.folderName
      })

    },

    /**
     * receives the selected itemContext from btn-confirm component
     * to be deleted & fetch DataContext again to update everything
     *
     * @param {Object} itemSelected
     */
    async confirmedActionAproveItemContext ({ itemSelected }) {
      try {
        await this.aproveItemContext(itemSelected.id)
        this.$toast.success(this.$SUCCESS[this.messageToast.baseName].DELETED)

        await this.getDataContext()

        let currentPage = this.$store.state[this.modalMain.storeBase].currentPageOnTable

        // if number of pages is minor that the current page, (when delete)
        if (this.dataContext.length / ROWS_PER_PAGE_ON_TABLE <= (currentPage - 1)) {
          currentPage--
        }
        // setting currentPage before to submit deleteItemContext and getDataContext
        // to set it again as currentPage to prevent go to page 1 when fetch the dataContext
        this.$store.commit(`${this.modalMain.storeBase}/${SET_CURRENT_PAGE_ON_TABLE}`, currentPage)
      }
      catch (e) {}
    }
  },

  head: {
    title: 'Solicitudes | GEOVISOR'
  },
}
</script>