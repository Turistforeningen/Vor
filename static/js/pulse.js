$(function() {

  var context = {
    count: 2389
  };

  var template = Handlebars.compile($("#activity-widget-template").html());
  var html = template(context);
  $(".view").empty().append(html);
});
