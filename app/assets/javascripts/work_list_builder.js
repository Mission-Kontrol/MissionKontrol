$(function() {
  $('body').on('click', 'a.remove-filter-btn', removeFilter);
})

function removeFilter(event) {
  event.currentTarget.parentElement.parentElement.parentElement.remove();
}
