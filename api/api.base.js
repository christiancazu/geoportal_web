// export const get = (payload) => ({
//   url: `${BASE_LAYER}/`,
//   method: 'GET',
//   params: payload.params || {}
// })

// export default class BaseService {
//   constructor (baseEndPoint) {
//     // if (!this.baseEndPoint) {
//     //   throw new Error('Child service class not provide entity')
//     // }
//     this.baseEndPoint = baseEndPoint
//   }

//     get (payload)  ({
//       url: `${this.baseEndPoint}/`,
//       method: 'GET',
//       params: payload.params || {}
//     })
// }
export default $axios => resource => ({
  get: () => $axios.$get(`${resource}/`),
  getById: (slug) => $axios.$get(`${resource}/${slug}/`)
})