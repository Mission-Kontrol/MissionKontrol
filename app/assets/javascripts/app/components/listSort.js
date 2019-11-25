var ready, setPositions;

setPositions = function(){
  $(".tableField").each(function(i){
    $(this).attr("data-pos",i+1);
  });
}

ready = function(){
  setPositions();

  sortable(".sortable");

  if (sortable(".sortable")[0]) {
    sortable(".sortable")[0].addEventListener("sortupdate", function(e, ui) {
      // array to store new order
      updatedOrder = [];
      // set the updated positions
      setPositions();

      // populate the updatedOrder array with the new task positions
      $(".tableField").each(function(i){
        updatedOrder.push({ value: $(this).data("value"), position: i+1 });
      });
    });
  };
}

$(document).ready(ready);
/**
 * if using turbolinks
 */
$(document).on("page:load", ready);
