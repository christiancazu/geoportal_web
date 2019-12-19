<template>
<base-page :page-header="pageHeader">
  <el-divider
    content-position="left"
    class="my-4"
  >
    Unidades a mostrar
  </el-divider>

  <div
    class="mb-4 d-flex" style="justify-content: center"
  >
    <el-radio
      v-for="(radio, index) in radios" :key="index"
      v-model="um"
      :label="radio.label"
      border
      :disabled="$store.state.spinners.processingForm"
      @change="fetchSpaces()"
    >
      {{ radio.text }}
    </el-radio>
  </div>

  <el-divider
    content-position="left"
    class="my-2"
  >
    Espacio ocupado
  </el-divider>

  <div
    v-loading="$store.state.spinners.processingForm"
    class="my-4"
  >
    <el-row>
      <el-col
        :xs="24" :md="8"
      >
        <el-table
          :data="spaces"
          class="mt-4"
        >
          <el-table-column
            prop="label"
            label="Espacios"
          />
          <el-table-column
            prop="value"
            label="Cantidad"
          >
            <template slot-scope="scope">
              {{ scope.row.value }} {{ um }}
            </template>
          </el-table-column>
        </el-table>

      </el-col>
      <el-col
        class="mt-5"
        :xs="24" :md="8"
      >
        <pie-chart
          v-if="dataLoaded"
          :chart-data="temporalData"
          :height="200"
        />
      </el-col>
      <el-col
        class="mt-5"
        :xs="24" :md="8"
      >
        <pie-chart
          v-if="dataLoaded"
          :chart-data="mediaData"
          :height="200"
        />
      </el-col>
    </el-row>
  </div>

  <div
    class="mt-4 d-flex"
    style="justify-content: center"
  >
    <base-btn-confirm
      v-loading="$store.state.spinners.processingForm"
      title="Liberar espacio en disco"
      body-text="¿Está seguro de realizar esta acción?"
      btn-name="Liberar espacio"
      @confirmed-action="cleanSpaces"
    />
  </div>
</base-page>
</template>

<script>
import BasePage from '@/components/base/pages/BasePage'
import BaseBtnConfirm from '@/components/base/BaseBtnConfirm'

import PieChart from '@/charts/pieChart'

import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '@/types/mutations'

import {
  mapState
} from 'vuex'

export default {
  components: {
    BasePage,
    PieChart,
    BaseBtnConfirm
  },

  data () {
    return {
      pageHeader: {
        title: 'CARPETA TEMPORAL'
      },
      radios: [
        { label: 'GB', text: 'Gigabytes' },
        { label: 'MB', text: 'Megabytes' },
        { label: 'Bytes', text: 'Bytes'}
      ],
      temporalData: {},
      mediaData: {},
      um: 'GB',
      dataLoaded: false
    }
  },

  computed: {
    ...mapState({
      spaces: state => state.temporal.spaces,
      temporalSpaces: state => state.temporal.temporalSpaces,
      mediaSpaces: state => state.temporal.mediaSpaces
    })
  },

  async created () {
    await this.fetchSpaces()
  },

  methods: {
    fillTemporalData () {
      let labels = this.temporalSpaces.map(space => space.label)

      let colors = this.temporalSpaces.map(space => space.rgbColor)

      let datasets = this.getDataSets(this.temporalSpaces, colors)

      this.temporalData = {
        labels,
        datasets
      }
    },
    fillMediaData () {
      let labels = this.mediaSpaces.map(space => space.label)

      let colors = this.mediaSpaces.map(space => space.rgbColor)

      let datasets = this.getDataSets(this.mediaSpaces, colors)

      this.mediaData = {
        labels,
        datasets
      }
    },

    getDataSets (spaces, colors) {
      return [
        {
          hoverBackgroundColor: this.setOpacityToRGBcolors(colors, 0.85),
          borderColor: this.setOpacityToRGBcolors(colors, 1),
          borderWidth: 1,
          backgroundColor: this.setOpacityToRGBcolors(colors, 0.45),
          data: spaces.map(space => space.value)
        }
      ]
    },

    setOpacityToRGBcolors (RGBColors, opacity) {
      return RGBColors.map(rgb => `rgba(${rgb}, ${opacity})`)
    },

    async cleanSpaces () {
      try {
        this.dataLoaded = false
        this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')

        await this.$store.dispatch('temporal/getSpaces', this.um)
        await this.$store.dispatch('temporal/cleanSpaces')

        this.$toast.success(this.$SUCCESS.TEMPORAL.DELETED)
        this.fillTemporalData()
        this.fillMediaData()
        this.dataLoaded = true

      } catch (e) {}

      this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')
    },

    async fetchSpaces () {
      try {
        this.dataLoaded = false
        this.$store.commit(`spinners/${ENABLE_SPINNER}`, 'processingForm')

        await this.$store.dispatch('temporal/getSpaces', this.um)

        this.fillTemporalData()
        this.fillMediaData()
        this.dataLoaded = true

      } catch (e) {}

      this.$store.commit(`spinners/${DISABLE_SPINNER}`, 'processingForm')
    }
  },

  head: {
    title: 'Carpeta temporal'
  }
}
</script>
