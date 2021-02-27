import Vue from "vue"
import { Auth } from "aws-amplify"
import Router from "vue-router"
import DashboardLayout from "@/layout/DashboardLayout"
import AuthLayout from "@/layout/AuthLayout"
import { store } from './store/store.js'

Vue.use(Router)

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
        component: () =>
          import("./views/Dashboard.vue"),
      },
      {
        path: "/profile",
        name: "profile",
        meta: {
          requiredAuth: true,
        },
        component: () =>
          import("./views/UserProfile.vue"),
      },
      {
        path: "/create-user",
        name: "create user",
        meta: {
          requiredAuth: true,
          onlyAdmin: true,
        },
        component: () =>
          import("./views/CreateUser.vue"),
      },
      {
        path: "/users",
        name: "user list",
        meta: {
          requiredAuth: true,
          onlyAdmin: true,
        },
        component: () =>
          import("./views/UserList.vue"),
      },
      {
        path: "/create-sprint",
        name: "create sprint",
        meta: {
          requiredAuth: true,
          onlyAdmin: true,
        },
        component: () =>
          import("./views/CreateSprint.vue"),
      },
      {
        path: "/edit-sprint/:id",
        name: "edit sprint",
        meta: {
          requiredAuth: true,
          onlyAdmin: true,
        },
        component: () =>
          import("./views/EditSprint.vue"),
      },
      {
        path: "/create-ticket",
        name: "create ticket",
        meta: {
          requiredAuth: true,
        },
        component: () =>
          import("./views/CreateTicket.vue"),
      },
      {
        path: "/edit-ticket/:id",
        name: "edit ticket",
        meta: {
          requiredAuth: true,
        },
        component: () =>
          import("./views/EditTicket.vue"),
      },
      {
        path: "/current-sprint",
        name: "current sprint",
        meta: {
          requiredAuth: true,
        },
        component: () =>
          import("./views/CurrentSprint.vue"),
      },
      {
        path: "/backlog",
        name: "Backlog",
        meta: {
          requiredAuth: true,
        },
        component: () =>
          import("./views/Backlog.vue"),
      },
      {
        path: "/archived",
        name: "past sprints",
        meta: {
          requiredAuth: true,
        },
        component: () =>
          import("./views/ArchivedSprints.vue"),
      },
      {
        path: "/restricted",
        name: "restricted",
        component: () =>
          import("./views/Restricted.vue"),
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
        path: "/forgot-password",
        name: "forgot password",
        meta: {
          requiredNonAuth: true,
        },
        component: () =>
          import("./views/ForgotPassword.vue"),
      },
    ],
  },
]

const router = new Router({
  linkExactActiveClass: "active",
  routes: routes,
})

router.beforeResolve((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiredAuth)) {
    Auth.currentAuthenticatedUser()
      .then(() => {
        if (to.matched.some((record) => record.meta.onlyAdmin)) {
          try {
            if (!store.getters['isLoginUserAdmin']) {
              next({
                path: "/restricted",
              })
            }
          } catch {
            next({
              path: "/",
            })
          }
        }
        next()
      })
      .catch(() => {
        next({
          path: "/login",
        })
      })
  }
  if (to.matched.some((record) => record.meta.requiredNonAuth)) {
    Auth.currentAuthenticatedUser()
      .then(() => {
        next({
          path: "/dashboard",
        })
      })
      .catch(() => {
        next()
      })
  }
  next()
})

export default router
