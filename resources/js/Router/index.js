import { createRouter, createWebHistory } from 'vue-router'
import AuthMiddleware from './Middleware/AuthMiddleware'

import DashboardView from '../Pages/Dashboard.vue';


import ProfileIndex from '../Pages/Profile/Index.vue';
import ProfileEdit from '../Pages/Profile/Edit.vue';
import ProfilePassword from '../Pages/Profile/Password.vue';
import ProfileDevice from '../Pages/Profile/Device.vue';

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
            meta : {
                requiredAuth : true,
                permission : 'dashboard_view',
            }
		},
        {
          path: '/profile/',
          name: 'profile',
          component: ProfileIndex,
          children : [
              {
                  path: '',
                  name: 'profile.edit',
                  component: ProfileEdit
              },
              {
                  path: 'password',
                  name: 'profile.password',
                  component: ProfilePassword
              },
              {
                  path: 'devices',
                  name: 'profile.device',
                  component: ProfileDevice
              },
          ]
        },
        ...SettingRoutes,
	],
})

router.beforeEach(AuthMiddleware);

export default router