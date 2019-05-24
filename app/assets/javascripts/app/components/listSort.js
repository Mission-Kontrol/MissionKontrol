var ready, set_positions;

set_positions = function(){
  $('.tableField').each(function(i){
    $(this).attr("data-pos",i+1);
  });
}

ready = function(){
  set_positions();

  sortable('.sortable');

  if(sortable('.sortable')[0]) {
    sortable('.sortable')[0].addEventListener('sortupdate', function(e, ui) {
      // array to store new order
      updated_order = []
      // set the updated positions
      set_positions();

      // populate the updated_order array with the new task positions
      $('.tableField').each(function(i){
        updated_order.push({ value: $(this).data("value"), position: i+1 });
      });
    });
  }
}

$(document).ready(ready);
/**
 * if using turbolinks
 */
$(document).on('page:load', ready);
