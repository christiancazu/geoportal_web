import {
  SET_SPACES
} from '../types/mutation-types'

export const state = () => ({
  spaces: [
    { label: 'Carpeta temporal', value: 0, rgbColor: '255, 255, 0' /*blue*/ },
    { label: 'Carpeta de archivos', value: 0, rgbColor: '0, 255, 0' /*Lime*/ },
    { label: 'Usado en disco', value: 0, rgbColor: '0, 255, 255' /*cyan*/ },
    { label: 'Espacio libre', value: 0, rgbColor: '255, 0, 0' /*red*/ },
    { label: 'Total de disco', value: 0, rgbColor: '0, 0, 255' /*yellow*/ }
  ],
  temporalSpaces: [],
  mediaSpaces: []
})

export const actions = {
  async getSpaces ({ commit }, um) {
    const { data } = await this.$temporalAPI.get({ params: { um } })
    commit(SET_SPACES, data)
  },
  async cleanSpaces ({ }) {
    await this.$temporalAPI.delete()
  },
}

export const mutations = {
  [SET_SPACES]: (state, payload) => {
    // set spaces
    Object.keys(payload).forEach((key, index) => {
      state.spaces[index].value = payload[key]
    })
    // set temporalSpaces
    state.temporalSpaces = []
    state.temporalSpaces.push(state.spaces[4])
    state.temporalSpaces.push(state.spaces[0])
    // set mediaSpaces
    state.mediaSpaces = []
    state.mediaSpaces.push(state.spaces[4])
    state.mediaSpaces.push(state.spaces[1])
  }
}
