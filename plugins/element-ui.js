import Vue from 'vue'
import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/fonts'
// import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/es'
import './element-variables.scss'
// fade/zoom
import 'element-ui/lib/theme-chalk/base.css';
// colapsar
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

Vue.component(CollapseTransition.name, CollapseTransition)
Vue.use(Element, { locale, zIndex: 3000 })