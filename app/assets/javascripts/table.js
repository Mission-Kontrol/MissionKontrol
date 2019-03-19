$(document).ready(function() {
  $('.hidden-column-checkbox').change(function() {
    let columnName = this.value;
    let hiddenColumns = [];

    if(this.checked) {
      showColumn(columnName);
    } else {
      hideColumn(columnName);
    }

    $( ".hidden-column-checkbox" ).each(function( index ) {
      if (!this.checked) {
        hiddenColumns.push(this.value);
      }
    });
  });

  $('.editable-input input').blur(function(event) {
    const table = event.target.dataset.table
    const field = event.target.dataset.field
    const id = event.target.dataset.id
    const foreignKeyTitle = event.target.dataset.foreignKeyTitle
    const foreignKeyValue = event.target.dataset.foreignKeyValue

    if (foreignKeyTitle) {
      updateRelatedTableField(event, table, field, foreignKeyTitle, foreignKeyValue)
    } else {
      updateTableField(event, table, field, id)
    }
  })
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
