<template>
<page-basic
  :page-header="pageHeader"
  :modal-main="modalMain"
  :filter-criteria-props="filterCriteriaProps"
>
  <template
    v-slot:page-table="{
      openModalViewItemContext
    }"
  >
    <el-table-column
      label="Identificador"
      prop="identificator"
    />

    <el-table-column
      label="Publicado"
      prop="publicado"
      align="center"
      width="120"
    >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.isPublished ? 'success' : 'info'"
          effect="plain"
        >
          {{ scope.row.isPublished ? 'si' : 'no' }}
        </el-tag>
      </template>
    </el-table-column>

    <el-table-column
      label="Acción"
      align="center"
      width="120"
    >
      <template slot-scope="scope">
        <el-tooltip
          content="Publicar"
          placement="bottom"
        >
          <base-btn-confirm
            :item-selected="scope.row"
            :disabled="scope.row.isPublished"
            accion="shared"
            title="Publicar imagen satelital"
            body-text="¿Desea publicar esta imagen?"
            @confirmed-action="submitPublish"
          />
        </el-tooltip>
        <el-tooltip
          content="Ver"
          placement="bottom"
        >
          <el-button
            circle
            icon="el-icon-view"
            size="small"
            type="primary"
            @click="openModalViewItemContext(scope.row)"
          />
        </el-tooltip>
      </template>
    </el-table-column>
  </template>
</page-basic>
</template>

<script>
import PageBasic from '@/components/base/pages/PageBasic'
import BaseBtnConfirm from '@/components/base/BaseBtnConfirm'

import { mapActions } from 'vuex'

import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '@/types/mutations'

export default {
  components: {
    PageBasic,
    BaseBtnConfirm
  },

  data () {
    return {
      pageHeader: {
        title: 'Imágenes satelitales'
      },
      // main modal settings
      modalMain: {
        storeBase: 'satelitalsImages',
        viewComponent: 'ViewSatelitalImage',
        folderName: 'data'
      },
      // criterias to search based on columns of table
      filterCriteriaProps: ['identificator']
    }
  },

  methods: {
    ...mapActions({
      publishItemContext: 'satelitalsImages/publishItemContext',
      getDataContext: 'satelitalsImages/getDataContext'
    }),

    async submitPublish ({ itemSelected }) {
      this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')

      try {
        const formData = new FormData()
        formData.append('pk', itemSelected.id)

        await this.publishItemContext(formData)
        await this.getDataContext()

        this.$toast.success(this.$SUCCESS.IMAGE.PUBLISHED)
      } catch (e) {}
      this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')
    }
  },

  head: {
    title: 'Imágenes satelitales | GEOVISOR'
  }
}
</script>
