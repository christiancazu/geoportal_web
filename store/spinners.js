import {
  ENABLE_PROCESSING_FORM,
  DISABLE_PROCESSING_FORM,
  ENABLE_LOADING_TABLE,
  DISABLE_LOADING_TABLE
} from '../types/mutation-types'

export const state = () => ({
  processingForm: false,
  loadingTable: false
})

export const mutations = {
  [ENABLE_PROCESSING_FORM]: state => (state.processingForm = true),

  [DISABLE_PROCESSING_FORM]: state => (state.processingForm = false),

  [ENABLE_LOADING_TABLE]: state => (state.loadingTable = true),

  [DISABLE_LOADING_TABLE]: state => (state.loadingTable = false)
}
