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

if (EventTypes.find().count() === 0) {
	EventTypes.insert({ type:'Birthday'});
	EventTypes.insert({ type:'Wedding'});
}

if (ServiceCategories.find().count() === 0) {
    ServiceCategories.insert({ name:'Venue', parent: 0 });
		ServiceCategories.insert({ name:'Catering', parent: 0 });
		ServiceCategories.insert({ name:'Music', parent: 0 });
}

// Meteor.publish("events", function() {
//     return Events.find();
// });	