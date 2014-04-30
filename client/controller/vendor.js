Template.vendorEventDetail.events( {
  "click #getSlickData": function () {
    var gridData = JSON.stringify(grid.getData());
    if (gridData.length > 0){
      var obj = {};
      obj.requestQuoteID = Session.get("requesetQuoteID");
      obj.detail = JSON.stringify(grid.getData());
      var id = QuotationDetail.insert(obj);
      if (id) {
        var requestQuote = RequestQuote.findOne({_id: Session.get("requesetQuoteID")});
        if (requestQuote) {
          var message = Messages.findOne({$and: [{eventID: requestQuote.eventID}, {vendorID: requestQuote.vendorID}, {categoryID: requestQuote.activeService}, {parents: "0"}]});
          var obj = {};
          obj.categoryID = requestQuote.activeService;
          obj.dates = moment().unix();
          obj.eventID = requestQuote.eventID;
          obj.texts = JSON.stringify(grid.getData());
          obj.userID = requestQuote.userID;
          obj.vendorID = requestQuote.vendorID;
          obj.parents = message._id;     
          obj.userUnread = true;
          obj.vendorUnread = false;
          obj.from = "vendor";
          obj.mtype = "quotation";
          Messages.insert(obj); 
        }       
      }
    }
  } 
});
Template.vendorEventDetail.rendered = function () {
  var data = [];
  Deps.autorun(function () {
    Meteor.subscribe("quotationDetail");
    var quotations = QuotationDetail.findOne({requestQuoteID:Session.get("requesetQuoteID")});
    if (quotations){
      data = JSON.parse(quotations.detail);
    }
    var columns = [
      {id: "name", name: "Name", field: "name", width: 100, cssClass: "cell-title", editor: Slick.Editors.Text},
      {id: "desc", name: "Description", field: "description", width: 200, editor: Slick.Editors.Text},
      {id: "rate", name: "Rate", field: "rate", width: 80, editor: Slick.Editors.Integer},
      {id: "quantity", name: "Quantity", field: "quantity", width: 80, editor: Slick.Editors.Integer},
      {id: "price", name: "Price", field: "price", width: 80}
    ];
    var options = {
      editable: true,
      enableAddRow: true,
      enableCellNavigation: true,
      asyncEditorLoading: false,
      autoEdit: false
    };

    $(function () {
      var dataProvider = new TotalsDataProvider(data, columns);
      grid = new Slick.Grid("#myGrid", data, columns, options);

      grid.setSelectionModel(new Slick.CellSelectionModel());
      grid.autosizeColumns();
      grid.onAddNewRow.subscribe(function (e, args) {     
        var item = args.item;
        // console.log(item.keys());
        grid.invalidateRow(data.length);
        data.push(item);
        grid.updateRowCount();
        grid.render();
      });
      grid.onCellChange.subscribe(function(e, args) {
        // The data has changed - recalculate the totals.
        dataProvider.updateTotals();
        grid.invalidateRow(args.row);
        grid.render();
      });    
    })    
  });  

}
   function requiredFieldValidator(value) {
    if (value == null || value == undefined || !value.length) {
      return {valid: false, msg: "This is a required field"};
    } else {
      return {valid: true, msg: null};
    }
  }
  function TotalsDataProvider(data, columns) {
    var totals = {};
    var totalsMetadata = {
      // Style the totals row differently.
      cssClasses: "totals",
      columns: {}
    };

    // Make the totals not editable.
    for (var i = 0; i < columns.length; i++) {
      totalsMetadata.columns[i] = { editor: null };
    }


    this.getLength = function() {
      return data.length + 1;
    };

    this.getItem = function(index) {
      return (index < data.length) ? data[index] : totals;
    };

   this.updateTotals = function() {
      var rowCount = data.length;
      var aTotal = 0;
      while(rowCount--) {
        var total = parseFloat(data[rowCount]["rate"]) * parseFloat(data[rowCount]["quantity"]);
        if (isNaN(total))
          total = 0;
        data[rowCount]["price"] = total;
        aTotal = aTotal + total;
      }
      $("#totalValue").html("$"+aTotal);
    };
    this.getItemMetadata = function(index) {
      return (index != data.length) ? null : totalsMetadata;
    };
    this.updateTotals();
  }

 function requiredFieldValidator(value) {
    if (value == null || value == undefined || !value.length) {
      return {valid: false, msg: "This is a required field"};
    } else {
      return {valid: true, msg: null};
    }
  }