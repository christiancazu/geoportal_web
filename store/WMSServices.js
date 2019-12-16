import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_PUBLISHED_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE,
  OPEN_MODAL,
  SET_MODAL_VISIBLE,
  CLOSE_MODAL
} from '../types/mutation-types'

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1,
  modal: {
    title: 'x',
    folderRoot: 'components',
    folderName: 'fallback',
    component: 'Fallback',
    visible: false
  },
  innerComponent: {
    title: 'x',
    folderRoot: 'components',
    folderName: 'fallback',
    component: 'Fallback',
    store: 'WMSServices',
    visible: false
  }
})

export const actions = {
  async createItemContext ({}, form) {
    await this.$WMSServiceAPI.create(form)
  },

  async getDataContext ({ commit }) {
    const data = await this.$WMSServiceAPI.get()
    commit(SET_DATA_CONTEXT, data)
  },

  async getItemContext ({ commit }, id) {
    const data = await this.$WMSServiceAPI.getById(id)
    commit(SET_ITEM_CONTEXT, data)
  },

  async publishItemContext ({}, form) {
    await this.$WMSServiceAPI.publish(form)
  },

  async updateItemContext ({}, form) {
    await this.$WMSServiceAPI.update(form)
  },

  async deleteItemContext ({}, id) {
    await this.$WMSServiceAPI.delete(id)
  },

  openModal: ({ commit }, payload) => {
    commit(OPEN_MODAL, payload)
    setTimeout(() => {
      commit(SET_MODAL_VISIBLE)
    }, 250)
  },

  openInnerModal: ({ commit }, payload) => {
    console.warn('dispatch innerModal', payload)
    commit('OPEN_INNER_MODAL', payload)
    setTimeout(() => {
      commit('SET_MODAL_INNER_VISIBLE')
    }, 250)
  }
}

export const mutations = {
  [SET_DATA_CONTEXT]: (state, payload) => (state.dataContext = payload),

  [SET_ITEM_CONTEXT]: (state, payload) => (state.itemContext = payload),

  [SET_PUBLISHED_ITEM_CONTEXT]: (state, payload) =>
    (state.itemContext.isPublished = !payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload),

  [OPEN_MODAL]: (state, payload) => {
    state.modal.folderRoot = payload.folderRoot
    state.modal.folderName = payload.folderName
    state.modal.component = payload.component
  },

  OPEN_INNER_MODAL: (state, payload) => {
    state.innerComponent.folderRoot = payload.folderRoot
    state.innerComponent.folderName = payload.folderName
    state.innerComponent.component = payload.component
    state.innerComponent.store = payload.store
    state.innerComponent.title = payload.title || ' '
  },

  [CLOSE_MODAL]: (state, payload) => {
    console.warn('CLOSE_MODAL')
    state[payload].visible = false
    state[payload].folderRoot = 'components'
    state[payload].folderName = 'fallback'
    state[payload].component = 'Fallback'
  },

  CLOSE_INNER_MODAL: state => {
    console.warn('CLOSE_INNER_MODAL')
    state.innerComponent.visible = false
    state.innerComponent.folderRoot = 'components'
    state.innerComponent.folderName = 'fallback'
    state.innerComponent.component = 'Fallback'
  },

  [SET_MODAL_VISIBLE]: state => (state.modal.visible = true),

  SET_MODAL_INNER_VISIBLE: state => {
    console.warn('SET_MODAL_INNER_VISIBLE> innerComponent ', state.innerComponent)
    state.innerComponent.visible = true
  },

  SET_DIALOG_TITLE: (state, payload) => {
    state.modal.title = payload
  }
}
