
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
      this.route('vendor.eventDetail', {
          path: '/eventDetail/:_id',
          template: 'vendorEventsList',
          data: function(){
            var request = RequestQuote.findOne({_id: this.params._id});
            if (request) {
              var service = getRootServiceFromChild(request.activeService);
              // console.log(service);
              var data = Events.findOne({_id: request.eventID});
              if (data != undefined) {
                data.service = service;
                return data;  
              }
            }
          },       
          after: function () {
            Session.set("activeEvents", this.params._id);
            var vendorId = Meteor.users.findOne();
            if (vendorId != undefined) {
              Session.set("vendorID", vendorId.profile.vendorID);
            }
          },
          unload: function () {
            Session.set("activeEvents", null);
          },
          waitOn: function () {
            Meteor.subscribe("reponseList");
          }
      });      
      this.route('vendor.events', {
          path: '/vendor',
          template: 'eventList',
          after: function () {
            Meteor.subscribe("reponseList")
            var vendorId = Meteor.users.findOne();
            if (vendorId != undefined) {
              Session.set("vendorID", vendorId.profile.vendorID);
            }
          },
          waitOn: function () {
            return Meteor.subscribe("reponseList");
          }          
      });  
      // this.route('vendor.detail', {
      //     path: '/viewrequest',
      //     template: 'vendorEventDetail'       
      // });          
      // why is this necessary when notFoundTemplate is
      // set in Router.configure?
      this.route('*', {
        template: 'not_found'
      });
    });
  });
}

