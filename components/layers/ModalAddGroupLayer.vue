<template>
  <BaseModal
    title="Registrar nuevo grupo de capa"
    :show-modal="showModalAddGroupLayer"
    @action-modal="replaceShowModalAddGroupLayer"
  >
    <template v-slot:content>
      <el-form
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
        <el-row :gutter="14">
          <el-col
            :xs="24"
            :md="{span:12, offset:12}"
            :sm="24"
            :lg="{span:12, offset:12}"
            class="text-xs-center"
          >
            <el-form-item
              prop="order"
              size="mini"
              :inline-message="true"
            >
              <label
                class="pr-2"
                for=""
              >N° de orden: </label>
              <el-input-number
                size="mini"
                v-model="form.order"
                controls-position="right"
                :min="1"
                type="number"
              />
            </el-form-item>
          </el-col>
        </el-row>
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
        <el-form-item
          label="Grupo"
          prop="group"
        >
          <el-container>
            <el-select
              v-model="form.categoryId"
              value-key="id"
              filterable
              :loading="loadingGroupLayers"
              placeholder="Select"
            >
              <el-option
                v-for="item in groupLayers"
                :key="item.id"
                :label="item.title"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-container>
        </el-form-item>
        <!-- Descripción 
        -->
        <el-form-item
          label="Descripción"
          prop="description"
        >
          <el-input
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
        @click="replaceShowModalAddGroupLayer({ show: false })"
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
        order: '1',
        title: "",
        description: "",
        categoryId: ''
      },

      rules: {
        title: [{
          required: true,
          message: "El nombre de usuario es requerido"
        }],
        order: [{
          required: true,
          type: 'number',
          message: " "
        }],
      }
    };
  },

  computed: {
    ...mapState({
      groupLayers: state => state.groupLayers.groupLayers,
      loadingGroupLayers: state => state.groupLayers.loadingGroupLayers,
      showModalAddGroupLayer: state => state.modalsManagementLayer.showModalAddGroupLayer
    })
  },

  watch: {
    showModalAddGroupLayer: function (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields()
        return false;
      }
    }
  },

  methods: {
    ...mapActions({
      replaceShowModalAddGroupLayer: "modalsManagementLayer/replaceShowModalAddGroupLayer",
      getGroupLayers: "groupLayers/getGroupLayers"
    }),

    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.processingForm = true
          this.createGroupLayer().then(response => {
            const { status } = response.data
            if (status) {
              this.$refs.form.resetFields();
              this.replaceShowModalAddGroupLayer({ show: false })
              this.getGroupLayers()
              this.$toast.success(`El grupo de capa se registro con éxito`)
            }
          });
        }
      });
    },

    createGroupLayer () {
      const formData = new FormData();

      let keys = Object.keys(this.form);
      keys.forEach(val => {
        if (!!this.form[val])
          formData.append(val, this.form[val]);
      });

      const data = formData;

      return new Promise((resolve, reject) => {
        this.$groupLayerAPI
          .create({ data })
          .then(response => {
            this.processingForm = false
            resolve(response)
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
