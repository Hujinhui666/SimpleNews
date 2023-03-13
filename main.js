import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

// 封装 Toast
// 封装弹框
uni.$showMsg = function(title = '数据加载失败', duration = 1500) {
uni.showToast({
	title,
	duration,
	icon: 'none',
})
}

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
// import { createSSRApp } from 'vue'
// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
// #endif