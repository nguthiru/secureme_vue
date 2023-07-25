import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import LoginView from "../views/auth/LoginView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import DashView from "../views/DashboardView.vue";
import VerifyEmailView from "../views/auth/VerifyEmail.vue";
import PassResetEmailView from "../views/auth/ResetPassEmail.vue";
import PassResetCodeView from "../views/auth/VerifyPassEmail.vue";
import PasswordResetView from "../views/auth/PasswordReset.vue";
import ApprovalView from "../views/auth/ApprovalView.vue";
import PoliceView from "../views/police/HomeView.vue";
import DataEntryView from "../views/police/DataEntry.vue";
import AnalyticsView from "../views/analytics/AnalyticsView.vue";
import HotspotView from "../views/analytics/HotspotView.vue";
import NetworkView from "../views/analytics/NetworkView.vue";
import NetworkExplorer from "../views/analytics/network/NetworkExplorer.vue";
import NetworkExplorerDetail from "../views/analytics/network/NetworkExplorerDetail.vue";
import TimeView from "../views/analytics/time_analysis/TimeAnalysis.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthView,
    children: [
      {
        path: "register/",
        name: "register",
        component: RegisterView,
      },
      {
        path: "login/",
        name: "login",
        component: LoginView,
      },
      {
        path: "email/verify/",
        name: "verify_email",
        component: VerifyEmailView,
        props: true,
      },
      {
        path: "password/reset/email",
        name: "password_reset_email",
        component: PassResetEmailView,
      },
      {
        path: "password/reset/code",
        name: "password_reset_code",
        component: PassResetCodeView,
      },
      {
        path: "password/reset/code/:token",
        name: "password_reset",
        component: PasswordResetView,
        props: true,
      },
      {
        path: "approval/request",
        name: "approval_request",
        component: ApprovalView,
      },
    ],
  },
  {
    path: "/police",
    name: "police_view",
    component: PoliceView,
    children: [
      {
        path: "",
        redirect: { name: "police_data_entry" },
      },
      {
        path: "data/",
        name: "police_data_entry",
        component: DataEntryView,
      },
    ],
  },
  {
    path: "/analytics",
    name: "analytics_view",
    component: AnalyticsView,
    children: [
      {
        path: "",
        redirect: { name: "hotspot_view" },
      },
      {
        path: "hotspot/",
        name: "hotspot_view",
        component: HotspotView,
      },
      {
        path: "time/",
        name: "time_view",
        component: TimeView,
      },
      {
        path: "network/",
        name: "network_view",
        component: NetworkView,

        children: [
          {
            path: "explore/",
            name: "network_explorer",
            component: NetworkExplorer,
          },
          {
            path: "explore/:id",
            name: "network_explorer_detail",
            component: NetworkExplorerDetail,
            props: true,
          },
        ],
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
