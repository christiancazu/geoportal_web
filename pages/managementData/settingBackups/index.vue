<template>
  <BasePage title="Configurar copia de seguridad">
    <template v-slot:content>
      <el-container direction="vertical">
        <el-form
        ref="form"
        label-position="top"
        status-icon
        :model="form"
        label-width="120px"
        class="demo-ruleForm"
        :disabled="processingForm"
      >
       
      </el-form>
      </el-container>
    </template>
  </BasePage>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BasePage from '@/components/base/BasePage.vue'
export default {
  components: {
    BasePage
  },
  data () {
    return {
      processingForm: false,
      form: {

      }
    }
  },

  computed: {
    ...mapState({
      showModalAddUser: state => state.modals.showModalAddUser,
      users: state => state.users.users
    })
  },
  mounted () {
    this.getUsers()

  },

  created () {
    // console.log(this.$route)
    // this.getUsers()
  },

  methods: {
    ...mapActions({
      replaceShowModalAddUser: 'modalsManagementUser/replaceShowModalAddUser',
      replaceShowModalEditUser: 'modalsManagementUser/replaceShowModalEditUser',
      getUsers: 'users/getUsers',
    }),
    handleEdit (index, row) {
      this.replaceShowModalEditUser({ show: true })
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
