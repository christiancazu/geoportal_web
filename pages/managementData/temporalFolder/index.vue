<template>
<base-page :page-header="pageHeader">
  <div style="width: 90%">
    <bar-chart
      :chart-data="datacollection"
      :styles="myStyles"
      :height="240"
    />
  </div>
</base-page>

</template>

<script>
import BasePage from '@/components/base/pages/BasePage'

import BarChart from '@/charts/barChart'

import {
  ENABLE_PROCESSING_FORM,
  DISABLE_PROCESSING_FORM
} from '@/types/mutation-types.js'

import {
  mapState
} from 'vuex'

export default {
  components: {
    BasePage,
    BarChart
  },

  data () {
    return {
      pageHeader: {
        title: 'CARPETA TEMPORAL'
      },
      datacollection: {},
      myStyles: {
        position: 'relative'
      }
    }
  },

  computed: {
    ...mapState({
      spaces: state => state.temporal.spaces
    })
  },

  async created () {
    await this.$store.dispatch('temporal/getSpaces')
    this.fillData()
  },

  methods: {
    fillData () {
      let labels = this.$store.state.temporal.headers
      let datasets = [
        {
          label: "Espacios ocupados en disco en GB",
          backgroundColor: this.getRandomColors(5),
          data: this.$store.state.temporal.values
        }
      ]

      this.datacollection = {
        labels,
        datasets
      }
    },

    getRandomColors (quantify) {
      let colors =  []
      for (let index = 0; index < quantify; index++) {
        colors.push('#'+ Math.floor(Math.random()*16777215).toString(16))
      }
      return colors
    },

    async submitForm () {
      let isFormValid = false

      await this.$refs.form.validate(result => isFormValid = result)

      if (isFormValid) {
        try {
          this.$store.commit(`spinners/${ENABLE_PROCESSING_FORM}`)

          const formData = this.objectToFormData()

          // just if image isn't null append to formdata
          if (this.file.selected !== null) {
            formData.append('image', this.file.selected)
          }

          // delete image prop from form if have the initial path url as string
          // before to be sended
          if (typeof this.form.image === 'string') {
            formData.delete('image')
          }

          await this.$store.dispatch('users/updateProfile', { data: formData })

          /**
           * updating current auth.user state to view changes (image user)
           */
          const { data } = await this.$store.dispatch('users/getUserInfo')
          this.$store.commit('auth/SET', { key: 'user', value: data.user })

          this.$toast.success(this.$SUCCESS.USER.UPDATED)
        }
        catch (e) {}
        this.$store.commit(`spinners/${DISABLE_PROCESSING_FORM}`)
      }
    },
  },

  head: {
    title: 'Carpeta temporal'
  },
}
</script>
