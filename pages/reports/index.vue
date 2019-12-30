<template>
<page-actions
  :page-header="pageHeader"
  :store-base="storeBase"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
>
  <template
    v-slot:page-table="{
      openModalViewItemContext,
      shrinkText
    }"
  >
    <el-table-column
      label="Usuario"
      prop="user"
    />
    <el-table-column
      label="Asunto"
      prop="subject"
    />
    <el-table-column
      label="Descripción"
      prop="description"
    >
      <template slot-scope="scope">
        <span>{{ shrinkText(scope.row.description) }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="Acción"
      align="center"
      width="120"
    >
      <template slot-scope="scope">
        <el-button
          circle
          icon="el-icon-view"
          size="small"
          type="primary"
          @click="openModalViewItemContext(scope.row)"
        />
      </template>
    </el-table-column>
  </template>
</page-actions>
</template>

<script>
import PageActionsSetup from '@/components/base/setup/PageActionsSetup'

export default {
  extends: PageActionsSetup,

  data () {
    return {
      /** PAGE ACTIONS SETTINGS */
      pageHeader: {
        title: 'Reportes'
      },
      storeBase: {
        name: 'reports'
      },
      modalMain: { // modal main settings
        viewComponent: {
          type: 'component',
          folderPath: 'reports',
          name: 'ViewReport'
        }
      },
      filterCriteriaProps: [ // criterias to search based on columns of table
        'user',
        'subject',
        'description'
      ]
    }
  },

  head: {
    title: 'Reportes | GEOVISOR'
  }
}
</script>
