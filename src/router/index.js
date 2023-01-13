import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "root",
    component: () => import("../views/LoginPage.vue")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomePage.vue"),
    children: [
      {
        path: "/order",
        name: "order",
        component: () => import("../components/MakeOrder.vue"),
        children: [
          {
            path: "/order/:restaurant",
            name: "listFood",
            component: () => import("../components/DropdownFood.vue"),
          }
        ]
      },
      {
        path: "/myorders",
        name: "myorders",
        component: () => import("../components/MyOrders.vue"),
      },
      {
        path: "/checkout/:restaurant",
        name: "checkout",
        component: () => import("../components/Checkout.vue"),
      },
      {
        path: "/help",
        name: "help",
        component: () => import("../components/HelpSection.vue")
      },
      {
        path: "/paymentOptions",
        name: "paymentOptions",
        component: () => import("../components/MyPaymentSystems.vue")
      }
    ],
  },
  
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
  scrollBehavior() {
    document.getElementById("app").scrollIntoView();
  },
});

export default router;