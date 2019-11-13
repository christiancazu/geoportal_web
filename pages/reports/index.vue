<template>
<base-page-basic
  :page-header="pageHeader"
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
</base-page-basic>
</template>

<script>
import BasePageBasic from '@/components/base/pages/BasePageBasic'

export default {
  components: {
    BasePageBasic
  },

  data () {
    return {
      pageHeader: {
        title: 'Reportes',
      },// main modal settings

      modalMain: {
        storeBase: 'reports',
        viewComponent: 'ModalViewReport',
        folderName: 'reports',
      },
      // criterias to search based on columns of table
      filterCriteriaProps: [
        'user',
        'subject',
        'description'
      ]
    }
  },

  head: {
    title: 'Reportes | GEOVISOR',
  },
}
</script>
