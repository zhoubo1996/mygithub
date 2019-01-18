import Vue from "vue";
import Router from "vue-router";
import Parent from "./views/Parent";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Parent",
      component: Parent
    }
  ]
});
