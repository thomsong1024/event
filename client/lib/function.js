isEventCreated = function () {
	if (Session.get("eventData") ) {
		return true;
	}
	else {
		return false;	
	}
}
isChecked = function (id) {
	if (Session.get("eventData").categories) {
		if (_.contains(Session.get("eventData").categories, id)) {
			return true;
		}
		else {
			return false;
		}
	}
}