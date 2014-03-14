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
    }
});

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