<template>
  <div>
    <el-dialog
      title="Eliminar usuario"
      top="2vh"
      :visible.sync="showModalDeleteUser"
    >

      <div>¿Esta seguro de Eliminar este usuario?</div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="replaceShowModalDeleteUser({ show: false })">Cancel</el-button>
        <el-button
          type="primary"
          native-type="submit"
          @click.prevent="submitForm"
        >Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {

    };
  },

  computed: {
    ...mapState({
      showModalDeleteUser: state => state.modalsManagementUser.showModalDeleteUser,
    }),

    showModalDeleteUser: {
      get () {
        return this.$store.state.modalsManagementUser.showModalDeleteUser
      },
      set (value) {
        this.replaceShowModalDeleteUser({ show: value })
      }
    }
  },

  created () {
  },

  methods: {
    ...mapActions({
      replaceShowModalDeleteUser: 'modalsManagementUser/replaceShowModalDeleteUser',
      getUsers: 'users/getUsers',
    }),

    submitForm () {
      console.log('delete')
    },
  },
};
</script>