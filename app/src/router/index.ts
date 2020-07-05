import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import MainPage from "@/views/MainPage/MainPage.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/form/:worker_id",
    component: () => import("@/views/WorkerForm/WorkerForm.vue"),
  },
  {
    path: "*",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
