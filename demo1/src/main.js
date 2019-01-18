import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import login from "./views/login"
import VueResource from 'vue-resource'

Vue.use(ElementUI);
Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.bus = new Vue;
new Vue({
  VueResource,
  login,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
