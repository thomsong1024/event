
if (Meteor.isClient) {
  Meteor.startup(function () {
    Router.configure({
      layoutTemplate: 'layout',
      yieldTemplates: {
          'header': { to: 'header' }
      },
      loadingTemplate: 'loading',
      notFoundTemplate: 'not_found'
    });

    Router.map(function () {
      this.route('home', {
        path: '/',
        template: 'home'
      });
      this.route('dashboard', {
        path: '/dashboard',
          template: 'dashboard',
      });
      this.route('user.signup', {
        path: '/signup',
          template: 'signup',
      });
      this.route('user.login', {
        path: '/login',
          template: 'login',
      });           
      this.route('events', {
        path: '/events/:_id',
        template: 'events',
        data: function(){
          // console.log(Events.findOne({_id: this.params._id}));
          var data = Events.findOne({_id: this.params._id});
          if (data != undefined) {
            return data;  
          }
        },
        WaitOn: function () {
          return Meteor.subscribe("eventLists");
        },
        unload: function () {
          Session.set("activeEvents", null);
        },
        after: function () {
          Session.set("activeEvents", this.params._id);
        }
      });
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
      this.route('user.vendor', {
          path: '/vendor',
          template: 'eventList',
      });      
      // why is this necessary when notFoundTemplate is
      // set in Router.configure?
      this.route('*', {
        template: 'not_found'
      });
    });
  });
}

