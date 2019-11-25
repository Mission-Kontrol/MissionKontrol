function fetchDataForTable() {
  $.ajax({
    dataType: "json",
    url: "/" + (location.pathname+location.search).substr(1),
    success: function(d) {
      loadDataTable(d.columns);
    }
  });
}

function fetchDataForRelatedTables() {
  let recordId = location.pathname.split("/")[3];
  let primaryTable = location.pathname.split("/")[2];
  let relatedTables = $(".related-data-table");

  for (var i = 0; i < relatedTables.length; i++) {
    let relatedTable = relatedTables[i].dataset.tableName;
    let relatedTableId = relatedTables[i].id;
    let url = "/tables/" + primaryTable + "/" + recordId + "?table=" + relatedTable;

    $.ajax({
      dataType: "json",
      url: url,
      success: function(d) {
        loadRelatedDataTable(d.columns, relatedTableId, url);
      }
    });
  }
}

function fetchDataForNestedTable(recordId, nestedTable, tableName) {
  let url = "/tables/" + tableName + "/" + recordId + "?record-id=" + recordId + "&nested-table=" + nestedTable + "&table=" + nestedTable;

  $.ajax({
    dataType: "json",
    url: url,
    success: function(d) {
      loadNestedDataTable(d.columns, d.data, nestedTable, recordId);
    }
  });
}

function loadNestedDataTable(columns, data, nestedTable, recordId) {
  var nestedTable = $("#target-table-" + nestedTable + "-" + recordId).DataTable({
    colReorder: false,
    info: false,
    paging: false,
    columns: columns,
    autoWidth: true,
    dom: '',
    data: data,
    stateSave: true,
    scrollX: true,
    stateSaveCallback(settings, data) {
      if ( settings.iDraw <= 1 ) {
        return;
      }
      $.ajax({
        "url": "/data_table_states/save?table=" + $(this).data("table-name"),
        "data": { "state": data },
        "dataType": "json",
        "type": "POST",
        "success": function () {
        }
      });
    },
    stateLoadCallback(settings, callback) {
      $.ajax({
        "url": "/data_table_states/load?table=" + $(this).data("table-name"),
        "dataType": "json",
        "success": function (json) {
          callback( json );
        }
      });
    }
  })
}

function loadDataTable (columns) {
  var canExport = $(".data-table").data("can-export");
  var tableName = $(".data-table").data("table-name");
  var nestedVisibleColumns = $(".data-table").data("nested-table-columns");
  if (nestedVisibleColumns.length > 0) {
    columns.unshift({"data":null,"defaultContent":"<a class='table--nested-table' data-remote='true' href='#'><img src='/assets/images/icons/triangle.svg'></a>"})
  }
  var searchableTable = $(".data-table").DataTable({
    colReorder: true,
    "deferRender": true,
    "autoWidth": false,
    "scrollX": true,
    "serverSide": true,
    "processing": true,
    "pagingType": "simple_numbers",
    "language": {
      processing: "<div class='sk-spinner sk-spinner-chasing-dots'>" +
            "<div class='sk-dot1'></div>" +
            "<div class='sk-dot2'></div>" +
          "</div>",
      "paginate": {
        "next":       "Next >",
        "previous":   "< Prev",
      },
      "info": "of _MAX_ results",
      "zeroRecords": "Nothing found - sorry",
      "infoEmpty": "No records available",
      "infoFiltered": "(filtered from _MAX_ total records)"
    },
    "ajax": "/" + (location.pathname+location.search).substr(1),
    "dom": 'f<"table--info"piB>rt<"clear">',
    "columns": columns,
    stateSave: true,
    stateSaveCallback(settings, data) {
      if ( settings.iDraw <= 1 ) {
        return;
      }
      $.ajax({
        "url": "/data_table_states/save?table=" + $(this).data("table-name"),
        "data": { "state": data },
        "dataType": "json",
        "type": "POST",
        "success": function () {
        }
      });
    },
    stateLoadCallback(settings, callback) {
      $.ajax({
        "url": "/data_table_states/load?table=" + $(this).data("table-name"),
        "dataType": "json",
        "success": function (json) {
          callback( json );
        }
      });
    },
    "createdRow": function( row, data, dataIndex ) {
      let table = $(this).data("table-name");
      let nestedTable = $(this).data("nested-table")
      let id = data.id;
      let previewUrl = "/tables/" + table + "/" + id + "?table=" + table;
      $(row).addClass( "table--nested-row" );
      $(row).attr( "data-href",  previewUrl);
      $(row).attr( "data-nested-table", nestedTable )
    },
    "buttons": [
      {
        extend: "colvis",
        className: "table--colvis",
        text: "Columns"
      },
      {
        extend: "csv",
        className: "table--export " + canExport,
        text: "Export"
      },
      {
        text: "Settings",
        className: "table--settings",
        action () {
          $.ajax({
            "url": "/table/settings",
            "type": "GET",
            "data": { "table": tableName },
            "success": function () {}
          });
        }
      }
    ],
    "initComplete": function(settings, json) {
      $('[id ^="target-table-"][id $="_filter"] input').unbind();
      $('[id ^="target-table-"][id $="_filter"] input').bind('keyup', function(e) {
        if(e.keyCode === 13) {
          searchableTable.search( this.value ).draw();
        }
      });
    }
  });

  $("body").on("click", ".buttons-columnVisibility a", function () {
    searchableTable.state.save().ajax.reload();
  });

  $("body").on("click", "#target-table-" + tableName + " > tbody > tr.table--nested-row > td:first-child", function () {
    var tr = $(this).closest('tr');
    var row = searchableTable.row(tr);
    var nestedTable = tr.data('nested-table');

    if (nestedTable === null) {
      return
    }

    if ( row.child.isShown() ) {
      row.child.hide();
      tr.removeClass('shown');
    }
    else {
      row.child( formatNestedTableColumns(row.data(), tableName, nestedTable, nestedVisibleColumns) ).show();
      tr.addClass('shown');
    }
  });
}

function formatNestedTableColumns (data, tableName, nestedTable, nestedVisibleColumns) {
  var newTableStart = "<table id='target-table-"+ nestedTable +"-"+ data.id +"' class='nested-data-table table' data-table-name='"+ nestedTable +"' style='width:300px;'>"+
    "<thead>"+
      "<tr>"+
        "<th>"

  var headers = nestedVisibleColumns.join('</th><th>')

  var newTableEnd = "</th>"+
      "</tr>"+
    "</thead>"+
  "</table>"

  fetchDataForNestedTable(data.id, nestedTable, tableName)

  return newTableStart + headers + newTableEnd
}

function loadRelatedDataTable (columns, id, ajax) {
  var searchableRelatedTable = { [id]:
    $("#" + id).DataTable({
      "colReorder": true,
      "deferRender": true,
      "autoWidth": false,
      "scrollX": true,
      "serverSide": true,
      "processing": true,
        "language": {
          processing: "<div class='sk-spinner sk-spinner-chasing-dots'>" +
                "<div class='sk-dot1'></div>" +
                "<div class='sk-dot2'></div>" +
              "</div>"},
      "ajax": ajax,
      "dom": "Bfrtip",
      "columns": columns,
      "stateSave": true,
      "stateSaveCallback": function (settings, data) {
        if ( settings.iDraw <= 1 ) {
          return;
        }

        $.ajax({
          "url": "/data_table_states/save?table=" + $(this).data("table-name"),
          "data": { "state": data },
          "dataType": "json",
          "type": "POST",
          "success": function () {}
        });
      },
      "stateLoadCallback": function (settings, callback) {
        $.ajax({
          "url": "/data_table_states/load?table=" + $(this).data("table-name"),
          "dataType": "json",
          "success": function (json) {
            callback( json );
          }
        });
      },
      "buttons": [
        "colvis",
        {
          "extend": "csv",
          "className": "btn btn-warning",
        }
      ],
      "createdRow": function( row, data, dataIndex ) {
        let table = $(this).data("table-name");
        let id = data.id;
        let previewUrl = "/tables/" + table + "/" + id + "?table=" + table;
        $(row).addClass( "clickable-row" );
        $(row).attr( "data-href",  previewUrl);
      },
      "initComplete": function(settings, json) {
        $("#" + id + "_filter input").unbind();
        $("#" + id + "_filter input").bind("keyup", function(e) {
          if(e.keyCode === 13) {
            searchableRelatedTable[id].search( this.value ).draw();
          }
        });
      }
    })
  };
}

function loadTaskQueuePreviewDataTable (columns) {
  if ( $.fn.dataTable.isDataTable( "#task-queue-preview-table" ) ) {
    let table = $("#task-queue-preview-table").DataTable();
    table.destroy();
  }

  $("#task-queue-preview-table").DataTable({
    "colReorder": true,
    "deferRender": true,
    "autoWidth": false,
    "scrollX": true,
    "serverSide": true,
    "ajax": "/task_queues/" + location.pathname.split("/")[2] + "/preview",
    "dom": "Bfrtip",
    "columns": columns,
    "stateSave": true,
    "stateSaveCallback": function (settings, data) {
      if ( settings.iDraw <= 1 ) {
        return;
      }

      $.ajax({
        "url": "/data_table_states/save?table=" + $(this).data("table-name"),
        "data": { "state": data },
        "dataType": "json",
        "type": "POST",
        "success": function () {}
      });
    },
    "stateLoadCallback": function (settings, callback) {
      $.ajax({
        "url": "/data_table_states/load?table=" + $(this).data("table-name"),
        "dataType": "json",
        "success": function (json) {
          callback( json );
        }
      });
    },
    "buttons": [
      "colvis",
      {
        "extend": "csv",
        "className": "btn btn-warning",
      }
    ],
    "createdRow": function( row, data, dataIndex ) {
      let id = data.id;
      $(row).addClass( "task-queue-item" );
      $(row).attr( "data-task-queue-item-primary-key", id);
    }
  });

  $("#task-queue-preview-table").removeClass("hide");
}

$(document).ready(function() {
  let metaTag = $("meta[name=psj]");
  let isCurrentControllerTables = metaTag.attr("controller") === "tables";
  let isCurrentActionShow = metaTag.attr("action") === "show";
  let isCurrentActionPreview = metaTag.attr("action") === "preview";

  if (isCurrentControllerTables && isCurrentActionShow) {
    fetchDataForTable();
  }

  if (isCurrentControllerTables && isCurrentActionPreview) {
    fetchDataForRelatedTables();
  }

  $(".editable-input input").blur(function(event) {
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
