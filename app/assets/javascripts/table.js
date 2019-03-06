$(document).ready(function() {
  $('.hidden-column-checkbox').change(function() {
    let columnName = this.value;
    let hiddenColumns = [];

    if(this.checked) {
      hideColumn(columnName);
    } else {
      showColumn(columnName);
    }

    $( ".hidden-column-checkbox" ).each(function( index ) {
      if (!this.checked) {
        hiddenColumns.push(this.value);
      }
    });
  });
})

function hideColumn(columnName) {
  let columnClass = ".column-" + columnName
  let tableName = $('.table').data().tableName;
  let url = "/tables/" + tableName + '/hide-column';
  let data = {};
  let columnData = {};

  columnData['column'] = columnName
  data["view_builder"] = {};
  data["view_builder"]["hidden_columns"] = columnData;

  $.ajax({
    url: url,
    type: 'PATCH',
    data: data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      console.error(url + errorTextStatus + " ;" + error);
    },
    success: function(response, status, request){
      $(columnClass).addClass('hide');
      console.log(url + " Success");
    }
  })
}

function showColumn(columnName) {
  let columnClass = ".column-" + columnName
  let tableName = $('.table').data().tableName;
  let url = "/tables/" + tableName + '/show-column';
  let data = {};
  let columnData = {};

  columnData['column'] = columnName
  data["view_builder"] = {};
  data["view_builder"]["hidden_columns"] = columnData;

  $.ajax({
    url: url,
    type: 'PATCH',
    data: data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      console.error(url + errorTextStatus + " ;" + error);
    },
    success: function(response, status, request){
      $(columnClass).removeClass('hide');
      console.log(url + " Success");
    }
  })
}
