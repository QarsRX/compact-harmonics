import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ChartPage from "@/views/ChartPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/login_page",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/device1",
    name: "device1",
    component: ChartPage,
  },
  {
    path: "/device2",
    name: "device2",
    component: ChartPage,
  },
  {
    path: "/device3",
    name: "device3",
    component: ChartPage,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
