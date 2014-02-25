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

  this.route('admin', {
      path: '/admin',
      template: 'ServiceAdmin',
      });
  
  
  // why is this necessary when notFoundTemplate is
  // set in Router.configure?
  this.route('*', {
    template: 'not_found'
  });
});
