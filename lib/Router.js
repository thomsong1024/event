
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
        template: 'home',
        waitOn: function () {
          Meteor.subscribe("messages");
        }
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
        template: 'login'
      });      

      this.route("eventList", {
        path: '/events',
        template: "eventsList"
      })
      this.route('events', {
        path: '/events/:_id',
        template: 'eventsDetail',
        data: function(){
          // console.log(Events.findOne({_id: this.params._id}));
          var data = Events.findOne({_id: this.params._id});
          if (data != undefined) {            
            return data;  
          }
        },
        waitOn: function () {
          Meteor.subscribe("eventLists");
          Meteor.subscribe("requestQuote");
          Meteor.subscribe("vendors");
          Meteor.subscribe("quotationDetail");
        },
        onStop: function () {
          Session.set("activeEvents", null);
        },
        onAfterAction: function () {
          Session.set("activeEvents", this.params._id);
        }
      });
      this.route('admin', {
          path: '/admin',
          template: 'ServiceAdmin'
      });
      this.route('adminEventType', {
          path: '/admin/eventType',
          template: 'eventTypes'
      });  
      this.route('adminLocations', {
          path: '/admin/location',
          template: 'adminLocations'
      });
      this.route('messages', {
          path: '/ms',
          template: 'messagesList',
          waitOn : function () {
            Meteor.subscribe("messages");
          }
      });
      this.route('messages.detail', {
          path: '/ms/:_id',
          template: 'message',
          waitOn : function () {
            Session.set("messageID", this.params._id)
            Meteor.subscribe("messages");
          },
          data: function(){
              var messages = Messages.find({$or: [{_id: this.params._id}, {parents: this.params._id}]});
              var messageArray = [];
              messages.forEach( function (item) {
                var obj = {};
                obj._id = item._id;
                console.log(item.from);
                if (item.from == "user"){
                  Meteor.call("getUserName",  item.userID, function (error, result) {
                    if (result)
                      Session.set("normalUserName", result);
                  });
                  obj.name = Session.get("normalUserName");
                }
                else {
                  obj.name = Vendors.findOne({_id: item.vendorID}).vendorName;
                  obj.logo = Vendors.findOne({_id: item.vendorID}).logoImage;
                }
                obj.dates = item.dates;
                obj.texts = item.texts;
                obj.mtype = item.mtype;
                if (item.mtype == "quotation"){
                  var htmlMessage = JSON.parse(obj.texts);
                  obj.texts = htmlMessage;
                }                
                messageArray.push(obj);
              });
              var data = {};
              data.bmessages = JSON.parse(JSON.stringify(messageArray));
              return data;              
          },
          action: function () {
            Meteor.call("updateUnreadMessages", this.params._id );
            this.render();
          }
      });      

      this.route('vendor.eventDetail', {
          path: '/eventDetail/:_id',
          template: 'vendorEventsList',
          data: function(){
            var request = RequestQuote.findOne({_id: this.params._id});
            if (request) {
              Session.set("activeService", request.activeService);
              var service = getRootServiceFromChild(request.activeService);
              // console.log(service);
              var data = Events.findOne({_id: request.eventID});
              if (data != undefined) {
                data.service = service;
                // console.log(data);
                return data;  
              }
            }
          },       
          onAfterAction: function () {
            Session.set("requesetQuoteID", this.params._id);
            var vendorId = Meteor.users.findOne();
            if (vendorId != undefined) {
              Session.set("vendorID", vendorId.profile.vendorID);
            }
          },
          onStop: function () {
            Session.set("activeEvents", null);
          },
          waitOn: function () {
            Meteor.subscribe("requestQuote");
            Meteor.subscribe("messages");
            Meteor.subscribe("quotationDetail");
          }
      });

      this.route('vendor.events', {
          path: '/vendor',
          template: 'eventList',
          onAfterAction: function () {
            var vendorId = Meteor.users.findOne();
            if (vendorId != undefined) {
              Session.set("vendorID", vendorId.profile.vendorID);
            }
          },
          waitOn: function () {
            return Meteor.subscribe("requestQuote");
          }          
      });  
      this.route('*', {
        template: 'not_found'
      });
    });
  });
}

