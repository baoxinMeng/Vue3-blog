import { createRouter, createWebHistory } from "vue-router";

// 路由表，根据路径匹配组建
const routes = [
    {path: "/", component: () => import("@/views/index.vue")},
    {path: "docs", component: () => import("@/views/docs/index.vue")},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;