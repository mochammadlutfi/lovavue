/*
 * Main and demo navigation arrays
 */

export default {
    'main': [
      {
        name: 'dashboard',
        to: '/dashboard',
        icon: 'mgc_home_3_line'
      },
      {
        name: 'settings',
        icon: 'mgc_settings_4_line ',
        subActivePaths: '/settings/',
        sub: [
            {
              name: 'system',
              to: '/settings/system'
            },
            {
              name: 'user',
              to: '/settings/user'
            },
            {
              name: 'role_permission',
              to: '/settings/permissions'
            },
            {
              name: 'branch',
              to: '/settings/branch'
            },
        ]
      },
    ],
  }
  