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
getLatestMessage = function (message) {

	if (message)
	{
		if (message.mtype == "quotation")
			return "Quotation From Vendor.";
		else 
			return message.texts;
	}

	return "";
}

//check unread Messages which have parent of item.

getChildMessags = function (parent) {
	var messages = Messages.find({parents: parent}, {sort: {dates: -1}}).fetch();
	if(messages)
		return messages;
	
}

checkUnreadMessages = function (messages) {
	console.log(messages);
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
