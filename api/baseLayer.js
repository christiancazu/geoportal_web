import { BASE_LAYER } from "@/config/endpoints";

export default $axios => ({
  get(payload = {}) {
    return $axios({
      url: `${BASE_LAYER}/`,
      method: "GET",
      params: payload.params || {}
    });
  },
  getById(payload = {}) {
    return $axios({
      url: `${BASE_LAYER}/${payload.id}/`,
      method: "GET",
      params: payload.params || {}
    });
  },
  create(payload = {}) {
    return $axios({
      url: `${BASE_LAYER}/`,
      method: "POST",
      data: payload.data || {}
    });
  },
  update(payload = {}) {
    return $axios({
      url: `${BASE_LAYER}/${payload.data.get("id")}/`,
      method: "PUT",
      data: payload.data || {}
    });
  },
  delete(payload = {}) {
    return $axios({
      url: `${BASE_LAYER}/${payload.id}/`,
      method: "DELETE",
      params: payload.params || {}
    });
  }
});
