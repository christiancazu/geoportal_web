<template>
  <base-page 
    :page-header-title="pageHeaderTitle"
    :store-base="storeBase"
    :message-base-name="messageBaseName"
  >

    <template v-slot:page-header="{ openModalAddItemContext }">
      <base-page-header 
        :btn-add-name="btnAddName"
        @add-item-context="openModalAddItemContext(modalAddStateName)"
      />
    </template>

    <template
      v-slot:page-body="{ 
        openModalEditItemContext,
        confirmedActionDeleteItemContext,
        textToSearch
      }"
    >
      <base-page-body-table
        :data-context="$_pageBodyTableMixin_filteredDataContext"
        @text-to-search="textToSearch($event)"
        :store-base="storeBase"
      >
        <template v-slot:table>
          <el-table-column
            label="N°"
            align="center"
            width="50px"
            prop="order"
          />
          <el-table-column
            label="Nombre"
            prop="name"
          />
          <el-table-column
            label="Título"
            prop="title"
          />
          <el-table-column
            label="Descripción"
            prop="description"
          >
          <template slot-scope="scope">
            <span v-html="$options.filters.$_pageBodyTableMixin_shrinkText(scope.row.description)"></span>
          </template>
          </el-table-column>
          <el-table-column
            label="Publicado"
            prop="publicado"
            align="center"
          >
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.isPublished ? 'success' : 'info'"
                effect="plain">
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
              <el-tooltip content="Editar" placement="bottom">
                <el-button
                  circle
                  icon="el-icon-edit"
                  size="small"
                  type="primary"
                  @click="openModalEditItemContext(scope.row, modalEditStateName)"
                />
              </el-tooltip>

              <el-tooltip content="Eliminar" placement="bottom">
                <el-button
                  edit
                  delete
                />
                <btn-confirm
                  :item-selected="scope.row"
                  @confirmed-action="confirmedActionDeleteItemContext"
                  accion="deleted"
                  title="Eliminar Capa"
                  body-text="¿Está seguro de eliminar esta capa?"
                />                
              </el-tooltip>

            </template>
          </el-table-column>
        </template>
      </base-page-body-table>
    </template>

  </base-page>
</template>

<script>
import pageBodyTableMixin from '@/mixins/pageBodyTableMixin'

export default {
  mixins: [pageBodyTableMixin],
  
  head: {
    title: 'Capas vectoriales | GEOVISOR',
  },

  data () {
    return {
      //page-header
      pageHeaderTitle: 'Capas vectoriales',
      btnAddName: 'Nueva capa vectorial',
      // toast
      messageBaseName: 'LAYER',
      // store module
      storeBase: 'vectorialLayers',
      modalAddStateName: 'modalAddVectorialLayer',
      modalEditStateName: 'modalEditVectorialLayer',
      // criterias to search based on columns of table
      filterCriteriaProps: ['title', 'name', 'description'],
      // current page modals folder name
      currentPageModalsFolderName: 'layers'
    }
  }
}
</script>
