/* Schema */
EventTypeSchema = new SimpleSchema({
  _id: {
      type: String,
      autoValue: function() {
          if (this.isInsert) {
            return Random.id();
        } 
    }    
  },
  type: {
     type: String,
     label: "Type of Event"
  }
});

EventsSchema = new SimpleSchema({
  _id: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return Random.id();
      } 
    }
  },
  eventTitle: {
    type: String,
    label: "Title of Event"
  },
  eventDescription: {
    type: String,
    label: "Description of Event"
  },
  eventTypes: {
    type: String,
    label: "Type of Event"
  }, 
  date: {
    type: String,
    label: "Event Date"
  },
  categories: {
    type: String,
    label: "Categories"
  },
  nog: {
    type: String,
    label: "Number of Guests"
  },
  eventPrice: {
    type: String,
    label: "Price"
  },
  eventDuration:{
    type: String,
    label: "Duration"
  },
  eventLocations: {
    type: String,
    label: "Event Duration"
  }
});

/* Events */
Events = new Meteor.Collection2("events", {
  smart: true,
  schema: EventsSchema
});

Events.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    console.log('Remove called');
    return true;
  },
  fetch: []
});

/* Event Types */
EventTypes = new Meteor.Collection2("eventtypes", {
	smart: true,
	schema: EventTypeSchema
});

EventTypes.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    console.log('Remove called');
    return true;
  },
  fetch: []
});


LocationSchema = new SimpleSchema({
 _id: {
    type: String,
    autoValue: function() {
        if (this.isInsert) {
            return Random.id();
	    } 
	}
 },
	 district : {
  	type : String
  },
	 city : {
  	type : String
  },
  citycode : {
  	type : String,
  	max : 3
  },
  country : {
  	type : String
  }
});



Locations = new Meteor.Collection2("locations" , {
	smart: true,
	schema: LocationSchema
});

Locations.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    console.log('Remove called');
    return true;
  },
  fetch: []
});


ServiceCategoriesSchema = new SimpleSchema({
  _id : {
   type: String,
   autoValue: function() {
         if (this.isInsert) {
            return Random.id();
	    } 
	}
  }, 	
  name : {
   	   type : String,
   	   label: "Sub-Category Name"
   } ,
   parent : {
   	    type : String,
   	    label: "Parent Category"
   },
   file: {
   		type: String,
   		label: "Upload File",
   		optional: true
   }
});

ServiceCategories = new Meteor.Collection2("servicecategories" ,{
	smart: true,
	schema : ServiceCategoriesSchema

});


ServicesSchema = new SimpleSchema({
  _id : {
   type: String,
   autoValue: function() {
         if (this.isInsert) {
            return Random.id();
      } 
  }
  },  
  serviceName : {
     type : String,
     label: "Name"  
   } ,
   briefDescription : {
      type : String,
      label: "Description"
   },
   nog: {
      type: Number,
      label : "Number of Guests"
   },
   categories: {
      type: String,
      label : "Categories"
   },   
   priceRange: {
      type: String,
      label : "Price Range"
   },
   eventType: {
      type: Object,
      label : "Event Type"
   },
   locations: {
      type: Object,
      label : "Locations"
   },
   vendorId: {
      type: String,
      label: "Vendor"
   }
});

// VendorServices = new Meteor.Collection2("vendorservice" ,{
//   smart: true,
//   schema : ServicesSchema
// });

// VendorServices.allow({
//   insert: function() {
//     return true;
//   },
//   update: function() {
//     return true;
//   },
//   remove: function() {
//     console.log('Remove called');
//     return true;
//   },
//   fetch: []
// });


VendorsSchema = new SimpleSchema({
  _id : {
   type: String,
   autoValue: function() {
         if (this.isInsert) {
            return Random.id();
      } 
  }
  },  
  vendorName : {
     type : String,
     label: "Name"  
   } ,
   companyEmail : {
      type : String,
      label: "Company Email"
   },
   vendorDescription: {
      type: String,
      label : "Description"
   },
   vendorBriefDescription: {
      type: String,
      label : "Brief Description"
   },   
   portfolioImage: {
      type: String,
      label : "Portfolio Image"
   },
   portfolioImage_thumbnail: {
      type: String,
      label : "Portfolio Thumbnail"
   },

   logoImage: {
      type: String,
      label : "Logo"
   },
   logoImage_thumbnail: {
      type: String,
      label : "Logo Thumbnail"
   },

   letterheadImage: {
      type: String,
      label : "Letterhead Image"
   },

   letterheadImage_thumbnail: {
      type: String,
      label : "Letterhead Thumbnail"
   },
  locations: {
      type: String,
      label : "Locations"
   }
});

Vendors = new Meteor.Collection2("vendors" ,{
  smart: true,
  schema : VendorsSchema
});

Vendors.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    console.log('Remove called');
    return true;
  },
  fetch: []
});


RequestQuoteSchema = new SimpleSchema({
  _id : {
   type: String,
   autoValue: function() {
         if (this.isInsert) {
            return Random.id();
      } 
    }
  },  
  eventID : {
     type : String,
     label: "Event ID"  
   },
  vendorID : {
     type : String,
     label: "Vendor ID"  
   },
   activeService : {
      type : String,
      label: "Active Service"
   },
   vendorServiceID : {
      type : String,
      label: "VendorService ID"    
   },
   userID : {
      type : String,
      label: "User ID"    
   }   
});

RequestQuote = new Meteor.Collection2("requestQuote", {
  smart: true,
  schema: RequestQuoteSchema
});

RequestQuote.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    console.log('Remove called');
    return true;
  },
  fetch: []
});

QuotationDetailSchema = new SimpleSchema({
  _id : {
   type: String,
   autoValue: function() {
         if (this.isInsert) {
            return Random.id();
      } 
    }
  },  
  requestQuoteID : {
     type : String,
     label: "RequestQuote ID"  
   },
   detail : {
      type : String,
      label: "Quotation"
   }   
});

QuotationDetail = new Meteor.Collection2("QuotationDetail", {
  smart: true,
  schema: QuotationDetailSchema
});

QuotationDetail.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    console.log('Remove called');
    return true;
  },
  fetch: []
});

MessageSchema = new SimpleSchema({
  _id : {
   type: String,
   autoValue: function() {
         if (this.isInsert) {
            return Random.id();
      } 
    }
  },  
  userID : {
     type : String,
     label: "User ID"  
   },
  vendorID : {
     type : String,
     label: "Vendor ID"  
   },
   texts : {
      type : String,
      label: "Text"
   },
   eventID : {
      type : String,
      label: "event ID"
   },
   categoryID : {
      type : String,
      label: "Category ID"
   }, 
   from : {
      type : String,
      label: "From"
   },
   attachment : {
      type : String,
      label: "Attachment ID",
      optional: true
   },   
   dates : {
      type : String,
      label: "Date"
   },
   parents: {
      type : String,
      label: "Parent"    
   },
   userUnread: {
      type: Boolean,
      label: "User Read"
   },
   vendorUnread: {
      type: Boolean,
      label: "Vendor Read"
   },
   mtype: {
      type: String,
      label: "Type"
   }
});

Messages = new Meteor.Collection2("messages", {
  smart: true,
  schema: MessageSchema
});

Messages.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    console.log('Remove called');
    return true;
  },
  fetch: []
});

    