import { createRouter, createWebHistory } from 'vue-router'
import AuthMiddleware from './Middleware/AuthMiddleware'

import DashboardView from '../Pages/Dashboard.vue';

import SettingRoutes from './settings';
import Login from '../Pages/Auth/Login.vue';

const router = createRouter({
	history: createWebHistory('/'),
	routes: [
		{ name: 'login', path: '/', component: Login, meta: { layout: 'Guest' } },
		{
			path: '/dashboard',
			name: 'dashboard',
			component: DashboardView,
		},
        ...SettingRoutes,
	],
})

router.beforeEach(AuthMiddleware)

export default router