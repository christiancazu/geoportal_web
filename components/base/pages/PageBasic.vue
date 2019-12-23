<template>
<base-page
  :page-header="pageHeader"
  :store-base="storeBase"
  :modal-main="modalMain"
>
  <el-container direction="vertical">
    <el-row
      type="flex"
      justify="end"
      :gutter="10"
    >
      <el-col
        :xs="24" :sm="12" :md="8"
      >
        <div>
          <el-input
            v-model="textToSearch"
            prefix-icon="el-icon-search"
            size="small"
            placeholder="Buscar..."
            clearable
            @input="textToSearch = $event"
          />
        </div>
      </el-col>
    </el-row>
    <el-table
      v-loading="$store.state.spinners.loadingTable"
      :data="filteredDataContext.slice((currentPage-1) * pagesize, currentPage * pagesize)"
      style="width: 100%"
    >

      <slot
        name="page-table"
        :openModalViewItemContext="openModalViewItemContext"
        :shrinkText="$options.filters.shrinkText"
      />

    </el-table>

    <el-pagination
      small
      class="pt-4 text-xs-right"
      :pager-size="100"
      :page-size="pagesize"
      layout="prev, pager, next, sizes"
      :total="dataContext.length"
      :current-page="currentPage"
      @current-change="onChangeCurrentPage"
      @size-change="onChangePageSize"
    />

  </el-container>

  <base-modal
    :modal="$store.state[storeBase.name].modalMain"
    modal-type="modalMain"
  >
    <template v-slot:modal-content>
      <component
        :is="dynamicComponent"
        :store-mounted="{ name: storeBase.name, typeModal: 'modalMain' }"
      />
    </template>
  </base-modal>

</base-page>
</template>

<script>
import BaseModal from '@/components/base/BaseModal'

import BasePageParent from '@/components/base/parents/BasePageParent'

import { ROWS_PER_PAGE_ON_TABLE } from '@/config/constants'

export default {
  components: {
    BaseModal
  },
  extends: BasePageParent,

  props: {
    pageHeader: {
      type: Object,
      default: () => ({
        title: { type: String, required: true }
      })
    },
    storeBase: {
      type: Object,
      default: () => ({
        name: { type: String, required: true }
      })
    },
    modalMain: {
      type: Object,
      default: () => ({
        viewComponent: { type: Object, default: () => ({}) },
      })
    },
    filterCriteriaProps: {
      type: Array, default: () => []
    },
    fitContent: {
      type: Boolean, default: false
    }
  },

  data () {
    return {
      pagesize: ROWS_PER_PAGE_ON_TABLE,
      textToSearch: '',
      criteriaLength: 0
    }
  },

  computed: {
    dynamicComponent () {
      const { type, folderPath, name } = this.$store.state[this.storeBase.name].modalMain
      return type === 'page'
        ? () => import(`@/pages/${folderPath}/${name}`)
        : () => import(`@/components/${folderPath}/${name}`)
    }
  },

  methods: {
    /**
     * fetching the itemContext by his id
     * set the name of viewComponent as dynamic component
     * on layouts/default.vue & set his visibility state
     *
     * @param {Number} id
     */
    async openModalViewItemContext ({ id }) {
      try {
        await this.getItemContext(id)

        this.setDynamicComponentAsModalMain(this.modalMain.viewComponent)
      }
      catch (e) {}
    }
  }
}
</script>
