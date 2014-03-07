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