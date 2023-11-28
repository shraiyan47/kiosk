const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home',
    },
    {
      title: 'User',
      path: '/users',
      icon: 'tabler:user',
    },
    {
      title: 'Weekly Duch',
      path: '/weekly-duch',
      icon: 'tabler:text-wrap-disabled',
    },
    {
      title: 'Setup',
      icon: 'tabler:settings',
      children: [
        {
          title: 'Master Data',
          icon: 'tabler:layout-grid',
          path: '/masterdata',
        }
      ]
    },
    {

      title: 'Second Page',
      path: '/second-page',
      icon: 'tabler:mail',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'tabler:shield',
    }
  ]
}

export default navigation
