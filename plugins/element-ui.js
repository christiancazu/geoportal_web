import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/es'
import './element-variables.scss'
// fade/zoom
import 'element-ui/lib/theme-chalk/base.css'
// colapsar
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

// import { Loading } from 'element-ui'
// let loadingInstance = Loading.service({
//   spinner: 'el-icon-loading',
// });
// loadingInstance.close();

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Element, { locale, zIndex: 3000 })