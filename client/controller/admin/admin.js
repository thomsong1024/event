VendorServices = new Meteor.Collection("vendorservice");
Template.ServiceCateogiesTp.events( {
    'change input[type="file"]': function(ev, template) {
    	ev.preventDefault();
    	var file = document.getElementById('file').files[0];
        if (file != undefined ) {
            fileType = file.type;
            reader = new FileReader();
            reader.onload = function(e) {
                var image = new Image();
                    image.src = reader.result;
                image.onload = function() {
                    var maxWidth = 100,
                        maxHeight = 100,
                        imageWidth = image.width,
                        imageHeight = image.height;

                    if (imageWidth > imageHeight) {
                        if (imageWidth > maxWidth) {
                          imageHeight *= maxWidth / imageWidth;
                          imageWidth = maxWidth;
                        }
                    }
                    else {
                        if (imageHeight > maxHeight) {
                          imageWidth *= maxHeight / imageHeight;
                          imageHeight = maxHeight;
                        }
                    }

                    var canvas = document.createElement('canvas');
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;

                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
                    var finalFile = canvas.toDataURL(fileType);

                    Session.set("cat_img", e.target.result);
                    Session.set("cat_thumbnail", finalFile);
                    
                    // Quick test to verify upload: Update an image on the page with the data
                    $(template.find('img')).attr('src', finalFile);
                }           
            
            }
            reader.readAsDataURL(file);
        }
    },
    "submit": function (e) {
        e.preventDefault();
        var name = document.getElementById("categoryName").value;
        var parent = document.getElementById("catParent").value;
        ServiceCategories.insert({name: name, parent: parent});
    }
});

Template.ServiceCateogiesTp.rendered = function () {

    var rootCategories = ServiceCategories.find({parent:"0"}).fetch();
    var categoriesObjArray = [{value: "0", text: "Main Category"}];
    rootCategories.forEach( function (item) {
        var obj = {};
        obj.value = item._id;
        obj.text = item.name;
        categoriesObjArray.push(obj);
    });
    $('#serviceCategoryTable').editable({
        selector: '.editable-select',
        value: 2,
        source:categoriesObjArray,
        success: function (response, newValue) {
            var id = $(this).attr("data-id");
            ServiceCategories.update({_id: id}, {$set: {parent: newValue}});
        }
    });


    $('#serviceCategoryTable').editable({
      selector: '.editable-click',
      success: function (response, newValue) {        
        var id = $(this).attr("data-id");
        EventTypes.update({_id: id}, {$set:{type: newValue}});
      }
    });    
}

Template.ServiceCateogiesTp.serviceCategories = function () {

    var data = ServiceCategories.find();
    var categoriesObjArray = [];
      data.forEach( function (item) {
        var obj = {};
          obj._id = item._id;
          obj.name = item.name;
          if(item.parent == "0") {
            obj.parents = "Main Category";
          }
          else {
            obj.parents = ServiceCategories.findOne({_id: item.parent}).name;
          }
          categoriesObjArray.push(obj);
      });
      return JSON.parse(JSON.stringify(categoriesObjArray));    
    
    // categoreis.forEach( function (item) {        
    //     var parent = ServiceCategories.find();
    // });
    // return ServiceCategories.find().fetch();
    // console.log(VendorServices);
}
Template.eventTypeTable.rendered = function () {

   $('#eventTypeTable').editable({
      selector: '.editable-click',
      success: function (response, newValue) {        
        var id = $(this).attr("data-id");
        EventTypes.update({_id: id}, {$set:{type: newValue}});
      }
    });

}


Template.eventTypeTable.events({

    "click #add" : function () {
        var newEvent = document.getElementById("newEventType").value;
        var obj = {};
        obj.type = newEvent;
        var id = EventTypes.insert(obj);
    },
    "click .delete" : function (e) {
        var id = e.currentTarget.id;
        var message = "Are you sure?";
        bootbox.confirm(message, function (result) {
            if (result == true)
                EventTypes.remove({_id: id});
        });
    }

});


Template.LocationsTable.events({

    "submit": function (e) {
        e.preventDefault();
        var obj = {};
        obj.city = document.getElementById("newCity").value;
        obj.citycode = document.getElementById("newCityCode").value;
        obj.country = document.getElementById("newCountry").value;
        obj.district = document.getElementById("newDistrict").value;
        var id = Locations.insert(obj);
    },
    "click .delete" : function (e) {
        var id = e.currentTarget.id;
        var message = "Are you sure?";
        bootbox.confirm(message, function (result) {
            console.log(id);
            if (result == true)
                Locations.remove({_id: id});
        });
    }

});

Template.LocationsTable.rendered = function () {
    // alert("1");
    $('#eventLocationTable').editable({
      selector: '.editable-click',
      success: function (response, newValue) {        
        var id = $(this).attr("data-id");
        var field = $(this).attr("data-field");
        var $set = {};
        $set[field] = newValue;

        Locations.update({_id: id}, { $set: $set });
        // Locations.update({_id: id}, { $set: $set });
        // EventTypes.update({_id: id}, {$set:{type: newValue}});
      }
    });

}


Template.LocationsTable.eventLocations = function () {
    return Locations.find().fetch();
}

Template.CreateVendorUser.events({

    "submit": function (e) {
        e.preventDefault();
        var obj = {};
        obj.profile = {};

        obj.username = username.value;
        obj.email = email.value;
        obj.password = password.value;
        
        obj.profile.firstname = firstname.value;
        obj.profile.lastname = lastname.value;
        obj.profile.telno = telno.value;
        obj.profile.vendorID = vendors.value;
        var roles = ["vendor-user"];
        // console.log(Accounts); return false;
        Meteor.call("createUserWithRole", obj, roles, function ( error, result ){
            if (error) {
                console.log(error);
            }
            else {
                Router.go('/login'); 
            }
        });        
    }
});

Template.createVendorService.events({
    "submit" : function (e) {
        e.preventDefault();
        var obj = {};
        obj.serviceName = serviceName.value;
        obj.briefDescription = briefDescription.value;
        obj.nog = parseFloat(nog.value);
        var checked = [];
        $("input[name='categories[]']:checked").each( function ( ){
          checked.push($(this).val());
        });
        obj.categories = checked;

        var eventTypes = [];

        $("input[name='eventTypes[]']:checked").each( function ( ){
          eventTypes.push($(this).val());
        });

        obj.eventType = eventTypes;
        obj.priceRange = priceRange.value;

        var eventLocations = [];

        $("input[name='locations[]']:checked").each( function ( ){
          eventLocations.push($(this).val());
        });
        obj.locations = eventLocations;

        obj.vendorId = vendorData.value;
        // console.log(VendorServices); return false;
        var id = VendorServices.insert(obj, function (error, result) {
            console.log(error);
        });
        if (id) {
            var message = "You have created new Services. Thanks";
            FlashMessages.sendSuccess(message, { hideDelay: 3500 });            
        }
    }
});

Template.CreateVendor.events({
    'change .imageUploader': function(ev, template) {
        ev.preventDefault();
        // console.log(ev); return false;
        var id = ev.target.attributes.id.nodeValue;
        var file = document.getElementById(id).files[0];
        if (file != undefined ) {
            fileType = file.type;
            reader = new FileReader();
            reader.onload = function(e) {
                var image = new Image();
                    image.src = reader.result;
                image.onload = function() {
                    var maxWidth = 100,
                        maxHeight = 100,
                        imageWidth = image.width,
                        imageHeight = image.height;

                    if (imageWidth > imageHeight) {
                        if (imageWidth > maxWidth) {
                          imageHeight *= maxWidth / imageWidth;
                          imageWidth = maxWidth;
                        }
                    }
                    else {
                        if (imageHeight > maxHeight) {
                          imageWidth *= maxHeight / imageHeight;
                          imageHeight = maxHeight;
                        }
                    }

                    var canvas = document.createElement('canvas');
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;

                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
                    var finalFile = canvas.toDataURL(fileType);

                    Session.set(id, e.target.result);
                    Session.set(id+"_thumbnail", finalFile);
                    
                    // Quick test to verify upload: Update an image on the page with the data
                    if (id == "portfolioImage")
                        $("#portfolioPrinter").attr("src", finalFile);
                    else if(id == "logoImage")
                        $("#logoPrinter").attr("src", finalFile);
                    else if(id == "letterheadImage")
                        $("#letterheadPrinter").attr("src", finalFile);
                }           
            }
            reader.readAsDataURL(file);

        }
    },
    "submit" : function (e) {
        e.preventDefault();
        var obj = {};
        obj.vendorName      = vendorName.value;
        obj.companyEmail   = companyEmail.value;
        obj.vendorDescription   = vendorDescription.value;
        obj.vendorBriefDescription   = vendorBriefDescription.value;

        obj.portfolioImage   = Session.get("portfolioImage");
        obj.portfolioImage_thumbnail   = Session.get("portfolioImage_thumbnail");

        obj.logoImage   = Session.get("logoImage");
        obj.logoImage_thumbnail   = Session.get("logoImage_thumbnail");

        obj.letterheadImage   = Session.get("letterheadImage");
        obj.letterheadImage_thumbnail   = Session.get("letterheadImage_thumbnail");

        var checked = [];
        $("input[name='locations[]']:checked").each( function ( ){
          checked.push($(this).val());
        });
        obj.locations   = JSON.stringify(checked);
        var id = Vendors.insert(obj);
        if (id) {
            delete Session.keys["portfolioImage"];
            delete Session.keys["portfolioImage_thumbnail"];
            delete Session.keys["logoImage"];
            delete Session.keys["logoImage_thumbnail"];
            delete Session.keys["letterheadImage"];
            delete Session.keys["letterheadImage_thumbnail"];
            var message = "You have created new Vendor. Thanks";
            FlashMessages.sendSuccess(message, { hideDelay: 3500 });

        }
        
    }
});

Template.managedUserForm.events({

  "change .userRole" : function (item) 
  {

    if (item.currentTarget.value == "vendor-user")

        $(".vendorSelect").show();

    else

        $(".vendorSelect").hide();
  }

});