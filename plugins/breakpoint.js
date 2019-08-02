import Vue from 'vue'
const data = {}
Vue.prototype.$breakpoint = (width, height) => {
    data.xs = width < 600
    data.sm = width > 600 && width < 960 
    data.md = width > 960 && width < 1264
    data.lg = width > 1264 && width < 1904
    data.xl = width > 1904
    data.height = width
    data.width = height
    return data
}

Vue.prototype.break = data