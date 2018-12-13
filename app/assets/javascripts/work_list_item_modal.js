$(function() {
  $( 'a[href="#"]' ).click( function(e) {
      e.preventDefault();
   } );
  $('body').on('click', 'a.show-work-list-item-btn', showWorkListItemModal);
})

function showWorkListItemModal() {
  let workListItemData = $(this).parent().parent().data().workListItem;
  $('.work_list_item_data').html("");

  for (var key in workListItemData) {
    if (!workListItemData.hasOwnProperty(key)) continue;
    $('.work_list_item_data').append("<p><b>" + key + ":</b> <span>" + workListItemData[key] + "</span></p>")
  }

  $('#modal-form').modal({});
}
