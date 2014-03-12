Template.vendorEventDetail.events( {
  "click #getSlickData": function () {
    var gridData = JSON.stringify(grid.getData());
    if (gridData.length > 0){
      // console.log("eventID = "+ Session.get("activeEvents"));
      // console.log("vendorID = "+ Session.get("vendorID"));
      var obj = {};
      obj.eventID = Session.get("activeEvents")
      obj.vendorID = Session.get("vendorID")
      obj.detail = JSON.stringify(grid.getData());
      RequestDetail.insert(obj);
    }
      // console.log(JSON.stringify(grid.getData()));
      
    // console.log(grid.getData());
    // alert(grid.getData());
  } 
});
Template.vendorEventDetail.rendered = function () {
 
   function requiredFieldValidator(value) {
    if (value == null || value == undefined || !value.length) {
      return {valid: false, msg: "This is a required field"};
    } else {
      return {valid: true, msg: null};
    }
  }

  var data = [];
  var columns = [
    {id: "name", name: "Name", field: "name", width: 100, cssClass: "cell-title", editor: Slick.Editors.Text},
    {id: "desc", name: "Description", field: "description", width: 200, editor: Slick.Editors.Text},
    {id: "rate", name: "Rate", field: "rate", width: 80, editor: Slick.Editors.Integer},
    {id: "quantity", name: "Quantity", field: "quantity", width: 80, editor: Slick.Editors.Integer},
    {id: "total", name: "Total", field: "total", width: 80}
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
      while(rowCount--) {
        var total = parseFloat(data[rowCount]["rate"]) * parseFloat(data[rowCount]["quantity"]);
        if (isNaN(total))
          total = 0;
        data[rowCount]["total"] = total;
      }
      // console.log(data);
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