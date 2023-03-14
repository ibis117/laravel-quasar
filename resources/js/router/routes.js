
const routes = [
    { path: '/', component: () => import('../pages/DashboardPage.vue'), name: 'DashboardPage' },
    { path: '/brands', component: () => import('../pages/brand/BrandPage.vue'), name: 'BrandPage' },
    { path: '/login', component: () => import('../pages/auth/LoginPage.vue'), name: 'LoginPage' },

    { path: '/:catchAll(.*)*', component: () => import('../pages/ErrorNotFound.vue'), name : 'ErrorNotFound' },
]

export default routes;
