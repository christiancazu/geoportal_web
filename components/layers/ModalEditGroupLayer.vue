<template>
  <BaseModal
    title="Modificar Grupo de Capas"
    :show-modal="showModalEditGroupLayer"
    @action-modal="replaceShowModalEditGroupLayer"
  >
    <template v-slot:content>
      <el-form
        v-if="currentGroupLayer"
        ref="form"
        label-position="top"
        status-icon
        :model="form"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :disabled="processingForm"
        @submit.prevent="submitForm"
      >
        <!-- title -->
        <el-form-item
          label="Título"
          prop="title"
        >
          <el-input
            v-model="form.title"
            type="text"
            autocomplete="off"
            :rules="rules.title"
          />
        </el-form-item>

        <!-- name -->
        <el-form-item
          label="Nombre de Capa"
          prop="name"
        >
          <el-input
            v-model.trim="form.name"
            type="text"
            :rules="rules.name"
          />
        </el-form-item>
        <el-form-item
          label="Grupo"
          prop="group"
        >
          <el-container>
            <el-select
              disabled
              v-model="form.GroupId"
              value-key="id"
              filterable
              placeholder="Select"
            >
              <el-option
                v-for="item in []"
                :key="item.id"
                :label="item.name"
                :value="item"
              ></el-option>
            </el-select>
            <el-button
              icon="el-icon-circle-plus"
              circle
              type="text"
              class="pa-0 pl-1 ma-0"
              style="font-size: 1.7rem;"
            ></el-button>
          </el-container>
        </el-form-item>
        <!-- Descripción -->
        <el-form-item
          label="Descripción"
          prop="description"
        >
          <el-input
            disabled
            v-model="form.description"
            type="textarea"
            :rows="3"
            autocomplete="off"
            :maxlength="300"
            :show-word-limit="true"
          />
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        :disabled="processingForm"
        size="small"
        @click="replaceShowModalEditGroupLayer({ show: false })"
      >CANCELAR</el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        :loading="processingForm"
        @click.prevent="submitForm"
      >GUARDAR</el-button>
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal.vue";

export default {
  components: {
    BaseModal
  },
  data () {
    return {
      processingForm: false,
      form: {
        title: "",
        name: "",
        description: ""
      },

      rules: {
        title: [{
          required: true,
          message: "El nombre de usuario es requerido"
        }],
        name: [{
          required: true,
          message: "El nombre es requerido"
        }]
      }
    };
  },

  computed: {
    ...mapState({
      currentGroupLayer: state => state.groupLayers.currentGroupLayer
    }),

    showModalEditGroupLayer: {
      get () {
        return this.$store.state.modalsManagementLayer.showModalEditGroupLayer;
      },
      set (value) {
        this.replaceShowModalEditGroupLayer({ show: value });
      }
    }
  },

  watch: {
    showModalEditGroupLayer: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        return false;
      }
    }
  },

  methods: {
    ...mapActions({
      replaceShowModalEditGroupLayer: "modalsManagementLayer/replaceShowModalEditGroupLayer",
      getGroupLayers: "groupLayers/getGroupLayers"
    }),

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.processingForm = true
          this.editLayer().then(response => {
            const { status } = response.data;
            if (status) {
              this.$refs.form.resetFields();
              this.replaceShowModalEditGroupLayer({ show: false });
              this.getLayers();
              this.$toast.success(`el grupo de capas se guardo con éxito`)
            }
          });
        }
      });
    },

    editLayer () {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        if (!!this.form[val])
          formData.append(val, this.form[val]);
      });

      const data = formData;

      return new Promise((resolve, reject) => {
        this.$groupLayerAPI
          .edit({ data })
          .then(response => {
            this.processingForm = false
            resolve(response);
          })
          .catch(error => {
            this.processingForm = false
            reject(error)
          });
      });
    }
  }
};
</script>
