import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () => import("../views/Forum.vue"),
  },
  {
    path: "/error",
    component: () => import("../views/Error.vue"),
  },
  {
    path: "/:notFound(.*)",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((_to, _from, next) => {
  console.log(_to);
  console.log(_from);
  next();
});

export default router;
