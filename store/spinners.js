import {
  ENABLE_SPINNER,
  DISABLE_SPINNER
} from '@/types/mutations'

export const state = () => ({
  processingForm: false,
  loadingTable: false,
  loadingPage: false
})

export const mutations = {
  [ENABLE_SPINNER]: (state, payload) => (state[payload] = true),

  [DISABLE_SPINNER]: (state, payload) => (state[payload] = false)
}
