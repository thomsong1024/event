isEventCreated = function () {
	if (Session.get("eventData") ) {
		return true;
	}
	else {
		return false;	
	}
}
isChecked = function (id, categories) {
	console.log(categories);
	console.log(id);
	if (_.contains(categories, id)) {
		return true;
	}
	else {
		return false;
	}
}