import { createRouter, createWebHistory } from 'vue-router'
// there is also createWebHashHistory and createMemoryHistory

import routes from "./routes";

const Router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

export default Router;
