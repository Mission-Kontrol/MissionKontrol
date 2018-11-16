$(function() {
  $('body').on('click', 'a.remove-filter-btn', removeFilter);
  $('body').on('click', 'a.remove-work-list-outcome-btn', removeWorkListOutcome);
})

function removeFilter(event) {
  event.currentTarget.parentElement.parentElement.parentElement.remove();
}

function removeWorkListOutcome(event) {
  event.currentTarget.parentElement.parentElement.parentElement.remove();
}
