/*jshint esversion: 9 */
var routes = {
  admin: [
    {
      type: 0,
      key: "dashboard",
      path: "dashboard",
      link: "/dashboard",
      name: "sidebar.dashboard",
      icon: "icon icon-data-display",
      component: import('./Admin/Dashboard/index')
    },
    {
      type: 1,
      key: "orders",
      link: "/orders",
      path: "orders",
      name: "sidebar.orders",
      icon: "icon icon-revenue-new",
      component: import('./Admin/Orders/index'),
      children: [
        {
          type: 0,
          key: "orders",
          link: "/orders",
          path: "orders",
          name: "sidebar.orders.pending",
          icon: "icon icon-schedule",
          component: import('./Admin/Orders/index'),
          roles: ['admin']
        },
        {
          type: 0,
          key: "orders/closed",
          path: "orders/closed",
          link: "/orders/closed",
          name: "sidebar.orders.closed",
          icon: "icon icon-check-cricle",
          component: import('./Admin/Orders/index'),
          roles: ['admin']
        }
      ]
    },
    {
      type: 0,
      key: "clients",
      path: "clients",
      link: "/clients",
      name: "sidebar.clients",
      icon: "icon icon-company",
      component: import('./Admin/Clients/index'),
      roles: ['admin']
    },
    {
      type: 0,
      key: "vendors",
      path: "vendors",
      link: "/vendors",
      name: "sidebar.vendors",
      icon: "icon icon-company",
      component: import('./Admin/Vendors/index'),
      roles: ['admin']
    },
    {
      type: 1,
      key: "users",
      path: "users",
      link: "/users",
      name: "sidebar.users",
      icon: "icon icon-team",
      component: import('./Admin/Users/index'),
      roles: ['admin'],
      children: [
        {
          type: 0,
          key: "users/admins",
          link: "/users/admins",
          path: "users/admins",
          name: "sidebar.users.admins",
          icon: "icon icon-extra-components",
          component: import('./Admin/Users/admins/index'),
          roles: ['admin']
        },
        {
          type: 0,
          key: "users/others",
          path: "users/others",
          link: "/users/others",
          name: "sidebar.users.others",
          icon: "icon icon-avatar",
          component: import('./Admin/Users/others/index'),
          roles: ['admin']
        }
      ]
    },
    {
      type: 0,
      key: "profile",
      path: "profile",
      link: "/profile",
      name: "sidebar.profile",
      icon: "icon icon-profile",
      component: import('./Profile/index'),
      roles: ['admin','client','vendor']
    }
  ],
  client: [
    {
      type: 0,
      key: "dashboard",
      path: "dashboard",
      link: "/dashboard",
      name: "sidebar.dashboard",
      icon: "icon icon-data-display",
      component: import('./Client/Dashboard/index')
    },
    {
      type: 1,
      key: "orders",
      link: "/orders",
      path: "orders",
      name: "sidebar.orders",
      icon: "icon icon-revenue-new",
      component: import('./Client/Orders/index'),
      children: [
        {
          type: 0,
          key: "orders",
          link: "/orders",
          path: "orders",
          name: "sidebar.orders.pending",
          icon: "icon icon-schedule",
          component: import('./Client/Orders/index')
        },
        {
          type: 0,
          key: "orders/closed",
          path: "orders/closed",
          link: "/orders/closed",
          name: "sidebar.orders.closed",
          icon: "icon icon-check-cricle",
          component: import('./Client/Orders/index')
        }
      ]
    },
    {
      type: 0,
      key: "profile",
      path: "profile",
      link: "/profile",
      name: "sidebar.profile",
      icon: "icon icon-profile",
      component: import('./Profile/index'),
      roles: ['admin','client','vendor']
    }
  ],
  vendor: [
    {
      type: 0,
      key: "dashboard",
      path: "dashboard",
      link: "/dashboard",
      name: "sidebar.dashboard",
      icon: "icon icon-data-display",
      component: import('./Vendor/Dashboard/index')
    },
    {
      type: 0,
      key: "jobs",
      link: "/jobs",
      path: "jobs",
      name: "sidebar.jobs",
      icon: "icon icon-orders",
      component: import('./Vendor/Jobs/index')
    },
    {
      type: 0,
      key: "profile",
      path: "profile",
      link: "/profile",
      name: "sidebar.profile",
      icon: "icon icon-profile",
      component: import('./Profile/index'),
      roles: ['admin','client','vendor']
    }
  ]
};

// var routes = [
//   {
//     type: 0,
//     key: "dashboard",
//     path: "dashboard",
//     link: "/dashboard",
//     name: "sidebar.dashboard",
//     icon: "icon icon-data-display",
//     component: import('./Dashboard/index'),
//     roles: ['admin','client','vendor']
//   },
//   {
//     type: 1,
//     key: "orders",
//     link: "/orders",
//     path: "orders",
//     name: "sidebar.orders",
//     icon: "icon icon-revenue-new",
//     component: import('./Dashboard/index'),
//     roles: ['admin','client','vendor'],
//     children: [
//       {
//         type: 0,
//         key: "orders/pending",
//         link: "/orders/pending",
//         path: "orders/pending",
//         name: "sidebar.orders.pending",
//         icon: "icon icon-schedule",
//         component: import('./Dashboard/index'),
//         roles: ['admin']
//       },
//       {
//         type: 0,
//         key: "orders/closed",
//         path: "orders/closed",
//         link: "/orders/closed",
//         name: "sidebar.orders.closed",
//         icon: "icon icon-check-cricle",
//         component: import('./Dashboard/index'),
//         roles: ['admin']
//       }
//     ]
//   },
//   {
//     type: 0,
//     key: "clients",
//     path: "clients",
//     link: "/clients",
//     name: "sidebar.clients",
//     icon: "icon icon-company",
//     component: import('./Clients/index'),
//     roles: ['admin'],
//     children: [
//       {
//         type: 0,
//         key: "clients/all",
//         link: "/clients/all",
//         path: "clients/all",
//         name: "sidebar.clients.all",
//         icon: "icon icon-all-contacts",
//         component: import('./Dashboard/index'),
//         roles: ['admin']
//       },
//       {
//         type: 0,
//         key: "clients/new",
//         path: "clients/new",
//         link: "/clients/new",
//         name: "sidebar.clients.new",
//         icon: "icon icon-add-circle",
//         component: import('./Dashboard/index'),
//         roles: ['admin']
//       }
//     ]
//   },
//   {
//     type: 0,
//     key: "vendors",
//     path: "vendors",
//     link: "/vendors",
//     name: "sidebar.vendors",
//     icon: "icon icon-company",
//     component: import('./Vendors/index'),
//     roles: ['admin'],
//     children: [
//       {
//         type: 0,
//         key: "vendors/all",
//         link: "/vendors/all",
//         path: "vendors/all",
//         name: "sidebar.vendors.all",
//         icon: "icon icon-all-contacts",
//         component: import('./Dashboard/index'),
//         roles: ['admin']
//       },
//       {
//         type: 0,
//         key: "vendors/closed",
//         path: "vendors/closed",
//         link: "/vendors/closed",
//         name: "sidebar.vendors.new",
//         icon: "icon icon-add-circle",
//         component: import('./Dashboard/index'),
//         roles: ['admin']
//       }
//     ]
//   },
//   {
//     type: 1,
//     key: "users",
//     path: "users",
//     link: "/users",
//     name: "sidebar.users",
//     icon: "icon icon-team",
//     component: import('./Users/index'),
//     roles: ['admin'],
//     children: [
//       {
//         type: 0,
//         key: "users/admins",
//         link: "/users/admins",
//         path: "users/admins",
//         name: "sidebar.users.admins",
//         icon: "icon icon-extra-components",
//         component: import('./Users/admins/index'),
//         roles: ['admin']
//       },
//       {
//         type: 0,
//         key: "users/others",
//         path: "users/others",
//         link: "/users/others",
//         name: "sidebar.users.others",
//         icon: "icon icon-avatar",
//         component: import('./Users/others/index'),
//         roles: ['admin']
//       }
//     ]
//   },
//   {
//     type: 0,
//     key: "profile",
//     path: "profile",
//     link: "/profile",
//     name: "sidebar.profile",
//     icon: "icon icon-profile",
//     component: import('./Dashboard/index'),
//     roles: ['admin','client','vendor']
//   }
// ];

// function getRoutes(role) {
//     return routes[role];
// }
export default routes;
