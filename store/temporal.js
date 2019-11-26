import {
  SET_DATA_CONTEXT
} from '../types/mutation-types'
export const state = () => ({
  headers: [],
  values: []
})

export const actions = {
  async getSpaces ({ commit }) {
    const { data } = await this.$temporalAPI.get({ params: { um: 'GB' } })
    commit(SET_DATA_CONTEXT, data)
  },
}

export const mutations = {
  /**
   * receives 2 objects with array of values
   * mergin at array of objects, ex:
   * given: { headers: [], values: [] }
   * set to: [{ header: 'x', value: y }, ...{}]
   *
   */
  [SET_DATA_CONTEXT]: (state, payload) => {
    state.headers = payload.headers
    state.values = payload.values
    // payload.headers.forEach((header, index) => {
    //   state.spaces.push({ header, value: payload.values[index] })
    // })
  },
}
