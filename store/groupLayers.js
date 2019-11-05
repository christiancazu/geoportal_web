import { SET_DATA_CONTEXT, SET_ITEM_CONTEXT } from "../types/mutation-types";

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1
});

export const actions = {
  async getDataContext({ commit }) {
    try {
      const { data } = await this.$groupLayerAPI.get();
      commit(SET_DATA_CONTEXT, { dataContext: data || [] });
    } catch (error) {
      throw error;
    }
  },

  updateItemContext({ commit }, payload) {
    commit(SET_ITEM_CONTEXT, payload);
  }
};

export const mutations = {
  [SET_DATA_CONTEXT]: (state, { dataContext }) => (state.dataContext = dataContext),

  [SET_ITEM_CONTEXT]: (state, { itemContext }) => (state.itemContext = itemContext)
};
