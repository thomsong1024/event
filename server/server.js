VendorServices = new Meteor.Collection("vendorservice");
if (Meteor.isServer) {
    Meteor.startup(function () {
		Meteor.publish("eventtypes", function() {
		    return EventTypes.find();
		});
		Meteor.publish("servicecategories", function() {
		  return ServiceCategories.find();
		});
		Meteor.publish("locations", function() {
		  return Locations.find();
		});
		Meteor.publish("eventList", function () {
		  return Events.find();
		});
		Meteor.publish("vendorservices", function () {
		  return VendorServices.find();
		});		
		Meteor.publish("vendors", function () {
		  return Vendors.find();
		});		
		Meteor.publish("requestQuote", function () {
		  return RequestQuote.find();
		});		
		Meteor.publish("messages", function () {
		  return Messages.find();
		});	
		Meteor.publish("quotationDetail", function () {
			return QuotationDetail.find();
		});	

		Meteor.methods({
		    createUserWithRole: function (obj, roles) {
			    id = Accounts.createUser(obj);		    	
			    Roles.addUsersToRoles(id, roles);
			    return id;
		    },
		    getVendor: function ( ){
		    	return Vendors.find().fetch();
		    },
    		sendEmail: function (to, from, subject, text, html) {
	            // Let other method calls from the same client start running,
	            // without waiting for the email sending to complete.

	            Email.send({
	                to: to,
	                from: from,
	                subject: subject,
	                text: text,
	                html: html
            	});
        	},
	        getEnv: function () {
	         return process.env.ROOT_URL;
	        },
	        updateUnreadMessages : function (id) {
	        	if (Roles.userIsInRole(Meteor.user(), ['vendor-user'])) {
					Messages.update({$or: [{_id: id}, {parents: id}]}, {$set: {vendorUnread: false}}, {multi: true});
					// Messages.update({_id: id}, {$set: {vendorUnread: false}});
					// Messages.update({parents: id}, {$set: {vendorUnread: false}});
	        	}
	        	else {
					Messages.update({$or: [{_id: id}, {parents: id}]}, {$set: {userUnread: false}}, {multi: true});
					// Messages.update({_id: id}, {$set: {userUnread: false}});
					// Messages.update({parents: id}, {$set: {userUnread: false}});	
	        	}
	        },
	        getUserName : function (userID) {
	        	var u = Meteor.users.findOne({_id: userID});
	        	return u.profile.firstname + " " + u.profile.lastname;
	        }
        });
		if (EventTypes.find().count() === 0) {
			EventTypes.insert({ type:'Birthday'});
			EventTypes.insert({ type:'Wedding'});
		}

		if (ServiceCategories.find().count() === 0) {
		    ServiceCategories.insert({ name:'Venue', parent: 0 });
			ServiceCategories.insert({ name:'Catering', parent: 0 });
			ServiceCategories.insert({ name:'Music', parent: 0 });
		}

		function createUserCallback (error){
			console.log(error);
		}
		// Meteor.publish("events", function() {
		//     return Events.find();
		// });	
	});
}