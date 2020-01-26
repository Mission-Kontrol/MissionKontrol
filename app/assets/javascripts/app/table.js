"use strict";

function loadNestedDataTable(columns, data, nestedTable, recordId) {
  $("#target-table-" + nestedTable + "-" + recordId).DataTable({
    colReorder: false,
    info: false,
    paging: false,
    columns,
    autoWidth: true,
    dom: "",
    data,
    stateSave: true,
    scrollX: true,
    stateSaveCallback(settings, data) {
      stateSaveCallbackFunction(settings, data, $(this));
    },
    stateLoadCallback(settings, callback) {
      stateLoadCallbackFunction($(this), callback);
    }
  });
}

function fetchDataForNestedTable(recordId, nestedTable, tableName) {
  var databaseId = (location.pathname+location.search).substr(1).split("/")[1].charAt(0);
  var url = "/tables/" + tableName + "/" + recordId + "?record-id=" + recordId + "&nested-table=" + nestedTable + "&table=" + nestedTable + "&database_id=" + databaseId + "&table_name=" + tableName;

  $.ajax({
    dataType: "json",
    url,
    success(d) {
      loadNestedDataTable(d.columns, d.data, nestedTable, recordId);
    }
  });
}

function formatNestedTableColumns (data, tableName, nestedTable, nestedVisibleColumns) {
  var newTableStart = "<table id='target-table-"+ nestedTable +"-"+ data.id +"' class='nested-data-table table' data-table-name='"+ nestedTable +"' style='width:300px;'>"+
    "<thead>"+
      "<tr>"+
        "<th>";

  var newArray = [];
  nestedVisibleColumns.forEach(function (column) {
    newArray.push(humanizeString(column));
  });
  var headers = newArray.join("</th><th>");

  var newTableEnd = "</th>"+
      "</tr>"+
    "</thead>"+
  "</table>";

  fetchDataForNestedTable(data.id, nestedTable, tableName);

  return newTableStart + headers + newTableEnd;
}

function loadDataTable (columns) {
  var canExport = $(".data-table").data("can-export");
  var tableName = $(".data-table").data("table-name");
  var nestedVisibleColumns = $(".data-table").data("nested-table-columns");
  if (nestedVisibleColumns.length > 0) {
    columns.unshift({"data":null,"defaultContent":"<a class='table--nested-table' data-remote='true' href='#'><img src='/assets/images/icons/triangle.svg'></a>"});
  }
  var searchableTable = $(".data-table").DataTable({
    colReorder: true,
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    processing: true,
    pagingType: "simple_numbers",
    language: {
      processing: "<div class='sk-spinner sk-spinner-chasing-dots'>" +
            "<div class='sk-dot1'></div>" +
            "<div class='sk-dot2'></div>" +
          "</div>",
      paginate: {
        next: "Next >",
        previous: "< Prev",
      },
      info: "of _MAX_ results",
      zeroRecords: "Nothing found - sorry",
      infoEmpty: "No records available",
      infoFiltered: "(filtered from _MAX_ total records)"
    },
    ajax: "/" + (location.pathname+location.search).substr(1),
    dom: "f<'table--info'piB>rt<'clear'>",
    columns,
    stateSave: true,
    stateSaveCallback(settings, data) {
      stateSaveCallbackFunction(settings, data, $(this));
    },
    stateLoadCallback(settings, callback) {
      stateLoadCallbackFunction($(this), callback);
    },
    createdRow(row, data, dataIndex) {
      var table = $(this).data("table-name");
      var nestedTable = $(this).data("nested-table");
      var id = data.id;
      var previewUrl = "/tables/" + table + "/" + id + "?table=" + table;
      $(row).addClass("table--nested-row");
      $(row).attr("data-href",  previewUrl);
      $(row).attr("data-nested-table", nestedTable);
    },
    buttons: [
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
            url: "/table/settings",
            type: "GET",
            data: { "table": tableName },
            success() {}
          });
        }
      }
    ],
    initComplete(settings, json) {
      initCompleteFunction(settings, json, searchableTable);
    }
  });

  $("body").on("click", ".buttons-columnVisibility a", function () {
    searchableTable.state.save().ajax.reload();
  });

  $("body").on("click", "#target-table-" + tableName + " > tbody > tr.table--nested-row > td:first-child", function () {
    var tr = $(this).closest("tr");
    var row = searchableTable.row(tr);
    var nestedTable = tr.data("nested-table");

    if (nestedTable === null) {
      return;
    }

    if ( row.child.isShown() ) {
      row.child.hide();
      tr.removeClass("shown");
    }
    else {
      row.child( formatNestedTableColumns(row.data(), tableName, nestedTable, nestedVisibleColumns) ).show();
      tr.addClass("shown");
    }
  });
}

function fetchDataForTable() {
  $.ajax({
    dataType: "json",
    url: "/" + (location.pathname+location.search).substr(1),
    success(d) {
      loadDataTable(d.columns);
    }
  });
}

function loadRelatedDataTable (columns, id, ajax) {
  var searchableRelatedTable = { [id]:
    $("#" + id).DataTable({
      colReorder: true,
      deferRender: true,
      autoWidth: false,
      scrollX: true,
      serverSide: true,
      processing: true,
        language: {
          processing: "<div class='sk-spinner sk-spinner-chasing-dots'>" +
                "<div class='sk-dot1'></div>" +
                "<div class='sk-dot2'></div>" +
              "</div>"},
      ajax,
      dom: "Bfrtip",
      columns,
      stateSave: true,
      stateSaveCallback(settings, data) {
        stateSaveCallbackFunction(settings, data, $(this));
      },
      stateLoadCallback(settings, callback) {
        stateLoadCallbackFunction($(this), callback);
      },
      buttons: [
        "colvis",
        {
          "extend": "csv",
          "className": "btn btn-warning",
        }
      ],
      createdRow(row, data, dataIndex) {
        var table = $(this).data("table-name");
        var id = data.id;
        var previewUrl = "/tables/" + table + "/" + id + "?table=" + table;
        $(row).addClass("clickable-row");
        $(row).attr("data-href",  previewUrl);
      },
      initComplete(settings, json) {
        initCompleteFunction(settings, json, searchableTable);
      }
    })
  };
}

function fetchDataForRelatedTables() {
  var recordId = location.pathname.split("/")[3];
  var primaryTable = location.pathname.split("/")[2];
  var relatedTables = $(".related-data-table");

  for (var i = 0; i < relatedTables.length; i++) {
    let relatedTable = relatedTables[i].dataset.tableName;
    let relatedTableId = relatedTables[i].id;
    let url = "/tables/" + primaryTable + "/" + recordId + "?table=" + relatedTable;

    $.ajax({
      dataType: "json",
      url,
      success(d) {
        loadRelatedDataTable(d.columns, relatedTableId, url);
      }
    });
  }
}

function loadTaskQueuePreviewDataTable (columns) {
  if ($.fn.dataTable.isDataTable("#task-queue-preview-table")) {
    var table = $("#task-queue-preview-table").DataTable();
    table.destroy();
  }

  $("#task-queue-preview-table").DataTable({
    colReorder: true,
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    ajax: "/task_queues/" + location.pathname.split("/")[2] + "/preview",
    dom: "Bfrtip",
    columns,
    stateSave: true,
    stateSaveCallback(settings, data) {
      stateSaveCallbackFunction(settings, data, $(this));
    },
    stateLoadCallback(settings, callback) {
      stateLoadCallbackFunction($(this), callback);
    },
    buttons: [
      "colvis",
      {
        "extend": "csv",
        "className": "btn btn-warning",
      }
    ],
    createdRow(row, data, dataIndex) {
      let id = data.id;
      $(row).addClass("task-queue-item");
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
    const table = event.target.dataset.table;
    const field = event.target.dataset.field;
    const id = event.target.dataset.id;
    const foreignKeyTitle = event.target.dataset.foreignKeyTitle;
    const foreignKeyValue = event.target.dataset.foreignKeyValue;

    if (foreignKeyTitle) {
      updateRelatedTableField(event, table, field, foreignKeyTitle, foreignKeyValue);
    } else {
      updateTableField(event, table, field, id);
    }
  })
});
