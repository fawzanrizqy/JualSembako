import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RequestView from "../views/RequestView.vue";
import ItemView from "../views/ItemView.vue";
import ItemLogView from "../views/ItemLogView.vue";
import ItemAddView from "../views/ItemAddView.vue";
import ItemEditView from "../views/ItemEditView.vue";
import PurchaseView from "../views/PurchaseView.vue";
import SalesView from "../views/SalesView.vue";
import TransactionView from "../views/TransactionView.vue";
import TransactionDetailView from "../views/TransactionDetailView.vue";
import TransactionAddView from "../views/TransactionAddView.vue";
import PurchaseAddView from "../views/PurchaseAddView.vue";
import PurchaseDetailView from "../views/PurchaseDetailView.vue";
import UserView from "../views/UserView.vue";
import UserNewView from "../views/UserNewView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      children: [
        {
          path: "requests",
          name: "request",
          component: RequestView,
        },
      ],
    },
    {
      path: "/users",
      name: "users",
      component: UserView,
      children: [
        {
          path: "add",
          name: "userAdd",
          component: UserNewView,
        },
      ],
    },
    {
      path: "/items",
      name: "items",
      component: ItemView,
      children: [
        {
          path: "log/:itemId",
          name: "logs",
          component: ItemLogView,
        },
        {
          path: "edit/:itemId",
          name: "edit",
          component: ItemEditView,
        },
        {
          path: "add",
          name: "add",
          component: ItemAddView,
        },
      ],
    },
    {
      path: "/purchases",
      name: "purchase",
      component: PurchaseView,
      children: [
        {
          path: "detail/:id",
          name: "purchaseDetail",
          component: PurchaseDetailView,
        },
      ],
    },
    {
      path: "/purchases/add",
      name: "purchaseAdd",
      component: PurchaseAddView,
    },
    {
      path: "/sales",
      name: "sales",
      component: SalesView,
    },
    {
      path: "/sales/:id",
      name: "transaction",
      component: TransactionView,
      children: [
        {
          path: ":detailId",
          name: "transactionDetail",
          component: TransactionDetailView,
        },
      ],
    },
    {
      path: "/transactions-add/:id",
      name: "transactionAdd",
      component: TransactionAddView,
    },
  ],
});

router.beforeEach(async (to, from) => {
  if (to.name === "login" && localStorage.getItem("access_token")) {
    return { name: "home" };
  }

  if (
    to.name !== "login" &&
    to.name !== "request" &&
    !localStorage.getItem("access_token")
  ) {
    return { name: "login" };
  }
});

export default router;
