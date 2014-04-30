Template.header.events({
  "click #logout" : function () {
    Meteor.logout(logoutCallback);
  }
});


Template.layout.events({
	"click #logo" : function () {
		Router.go("/dashboard");
	},
	"click #events": function () {
		Router.go("/events");
	}
})