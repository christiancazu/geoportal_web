<template>
  <BaseModal
    title="Modificar capa vectorial"
    :show-modal="modalEditVectorialLayer"
    name-state="modalEditVectorialLayer"
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
        :disabled="$store.state.spinners.processingForm"
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
          prop="groupLayerId"
        >
          <el-container>
            <el-select
              v-model="form.groupLayerId"
              value-key="id"
              :loading="loadingGroupLayers"
              filterable
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
        <!-- Descripción -->
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
          />
        </el-form-item>
        <el-form-item
          label="¿Habilitado?"
          prop="status"
        >
          <el-switch
            v-model="form.status"
            :active-text="form.status? 'SI': 'NO'"
          >
          </el-switch>
        </el-form-item>
      </el-form>
    </template>
    <template v-slot:actions>
      <el-button
        :disabled="$store.state.spinners.processingForm"
        size="small"
        @click="$_modalVisibilityMixin_close('modalEditVectorialLayer')"
      >
        CANCELAR
      </el-button>
      <el-button
        type="primary"
        size="small"
        native-type="submit"
        :loading="$store.state.spinners.processingForm"
        @click.prevent="submitForm"
      >
        GUARDAR
      </el-button>
    </template>
  </BaseModal>
</template>
<script>
import { mapState, mapActions } from "vuex";
import BaseModal from "@/components/base/BaseModal";
import objectToFormDataMixin from '@/mixins/objectToFormDataMixin'
import formMixin from '@/mixins/formMixin'

export default {
  components: {
    BaseModal
  },

  mixins: [objectToFormDataMixin, formMixin],

  data () {
    return {
      modalAddStateName: 'modalEditVectorialLayer',
      fileLayerSelected: null,
      fileStyleSelected: null,
      showFormStyle: false,
      form: {
        order: null,
        title: "",
        name: "",
        groupLayerId: '',
        description: "",
        status: true
      },

      rules: {
        title: [{
          required: true,
          message: "El nombre de usuario es requerido"
        }],
        name: [{
          required: true,
          // pattern: /^[z0-9\s.,\/#!$%\^&\*;:{}=\-+'´`~()”“"…]+$/g,
          validator: (rule, value, callback) => {
            let text = value.split('')
            let itContainsBlanks = text.every(val => /[a-zA-Z0-9_]/g.test(val))
            if (!itContainsBlanks) {
              return callback(new Error("Solo se admite letras y subguion '_'"))
            }
            callback();
          }
        }],
        order: [{
          required: true,
          message: " "
        }],
      }
    };
  },

  computed: {
    ...mapState({
      currentItemContext: state => state.vectorialLayers.currentItemContext,
      groupLayers: state => state.groupLayers.groupLayers,
      loadingGroupLayers: state => state.groupLayers.loadingGroupLayers,
      modalEditVectorialLayer: state => state.modalsVisibilities.modalEditVectorialLayer
    })
  },

  watch: {
    modalEditVectorialLayer (newState, oldState) {
      if (!newState) {
        this.$refs.form.resetFields();
        this.fileLayerSelected = null
        return false;
      }
      this.getGroupLayers()
    },

    currentItemContext (newState, oldState) {
      this.form.order = this.currentItemContext.order
      this.form.title = this.currentItemContext.title
      this.form.name = this.currentItemContext.title
      this.form.description = this.currentItemContext.description
      this.form.groupLayerId = this.currentItemContext.groupLayerId
    }
  },

  methods: {
    ...mapActions({
      getGroupLayers: 'groupLayers/getGroupLayers',
      getVectorialLayers: "vectorialLayers/getVectorialLayers",
      updateVectorialLayer: "vectorialLayers/updateVectorialLayer"
    }),

    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        const data = this.$_objectToFormDataMixin_transform();

        try {          
          await this.updateVectorialLayer({
            id: this.currentItemContext.id,
            data
          })
          this.$refs.form.resetFields()
          this.$toast.success(this.$SUCCESS.LAYER.UPDATED)
          this.$_modalVisibilityMixin_close('modalEditVectorialLayer')

          await this.getVectorialLayers()

        } catch (e) {}
      }
    },

    launchUploadAvatar (option) {
      this.form.file = option.file;
      this.fileLayerSelected = option.file
      const nameFile = option.file.name.split('.')
      this.form.name = nameFile[0]
      this.form.title = nameFile[0]
    }
  }
};
</script>
