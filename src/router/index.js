import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/Product/DashboardView.vue";
import CreateProductView from "../views/Product/CreateProductView.vue";
import EditProductView from "../views/Product/EditProductView.vue";
import store from "../store";
const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/product/create",
    name: "CreateProduct",
    component: CreateProductView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/product/edit/:id",
    name: "EditProduct",
    component: EditProductView,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && store.getters.getToken == 0) {
    return {
      name: "Login",
    };
  }
  if (to.meta.requiresAuth == false && store.getters.getToken != 0) {
    return {
      name: "Dashboard",
    };
  }
});

export default router;
