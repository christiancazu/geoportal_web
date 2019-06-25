<template>
  <div class="container pt-3">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Todas las tareas</h3>
      </div>
      <!-- <div>
        <input
          type="text"
          value="test"
        >
      </div> -->
      <el-table
        :data="tableData"
        style="width: 100%"
        size="medium"
      >
        <el-table-column
          align="center"
          label="Fecha"
          class-name="py-1"
        >
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          class-name="py-1"
          align="center"
          label="Nombre"
        >
          <template slot-scope="scope">
            <p class="ma-0">Name: {{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column
          class-name="py-1"
          align="center"
          label="Operaciones"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >Editar</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >Eliminar</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }, {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }]
    }
  },
  methods: {
    handleEdit (index, row) {
      console.log(index, row);
    },
    handleDelete (index, row) {
      console.log(index, row);
    }
  }
}
</script>