const navigation = () => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'clarity:dashboard-line',
      action: 'read',
      subject: 'dashboard'
    },
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home',
      action: 'read',
      subject: 'home-page'
    },
    
    {
      title: 'User',
      path: '/users',
      icon: 'tabler:user',
      action: 'read',
      subject: 'users'
    },
    {
      title: 'Weekly Duch',
      path: '/weekly-duch',
      icon: 'tabler:text-wrap-disabled',
      action: 'read',
      subject: 'weekly-duch'
    },
    {
      path: '/programs',
      action: 'read',
      subject: 'programs-page',
      icon: 'material-symbols:energy-program-saving-outline',
      title: 'Programs'
    },
    {
      title: 'Setup',
      icon: 'tabler:settings',
      children: [
        {
          title: 'Master Data',
          icon: 'tabler:layout-grid',
          path: '/masterdata',
          action: 'read',
          subject: 'masterdata'
        },
        {
          title: 'Week Manage',
          icon: 'tabler:layout-grid',
          path: '/setting/sessionWeek',
          action: 'read',
          subject: 'session-week'
        },
        {
          title: 'Section',
          icon: 'tabler:layout-grid',
          path: '/section',
          action: 'read',
          subject: 'section'
        },
        {
          title: 'Bonus Section',
          path: '/second-page',
          icon: 'tabler:smart-home',
          action: 'read',
          subject: 'second-page'
        }
      ]
    }
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   icon: 'tabler:shield',
    //   title: 'Access Control'
    // },
  ]
}

export default navigation
