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
            name: 'signup',
            path: '/user/signup',
            component: './user/SignUp',
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
    name: 'app.AuthorizedApp',
    icon: '',
    path: '/authorizedapp',
    component: './app/AuthorizedApp',
  },
  {
    name: 'app.CreatedApp',
    icon: '',
    path: '/createdapp',
    component: './app/CreatedApp',
  },
  {
    name: 'account.BasicSettings',
    icon: '',
    path: '/basicsettings',
    component: './account/BasicSettings',
  },
  {
    name: 'account.SecuritySettings',
    icon: '',
    path: '/securitysettings',
    component: './account/SecuritySettings',
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];
