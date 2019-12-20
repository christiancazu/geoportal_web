<!--
// <template>
// <base-preview-item
//   :form-title="formTitle"
//   :context="context"
// >
//   <template v-slot:content>
//     <div class="mb-3 text-request">
//       <label class="text-uppercase">Identificador: </label>
//       <p class="text-capitalize ma-0">{{ itemContext.identificator }}</p>
//     </div>

//     <el-row :gutter="10">
//       <el-col
//         :xs="24" :md="8"
//       >
//         <div>
//           <el-row>
//             <el-col
//               :xs="12" :md="24"
//             >
//               <div class="my-3 text-request">
//                 <label class="text-uppercase">Tamaño de imagen: </label>
//                 <p class="text-capitalize ma-0">{{ itemContext.fileSize }}</p>
//               </div>
//             </el-col>
//             <el-col
//               :xs="12" :md="24"
//             >
//               <div class="my-3 text-request">
//                 <label class="text-uppercase">Tiempo de descarga: </label>
//                 <p class="text-capitalize ma-0">{{ itemContext.downloadedTime }}</p>
//               </div>
//             </el-col>
//           </el-row>
//         </div>
//       </el-col>
//       <el-col
//         :xs="24" :md="16"
//       >
//         <el-image
//           :src="itemContext.thumbnailImage"
//           fit="contain"
//           class="satelital-image-preview"
//         >
//           <div
//             slot="placeholder"
//             class="image-slot"
//           >
//             Loading<span class="dot">...</span>
//           </div>
//         </el-image>
//       </el-col>
//     </el-row>
//     <div class="my-3 text-request">
//       <label class="text-uppercase">Metadatos: </label>
//     </div>
//     <el-container
//       direction="vertical"
//       class="my-3 satelital-metadata"
//     >
//       <div
//         v-for="(value, key, index) in itemContext.metadata"
//         :key="index"
//       >
//         <el-row
//           align="middle"
//           class="py-2"
//         >
//           <el-col
//             :span="8"
//           >
//             <div>{{ key }}</div>
//           </el-col>
//           <el-col
//             :span="1"
//           >
//             <el-divider direction="vertical" />
//           </el-col>
//           <el-col
//             :span="15"
//           >
//             <div>{{ value }}</div>
//           </el-col>
//         </el-row>
//         <el-divider />
//       </div>
//     </el-container>
//   </template>
// </base-preview-item>
// </template>

// <script>
// import BasePreviewItem from '@/components/base/BasePreviewItem'

// import { mapState } from 'vuex'

// export default {
//   components: {
//     BasePreviewItem
//   },

//   props: {
//     // eslint-disable-next-line vue/prop-name-casing
//     modalBaseActionsMixin_mountedOn: { type: String, required: true }
//   },

//   data () {
//     return {
//       formTitle: 'Detalle de imagen satelital',

//       context: {
//         mountedOn: this.modalBaseActionsMixin_mountedOn
//       },

//       storeBase: 'satelitalsImages'
//     }
//   },

//   computed: {
//     ...mapState({
//       itemContext (state) {
//         return state[this.storeBase].itemContext
//       }
//     })
//   }
// }
// </script>
