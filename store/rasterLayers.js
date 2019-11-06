import {
  SET_DATA_CONTEXT,
  SET_ITEM_CONTEXT,
  SET_PUBLISHED_ITEM_CONTEXT,
  SET_CURRENT_PAGE_ON_TABLE
} from "../types/mutation-types";

export const state = () => ({
  dataContext: [],
  itemContext: {},
  currentPageOnTable: 1
});

export const actions = {
  async createItemContext({}, form) {
    try {
      await this.$rasterLayerAPI.create(form);
    } catch (error) {
      throw error;
    }
  },

  async getDataContext({ commit }) {
    try {
      const { data } = await this.$rasterLayerAPI.get();
      commit(SET_DATA_CONTEXT, { dataContext: data || [] });
    } catch (error) {
      throw error;
    }
  },

  async getItemContext({ commit }, id) {
    try {
      const { data } = await this.$rasterLayerAPI.getById(id);
      commit(SET_ITEM_CONTEXT, { itemContext: data });
    } catch (error) {
      throw error;
    }
  },

  async publishItemContext({}, form) {
    try {
      await this.$rasterLayerAPI.publish(form);
    } catch (error) {
      throw error;
    }
  },

  async updateItemContext({}, form) {
    try {
      await this.$rasterLayerAPI.update(form);
    } catch (error) {
      throw error;
    }
  },

  async deleteItemContext({}, id) {
    try {
      await this.$rasterLayerAPI.delete(id);
    } catch (error) {
      throw error;
    }
  }
};

export const mutations = {
  [SET_DATA_CONTEXT]: (state, { dataContext }) => (state.dataContext = dataContext),

  [SET_ITEM_CONTEXT]: (state, { itemContext }) => (state.itemContext = itemContext),

  [SET_PUBLISHED_ITEM_CONTEXT]: (state, payload) => (state.itemContext.isPublished = !payload),

  [SET_CURRENT_PAGE_ON_TABLE]: (state, payload) => (state.currentPageOnTable = payload)
};
