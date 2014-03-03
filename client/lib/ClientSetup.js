Handlebars.registerHelper("each_with_index", function(array, fn) {
	// console.log(array);
  var buffer = "";
  for (var i = 0, j = array.length; i < j; i++) {
    var item = array[i];
    item.index = i;
    buffer += fn(item);
  }
  return buffer;
});