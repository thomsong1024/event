Router.configure({
  layout: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'not_found'
});

Router.map(function () {
  this.route('start', {
    path: '/',
  });

  this.route('dashboard', {
    path: '/dashboard',
      template: 'dashboard',
  });
  // this.route('dashboard', {
  //   path: '/dashboard',
  //     template: 'dashboard',
  // });
  this.route('admin', {
      path: '/admin',
      template: 'ServiceAdmin',
  });
  this.route('adminEventType', {
      path: '/admin/eventType',
      template: 'eventTypes',
  });  
  this.route('adminLocations', {
      path: '/admin/location',
      template: 'adminLocations',
  });   
  // why is this necessary when notFoundTemplate is
  // set in Router.configure?
  this.route('*', {
    template: 'not_found'
  });
});
