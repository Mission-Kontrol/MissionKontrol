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

function loadDataTable (columns) {
  columns.push({"data":null,"defaultContent":"<a class='user--edit-link' data-remote='true' href='#'><img src='/assets/images/icons/edit@2x.png'></a>"})
  var searchableTable = $(".data-table").DataTable({
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
            "</div>",
        "paginate": {
          "first":      "First",
          "last":       "Last",
          "next":       "Next >",
          "previous":   "< Prev"
        },
        "info": "of _MAX_ results",
      },
    "ajax": "/" + (location.pathname+location.search).substr(1),
    "dom": 'f<"table--info"piB>rt<"clear">',
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
    "createdRow": function( row, data, dataIndex ) {
      let table = $(this).data("table-name");
      let id = data.id;
      let previewUrl = '/users/edit/?id=' + id
      let editLink = row.lastChild.firstChild
      console.log(row.closest('.user--edit-link'))
      // let testingUrl = "/tables/" + table + "/" + id + "?table=" + table;
      // $(row).addClass( "clickable-row" );
      // console.log(previewUrl)
      // console.log(testingUrl)
      // console.log(id)
      $(editLink).attr( "href",  previewUrl);
      // $(row).attr("data-remote", true);
    },
    "buttons": [
      {
        "extend": "csv",
        "className": "table--import",
        text: 'Import'
      },
      {
        "extend": "csv",
        "className": "table--export",
        text: 'Export'
      },
      {
        "extend": "csv",
        "className": "table--add",
        text: 'Add'
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
  let isCurrentControllerAdminUsers = metaTag.attr("controller") === "admin_users";
  let isCurrentActionShow = metaTag.attr("action") === "show";
  let isCurrentActionPreview = metaTag.attr("action") === "preview";

  if (isCurrentControllerTables && isCurrentActionShow) {
    fetchDataForTable();
  }

  if (isCurrentControllerAdminUsers) {
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
