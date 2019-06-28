$(document).ready(function() {
  fetchDataForTable();

  $(".excelexport").on("click", function (e) {
    let tableId = e.target.parentElement.parentElement.parentElement.getElementsByTagName("table")[0].id
    var csv = FooTable.get("#" + tableId).toCSV(true);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = "kuwinda-" + tableId + ".csv";
    hiddenElement.click();
  });

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

function fetchDataForTable() {
  $.ajax({
    dataType: 'json',
    url: '/' + (location.pathname+location.search).substr(1),
    success: function(d) {
      loadDataTable(d.columns)
    }
  });
}

function loadDataTable (columns) {
  $('.data-table').DataTable({
    "colReorder": true,
    "deferRender": true,
    "autoWidth": false,
    "scrollX": true,
    "ajax": '/' + (location.pathname+location.search).substr(1),
    "dom": 'Bfrtip',
    "columns": columns,
    "stateSave": true,
    "stateSaveCallback": function (settings, data) {
      if ( settings.iDraw <= 1 ) {
        return;
      }

      $.ajax({
        "url": "/data_table_states/save?table=" + $(this).data('table-name'),
        "data": { "state": data },
        "dataType": "json",
        "type": "POST",
        "success": function () {}
      });
    },
    "stateLoadCallback": function (settings, callback) {
      $.ajax({
        "url": '/data_table_states/load?table=' + $(this).data('table-name'),
        "dataType": 'json',
        "success": function (json) {
          callback( json );
        }
      });
    },
    "createdRow": function( row, data, dataIndex ) {
      let table = $(this).data('table-name');
      let id = data.id;
      let previewUrl = '/tables/' + table + '/' + id + '?table=' + table;
      $(row).addClass( 'clickable-row' );
      $(row).attr( 'data-href',  previewUrl);
    },
    "buttons": [
      'colvis',
      {
        "extend": 'csv',
        "className": 'btn btn-warning',
      }
    ]
  });
}
