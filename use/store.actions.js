import {
  OPEN_MODAL,
  SET_MODAL_VISIBLE,
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT
} from '@/types/mutations'

// PAGEACTIONS
export const getDataContext = api => async function ({ commit }) {
  const data = await this[api].get()
  commit(SET_DATA_CONTEXT, data)
}

export const getItemContext = api => async function ({ commit }, id) {
  const data = await this[api].getById(id)
  commit(SET_ITEM_CONTEXT, data)
}

export const createItemContext = api => async function ({}, form) {
  await this[api].create(form)
}

export const publishItemContext = api => async function ({}, form) {
  await this[api].publish(form)
}

export const updateItemContext = api => async function ({}, form) {
  await this[api].update(form)
}

export const deleteItemContext = api => async function ({}, id) {
  await this[api].delete(id)
}

// modal
export const openModal = ({ commit }, payload) => {
  commit(OPEN_MODAL, payload)
  setTimeout(() => commit(SET_MODAL_VISIBLE, payload), 250)
}