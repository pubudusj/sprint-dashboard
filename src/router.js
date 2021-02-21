import Vue from "vue";
import { Auth } from "aws-amplify";
import Router from "vue-router";
import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: "dashboard",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          requiredAuth: true,
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import("./views/Dashboard.vue"),
      },
      {
        path: "/icons",
        name: "icons",
        component: () =>
          import("./views/Icons.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        component: () =>
          import("./views/UserProfile.vue"),
      },
      {
        path: "/maps",
        name: "maps",
        component: () =>
          import("./views/Maps.vue"),
      },
      {
        path: "/tables",
        name: "tables",
        component: () =>
          import("./views/Tables.vue"),
      },
      {
        path: "/logout",
        name: "logout",
        meta: {
          requiredAuth: true,
        },
        component: () =>
          import("./views/Logout.vue"),
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        meta: {
          requiredNonAuth: true,
        },
        component: () =>
          import("./views/Login.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import("./views/Register.vue"),
      },
    ],
  },
];

const router = new Router({
  linkExactActiveClass: "active",
  routes: routes,
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some((recored) => recored.meta.requiredAuth)) {
    Auth.currentAuthenticatedUser()
      .then(() => {
        next();
      })
      .catch(() => {
        next({
          path: "/login",
        });
      });
  }
  if (to.matched.some((recored) => recored.meta.requiredNonAuth)) {
    Auth.currentAuthenticatedUser()
      .then(() => {
        next({
          path: "/dashboard",
        });
      })
      .catch(() => {
        next();
      });
  }
  next();
});

export default router;
