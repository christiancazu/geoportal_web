
<template>
<div>
  <div class="mb-3 text-request">
    <label class="text-uppercase">Identificador: </label>
    <p class="text-capitalize ma-0">{{ itemContext.identificator }}</p>
  </div>

  <el-row :gutter="10">
    <el-col
      :xs="24" :md="8"
    >
      <div>
        <el-row>
          <el-col
            :xs="12" :md="24"
          >
            <div class="my-3 text-request">
              <label class="text-uppercase">Tamaño de imagen: </label>
              <p class="text-capitalize ma-0">{{ itemContext.fileSize }}</p>
            </div>
          </el-col>
          <el-col
            :xs="12" :md="24"
          >
            <div class="my-3 text-request">
              <label class="text-uppercase">Tiempo de descarga: </label>
              <p class="text-capitalize ma-0">{{ itemContext.downloadedTime }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col
      :xs="24" :md="16"
    >
      <el-image
        :src="itemContext.thumbnailImage"
        fit="contain"
        class="satelital-image-preview"
      >
        <div
          slot="placeholder"
          class="image-slot"
        >
          Loading<span class="dot">...</span>
        </div>
      </el-image>
    </el-col>
  </el-row>
  <div class="my-3 text-request">
    <label class="text-uppercase">Metadatos: </label>
  </div>
  <el-container
    direction="vertical"
    class="my-3 satelital-metadata"
  >
    <div
      v-for="(value, key, index) in itemContext.metadata"
      :key="index"
    >
      <el-row
        align="middle"
        class="py-2"
      >
        <el-col
          :span="8"
        >
          <div>{{ key }}</div>
        </el-col>
        <el-col
          :span="1"
        >
          <el-divider direction="vertical" />
        </el-col>
        <el-col
          :span="15"
        >
          <div>{{ value }}</div>
        </el-col>
      </el-row>
      <el-divider />
    </div>
  </el-container>

  <div class="text-xs-center">
    <el-button
      size="small"
      @click="closeModal()"
    >
      CERRAR
    </el-button>
  </div>
</div>
</template>

<script>

import { mapState } from 'vuex'

import {
  SET_MODAL_TITLE,
  CLOSE_MODAL
} from '@/types/mutations'

export default {
  props: {
    storeMounted: { type: Object, default: () => ({}) }
  },

  data () {
    return {
      dialogTitle: 'Detalle de imagen satelital',

      storeBase: {
        name: 'satelitalsImages'
      }
    }
  },

  computed: {
    ...mapState({
      itemContext (state) {
        return state[this.storeBase.name].itemContext
      }
    })
  },

  created () {
    if (this.storeMounted)
      this.$store.commit(`${this.storeMounted.name}/${SET_MODAL_TITLE}`, {
        typeModal: this.storeMounted.typeModal,
        dialogTitle: this.dialogTitle
      })
  },

  methods: {
    /**
     * mutating CLOSE_MODAL on his storeMounted when close btn is clicked
     */
    closeModal () {
      this.$store.commit(`${this.storeMounted.name}/${CLOSE_MODAL}`, this.storeMounted.typeModal)
    }
  },
}
</script>
