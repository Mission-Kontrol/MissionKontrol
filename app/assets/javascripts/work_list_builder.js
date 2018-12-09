$(function() {
  $('body').on('click', 'a.remove-filter-btn', removeFilter);
  $('body').on('click', 'a.remove-work-list-outcome-btn', removeWorkListOutcome);
  $(".table-select").change(function() {
    toastr.success('Table changed, remember to update your filters.');
    filterColumnsByTable()
  })
})

function removeFilter(event) {
  event.currentTarget.parentElement.parentElement.parentElement.remove();
}

function removeWorkListOutcome(event) {
  event.currentTarget.parentElement.parentElement.parentElement.remove();
}

function filterColumnByTable(selectedTable, selectedColumn) {
  var options = getOptionsForColumnSelect(selectedTable);

  if (options) {
    $( "select[name^='work_list[sql_filters][][sql_filter][column]']:last" ).html(options);
    $( "select[name^='work_list[sql_filters][][sql_filter][column]']:last" ).val(selectedColumn);
  }
}

function filterColumnsByTable() {
  var table = $('.table-select :selected').text();
  var options = getOptionsForColumnSelect(table);

  if (options) {
    $( "select[name^='work_list[sql_filters][][sql_filter][column]']" ).html(options);
  }
}

function getOptionsForColumnSelect(tableName) {
  var columns = $('#sql-filter-columns').html();
  var table = $('.table-select :selected').text();
  var label = "optgroup[label='" + table + "']";
  return $(columns).filter(label).html();
}
