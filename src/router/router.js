import { createWebHistory, createRouter } from "vue-router";
import EnterCode from "../page/EnterCode.vue";
import PhoneNumber from "../page/PhoneNumber.vue";
import WelcomePage from "../page/WelcomePage.vue";

const routes = [
  {
    path: "/",
    component: WelcomePage,
  },
  {
    path: "/PhoneNumber",
    component: PhoneNumber,
  },
  {
    path: "/EnterCode",
    component: EnterCode,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
