$(document).ready(function() {
  fetchDataForTable();
  fetchDataForRelatedTables();
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

function fetchDataForTable() {
  $.ajax({
    dataType: 'json',
    url: '/' + (location.pathname+location.search).substr(1),
    success: function(d) {
      loadDataTable(d.columns)
    }
  });
}

function fetchDataForRelatedTables() {
  let relatedTables = $('.related-data-table');

  for (var i = 0; i < relatedTables.length; i++) {
    let relatedTable = relatedTables[i].dataset.tableName;
    let relatedTableId = relatedTables[i].id;
    let url = "/tables/" + relatedTable + "?table=" + relatedTable;

    $.ajax({
      dataType: 'json',
      url: url,
      success: function(d) {
        loadRelatedDataTable(d.columns, relatedTableId, url);
      }
    });
  }
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

function loadRelatedDataTable (columns, id, ajax) {
  $('#' + id).DataTable({
    "colReorder": true,
    "deferRender": true,
    "autoWidth": false,
    "scrollX": true,
    "ajax": ajax,
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
    "buttons": [
      'colvis',
      {
        "extend": 'csv',
        "className": 'btn btn-warning',
      }
    ]
  });
}
