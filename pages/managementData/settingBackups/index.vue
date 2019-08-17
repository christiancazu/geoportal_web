<template>
  <BasePage
    title="Configurar copias de seguridad"
    :fit-content="true"
  >
    <template v-slot:content>
      <el-form
        ref="form"
        label-position="top"
        status-icon
        :model="form"
        :rules="rules"
        label-width="180px"
        :disabled="processingForm"
      >
        <el-form-item
          label="Fecha de la ultima copia de seguridad"
          prop="username"
        >
          <el-date-picker
            type="date"
            size="small"
            placeholder="yyyy/MM/dd"
            v-model="form.date"
            style="width: 100%;"
            format="yyyy/MM/dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="Copias automáticas"
          prop="email"
        >
          <el-switch v-model="form.automaticCopies">
          </el-switch>
        </el-form-item>
        <el-form-item
          label="OBJETOS DEL GEOPORTAL"
          prop="object"
        >
          <el-checkbox-group
            v-model="form.object"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox
              v-for="item in items"
              :label="item.value"
              :key="item.id"
            >{{item.value}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item
          label="Description"
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
        <el-form-item class="text-xs-center mb-0">
          <el-button
            :loading="processingForm"
            type="primary"
            size="small"
            @click="submitForm"
          >CREAR COPIA DE SEGURIDAD</el-button>
        </el-form-item>
      </el-form>
    </template>
  </BasePage>
</template>
<script>
import BasePage from '@/components/base/BasePage.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    BasePage
  },

  data () {
    return {
      checkedCities: [],
      items: [
        { value: 'Capas', id: '1' },
        { value: 'Image', id: '2' },
        { value: 'Datos estadisticos', id: '3' },
        { value: 'Reportes', id: '4' },
        { value: 'Configuraciones', id: '5' }
      ],
      processingForm: false,
      profile: {},
      form: {
        object: [],
        date: '',
        automaticCopies: true,
        description: ''
      },

      rules: {}
    };
  },

  methods: {
    handleCheckedCitiesChange () {

    },

    submitForm (e) {
      e.preventDefault();
      this.$refs.form.validate(valid => {
        if (valid) {
          this.processingForm = true
        }
      });
    }
  }
};
</script>
