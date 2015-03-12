$(function() {

  var widgets = [];
  var currentWidget = 0;

  function updateWidgets() {
    $.ajax({
      url: '/widgets.json',
    }).success(function(result) {
      widgets = result;
      iterate();
    }).always(function(result) {
      setTimeout(updateWidgets, 2000);
    });
  }
  updateWidgets();

  function iterate() {
    console.log("Currentwidget:", currentWidget)

    var widget_name = widgets[currentWidget];
    console.log("Name:", widget_name)

    $.ajax({
      url: '/widgets-' + widget_name + '.html',
    }).success(function(result) {
      var template = Handlebars.compile(result);

      $.ajax({
        url: '/widgets-' + widget_name + '.json',
      }).success(function(result) {
        context = result;
        var html = template(context);
        $(".view").empty().append(html);
      }).always(function(result) {
        // setTimeout(iterate, 2000);
      });

    });

    // setTimeout(iterate, 2000);
    currentWidget += 1;
    if(currentWidget >= widgets.length) {
      currentWidget = 0;
    }

  }

});
