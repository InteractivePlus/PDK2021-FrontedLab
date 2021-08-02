export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
          {
            name: 'register',
            path: '/user/register',
            component: './user/Register',
          },

        ],
      },
      {
        component: './404',
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  
  {
    name: 'dashboard',
    icon: 'dashboard',
    path: '/dashboard',
    component: './Dashboard',
  },
  {
    path: '/app',
    icon: 'appstore',
    name: 'app',
    routes: [
      {
        name: 'AuthorizedApp',
        path: '/app/authorizedapp',
        component: './app/AuthorizedApp',
      },
      {
        name: 'CreatedApp',
        path: '/app/createdapp',
        component: './app/CreatedApp',
      },
    ],
  },
  {
    name: 'account.Settings',
    icon: 'user',
    path: '/accountsettings',
    component: './account/Settings',
  },
  
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
