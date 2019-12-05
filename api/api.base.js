export default $axios => resource => ({
  get: params => $axios.$get(`${resource}/`, { params }),

  create: data => $axios.$post(`${resource}/`, data),

  update: data => $axios.$put(`${resource}/${data.get('id')}/`, data),

  delete: slug => $axios.$delete(`${resource}/${slug}/`),

  getById: slug => $axios.$get(`${resource}/${slug}/`),

  publish: data => $axios.$post(`${resource}/publish/`, data),

  // token
  refreshToken: data => $axios.$post(`${resource}/`, data),

  // user
  getProfile: () => $axios.$get(`${resource}/profile/`),

  updateProfile: data => $axios.$put(`${resource}/profile_update/`, data),

  info: () => $axios.$get(`${resource}/info/`),

  logout: () => $axios.$post(`${resource}/logout/`),

  // public
  getRegions: () => $axios.$get(`${resource}/region/`),

  getProvinces: params => $axios.$get(`${resource}/province/`, { params }),

  getDistricts: params => $axios.$get(`${resource}/district/`, { params }),

  // request
  getPending: () => $axios.$get(`${resource}/pending/`),

  getRejected: () => $axios.$get(`${resource}/rejected/`),

  approve: data => $axios.$post(`${resource}/approve/`, data),

  reject: data => $axios.$post(`${resource}/reject/`, data)
})
