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
		Meteor.publish("reponseList", function () {
		  return RequestQuote.find();
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