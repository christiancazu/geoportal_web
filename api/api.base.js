export default $axios => resource => ({

  get: () => $axios.$get(`${resource}/`),

  create: (data) => $axios.$post(`${resource}/`, data),

  update: (data) => $axios.$put(`${resource}/${data.get('id')}/`, data),

  delete: (slug) => $axios.$delete(`${resource}/${slug}/`),

  getById: (slug) => $axios.$get(`${resource}/${slug}/`),

  // user
  getProfile: () => $axios.$get(`${resource}/profile/`),

  updateProfile: (data) => $axios.$put(`${resource}/profile_update/`, data),

  info: () => $axios.$get(`${resource}/info/`),

  // public
  getRegions: () => $axios.$get(`${resource}/region/`),

  getProvinces: (params) =>  $axios.$get(`${resource}/province/`, { params }),

  getDistricts: (params) => $axios.$get(`${resource}/district/`, { params }),
})
