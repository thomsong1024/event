isEventCreated = function () {
	if (Session.get("eventData") ) {
		return true;
	}
	else {
		return false;	
	}
}
isChecked = function (id, categories) {
	if (_.contains(categories, id)) {
		return true;
	}
	else {
		return false;
	}
}
isUserLoggedIn = function () {
	if (Meteor.user() == null) {
		return false;
	}
	else {
		return true;
	}
}
logoutCallback = function () {
	Router.go("/");
}
getIdfromHyperLink = function (link) {
	var data = link.split("_")[1];
	return data;
}
getLatestMessage = function (parent) {
	var message = Messages.findOne({parents: parent}, {sort: {dates: -1}});
	if (message){
		if (message.mtype == "quotation")
			return "Quotation From Vendor.";

		if (message)
			return message.texts;
		else 
			return "";
		
	}
}
getRootServiceFromChild = function (service) {
	var serviceData = ServiceCategories.findOne({_id: service});
	return serviceData.name;	
	// if (parent != "0") {
	// 	var rootService = ServiceCategories.findOne({_id: serviceData.parent});
	// 	if (rootService) {
	// 		return rootService.name;
	// 	}
	// }
	// else {
	// 	return serviceData.name;
	// }
	
}
