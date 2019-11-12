<template>
<el-row :gutter="10">
  <el-col
    :xs="24"
    :sm="8"
  >
    <!-- region -->
    <el-form-item
      label="Región"
      prop="region"
    >
      <el-select
        v-model="form.region"
        value-key="id"
        filterable
        placeholder="Select"
        :loading="loadingRegions"
      >
        <el-option
          v-for="item in regions"
          :key="item.id"
          :label="item.name"
          :value="item"
        />
      </el-select>
    </el-form-item>
  </el-col>
  <el-col
    :xs="24"
    :sm="8"
  >
    <!-- porvincia -->
    <el-form-item
      ref="province"
      label="Provincia"
      prop="province"
    >
      <el-select
        v-model="form.province"
        :loading="loadingProvinces"
        value-key="id"
        filterable
        placeholder="Select"
      >
        <el-option
          v-for="item in provinces"
          :key="item.id"
          :label="item.name"
          :value="item"
        />
      </el-select>
    </el-form-item>
  </el-col>
  <el-col
    :xs="24"
    :sm="8"
  >
    <!-- distrito -->
    <el-form-item
      ref="districtId"
      label="Distrito"
      prop="districtId"
    >
      <el-select
        v-model="form.districtId"
        value-key="id"
        filterable
        :loading="loadingDistricts"
        placeholder="Select"
      >
        <el-option
          v-for="item in districts"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
  </el-col>
</el-row>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {

  data () {
    return {
      form: {}
    }
  },

  computed: {
    ...mapState({
      regions: state => state.public.regions,
      loadingRegions: state => state.public.loadingRegions,
      provinces: state => state.public.provinces,
      loadingProvinces: state => state.public.loadingProvinces,
      districts: state => state.public.districts,
      loadingDistricts: state => state.public.loadingDistricts,
    })
  },

  methods: {
    ...mapActions({

    })
  },
}
</script>