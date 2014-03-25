Template.signup.events({
	"submit" : function (e){
		e.preventDefault();
		var obj = {};
		obj.profile = {};

		obj.username = username.value;
		obj.email = email.value;
		obj.password = password.value;
		
		obj.profile.firstname = firstname.value;
		obj.profile.lastname = lastname.value;
		obj.profile.telno = telno.value;
		var roles = ["normal-user"];
		// console.log(Accounts); return false;
		Meteor.call("createUserWithRole", obj, roles, function ( error, result ){
			if (error) {
				console.log(error);
			}
			else {
				Router.go('/login'); 
			}
		});
		// Accounts.createUser(obj, createUserCallback);
	}
});

Template.login.events({
	"submit" : function ( e ){
		e.preventDefault();
		var user_mail = email.value;
		var user_password = password.value;
	    Meteor.loginWithPassword(user_mail, user_password, function (err) {
	        if (err) { 
	            setTimeout(function(){
	                var message = "Your mail address or password is incorrect.";
	                FlashMessages.sendError(message, { hideDelay: 3500 });
	            },1500);

	        }
	        else {
	        	// console.log(Meteor.user().emails[0].address.trim())
	        	if (Meteor.user().emails[0].address.trim() == "adminservice@gmail.com") {
	        		Router.go("/admin");
	        		return true;
	        	}
	        	// console.log(Meteor.userId());
	        	if (Roles.userIsInRole(Meteor.user(), ['normal-user'])) {
	        		Session.set("userType", "event-user");
	        		Router.go('/dashboard'); 
	        	}
	        	else if (Roles.userIsInRole(Meteor.user(), ['vendor-user'])) {
	        		Session.set("userType", "vendor-user");
					Router.go('/vendor'); 
	        	}
	        	else {
	        		Router.go("/admin");
	        	}
	            
	        }
	    });		
	}
});
function createUserCallback(error) {
	console.log(error);
}