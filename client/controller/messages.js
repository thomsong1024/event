Template.messagesList.rendered = function () {
	$.timeliner({
		startOpen:['#19550828EX', '#19630828EX']
	});
	$.timeliner({
		timelineContainer: '#timelineContainer_2'
	});	
}

Template.messagesList.messageLists = function () {
	Session.set("messageList", "");
	Deps.autorun( function () {

		if(Meteor.user()) {
			if (Roles.userIsInRole(Meteor.user(), ['vendor-user'])) {
				var list = Messages.find({$and: [{vendorID: Meteor.users.findOne().profile.vendorID}, {parents: "0"}]});
			}
			else {
				var list = Messages.find({$and: [{userID: Meteor.userId()}, {parents: "0"}]});
			}
			if (list) {

				var objArray = [];
				list.forEach(function (item) {

					var obj = {};
					obj._id = item._id;
					obj.thumbnail = Vendors.findOne({_id: item.vendorID}).logoImage_thumbnail;
					obj.vendorName = Vendors.findOne({_id: item.vendorID}).vendorName;
					obj.dates = item.dates;
					obj.eventsName = Events.findOne({_id: item.eventID}).eventTitle;
					obj.serviceCategoryName = ServiceCategories.findOne({_id: item.categoryID}).name;

					var childMessages = getChildMessags(item._id);
					var lastItem = _.first(childMessages);
					var latestMessage = getLatestMessage(lastItem);


					if (latestMessage)
						obj.message = latestMessage;
					else
						obj.message = item.texts;

					if (item.mtype == "quotation")
						obj.message = "Quotation From Vendor.";

					obj.unread = "";
					if (lastItem){
						if (Roles.userIsInRole(Meteor.user(), ['vendor-user']) && lastItem.vendorUnread == true) {

							obj.unread = "warning";
						}
						else if(Roles.userIsInRole(Meteor.user(), ['normal-user']) && lastItem.userUnread == true) {
							obj.unread = "unread";	
						}

					}
					objArray.push(obj);
				});
				Session.set("messageList", objArray);

			}
		}

	});
	if (Session.get("messageList")) {
		return JSON.parse(JSON.stringify(Session.get("messageList")));
	}
}

Template.message.rendered = function () {
	$.timeliner({
		startOpen:['#19550828EX', '#19630828EX']
	});
	$.timeliner({
		timelineContainer: '#timelineContainer_2'
	});
}
Template.message.events({
	"click #addMessage" : function () {
		var messageText = document.getElementById("messageText").value;
		if (messageText) {
			var messageData = Messages.findOne({_id: Session.get("messageID")});
			var obj = {};
			obj.categoryID = messageData.categoryID;
			obj.dates = moment().unix();
			obj.eventID = messageData.eventID;
			obj.texts = messageText;
			obj.userID = messageData.userID;
			obj.vendorID = messageData.vendorID;
			obj.parents = Session.get("messageID");			
			if (Roles.userIsInRole(Meteor.user(), ['normal-user'])) {
				obj.userUnread = false;	
				obj.vendorUnread = true;
				obj.from = "user";
			}
			else {
				obj.userUnread = true;
				obj.vendorUnread = false;
				obj.from = "vendor";				
			}
			obj.mtype = "text";
			Messages.insert(obj);
		}
	}
});

// Template.message.bmessages = function (){
// 	var messages = Messages.find();
// 	// console.log(messages.fetch());
// 	var messageArray = [];
// 	messages.forEach( function (item) {
// 		// console.log(item);
// 		// console.log(Vendors.findOne({_id: item.vendorID}));
// 		var obj = {};
// 		obj._id = item._id;
// 		// console.log(Meteor.users.find().fetch());
// 		if (item.from == "user"){
// 			obj.name = Meteor.users.find().fetch()[0].profile.lastname + " " + Meteor.users.find().fetch()[0].profile.firstname
// 		}
// 		else {
// 			obj.name = Vendors.findOne({_id: item.vendorID}).vendorName;
// 			obj.logo = Vendors.findOne({_id: item.vendorID}).logoImage;
// 		}
// 		obj.dates = item.dates;
// 		obj.texts = item.texts;
// 		messageArray.push(obj);
// 	});
// 	return JSON.parse(JSON.stringify(messageArray));
// }