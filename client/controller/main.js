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

});

Template.home.rendered = function () {

	// check user Role and redirect to admin page if user is just admin one 

	Deps.autorun( function () {
		if (Meteor.user()) {

			if (Roles.userIsInRole(Meteor.user(), ['admin-user']))

				Router.go("/admin");

			else if (Roles.userIsInRole(Meteor.user(), ['normal-user']))

				Router.go("/dashboard");		

			else if(Roles.userIsInRole(Meteor.user(), ['vendor-user']))

				Router.go("/vendor");					
		}

	});
}