
var $addItinerary = $('.add-itinerary');
var $listGroup = $('.list-group');

function addActivity(type, activity) {

  if (!activity) return;

  addMarker(activity.place[0].location, activity._id, type);

  var list = '.list-' + type;

  templates.get('itinerary-item')
    .appendTo(list)
    .data('activty-id', activity._id)
    .data('activty-type', type)
    .find('.title').text(activity.name);

} 

$addItinerary.on('click', function () {

  var id = $(this).siblings('select').val();
  var type = $(this).data('type');

  var list = '.list-' + type;

  var activity = model[type][id];

  // if (type === 'hotels') {
  //   $(list).empty();
  //   currentDay['hotel'] = activity;
  // } else {
  //   currentDay[type].push(activity);
  // }

  addActivity(type, activity);
  var dayNumber=parseInt($('.current-day').text());

  $.post( "/days/" + dayNumber + "/hotel", id, function(day) {

      });

});

$listGroup.on('click', '.remove-activity', function () {

  var $parent = $(this).parents('.itinerary-item');
  var id = $parent.data('activty-id');
  var type = $parent.data('activty-type');

  // Remove activity from state
  if (type === 'hotels') {
    currentDay['hotel'] = null;
  } else {
    var removeIndex = null;
    currentDay[type].forEach(function (activity, index) {
      if (activity._id == id) removeIndex = index;
    });
    if (removeIndex != null) {
      currentDay[type].splice(removeIndex, 1);
    }
  }

  // Remove activity from the DOM
  $(this).parents('.itinerary-item').remove();  

  // Remove marker from map (by ID)
  removeMarker(id);

});

