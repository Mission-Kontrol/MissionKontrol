"use strict";

function loadNestedDataTable(columns, data, nestedTable, recordId) {
  var nestedSearchableTable = $("#target-table-" + nestedTable + "-" + recordId).DataTable({
    colReorder: false,
    info: false,
    paging: false,
    columns,
    autoWidth: true,
    dom: "",
    data,
    stateSave: true,
    scrollX: true,
    processing: false,
    stateSaveCallback(settings, data) {
      stateSaveCallbackFunction(settings, data, $(this));
    },
    stateLoadCallback(settings, callback) {
      stateLoadCallbackFunction($(this), callback);
    },
    initComplete(settings, json) {
      initCompleteFunction(settings, json, nestedSearchableTable);
    }
  });
  $(".spinner").hide();
}

function fetchDataForNestedTable(recordId, nestedTable, tableName) {
  var databaseId = (location.pathname+location.search).substr(1).split("/")[1].split("?")[0];
  var url = "/tables/" + tableName + "/" + recordId + "?record-id=" + recordId + "&nested-table=" + nestedTable + "&table=" + nestedTable + "&database_id=" + databaseId + "&table_name=" + tableName;

  $.ajax({
    dataType: "json",
    url,
    success(d) {
      loadNestedDataTable(d.columns, d.data, nestedTable, recordId);
    },
    error(){
      toastr.error("Something went wrong. Please reload the page or speak to an Administrator");
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
  let canExport = $(".data-table").data("can-export");
  let tableName = $(".data-table").data("table-name");
  var nestedVisibleColumns = $(".data-table").data("nested-table-columns");
  let databaseId = (location.pathname+location.search).substr(1).split("/")[1].split("?")[0];
  if (nestedVisibleColumns.length > 0) {
    columns.unshift({"data":null,"defaultContent":"<a class='table--nested-table' data-remote='true' href='#'><img class='nested-table rotate' src='/assets/images/icons/triangle.svg'></a>"});
  }

  let reorderTargets = (nestedVisibleColumns.length > 0) ? [0, 1] : 0;
  let defaultOrder = (nestedVisibleColumns.length > 0) ? [ 2, "asc" ] : [ 1, "asc" ];

  let colOrderable = [
    { orderable: false, targets: reorderTargets }
  ];

  columns.unshift({
    data: "",
    sortable: false,
    defaultContent: "<input type='checkbox' class='data-table--select-input' data-id='"+ databaseId +"' name='"+ tableName +"' value='"+ tableName +"'></input>"
  });

  var searchableTable = $(".data-table").DataTable({
    colReorder: true,
    columnDefs: colOrderable,
    order: [defaultOrder],
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    processing: false,
    pagingType: "simple_numbers",
    language: {
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
      let table = $(this).data("table-name");
      let nestedTable = $(this).data("nested-table");
      let id = data.id;
      let previewUrl = "/tables/" + table + "/" + id + "?table=" + table;
      $(row).addClass("table--nested-row");
      $(row).attr("data-href",  previewUrl);
      $(row).attr("data-nested-table", nestedTable);
      $(row).attr("data-record-id", id);
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
          $("button.table--settings").attr("disabled", true);
          $.ajax({
            url: "/table/settings",
            type: "GET",
            data: { "table": tableName, "database_id": databaseId },
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

  $("body").on("click", "#target-table-" + tableName + " > tbody > tr.table--nested-row > td > a.table--nested-table", function () {
    var tr = $(this).closest("tr");
    var row = searchableTable.row(tr);
    var nestedTable = tr.data("nested-table");

    if (nestedTable === null || nestedTable === "") {
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

  selectInput(searchableTable);

  manipulateData(searchableTable);

  window["datatable"] = searchableTable;
}

function fetchDataForTable() {
  $.ajax({
    dataType: "json",
    url: "/" + (location.pathname+location.search).substr(1),
    success(d) {
      loadDataTable(d.columns);
    },
    error(){
      toastr.error("Something went wrong. Please reload the page or speak to an Administrator");
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
      processing: false,
      pagingType: "simple_numbers",
      language: {
        paginate: {
          next: "Next >",
          previous: "< Prev",
        },
        info: "of _MAX_ results",
        zeroRecords: "Nothing found - sorry",
        infoEmpty: "No records available",
        infoFiltered: "(filtered from _MAX_ total records)"
      },
      ajax,
      dom: "f<'table--info'piB>rt<'clear'>",
      columns,
      stateSave: true,
      stateSaveCallback(settings, data) {
        stateSaveCallbackFunction(settings, data, $(this));
      },
      stateLoadCallback(settings, callback) {
        stateLoadCallbackFunction($(this), callback);
      },
      buttons: [
          {
            extend: "colvis",
            className: "table--colvis",
            text: "Columns"
          },
        ],
      createdRow(row, data, dataIndex) {
        var table = $(this).data("table-name");
        var id = data.id;
        var previewUrl = "/tables/" + table + "/" + id + "?table=" + table;
        $(row).addClass("clickable-row");
        $(row).attr("data-href",  previewUrl);
      },
      initComplete(settings, json) {
        initCompleteFunction(settings, json, searchableRelatedTable);
      }
    })
  };
}

function fetchDataForRelatedTables() {
  var recordId = location.pathname.split("/")[3];
  var primaryTable = location.pathname.split("/")[2];
  var relatedTables = $(".related-data-table");
  let databaseId = $(".related-data-table").first().data("database-id");

  for (var i = 0; i < relatedTables.length; i++) {
    let relatedTable = relatedTables[i].dataset.tableName;
    let relatedTableId = relatedTables[i].id;
    let url = "/tables/" + primaryTable + "/" + recordId + "?table=" + relatedTable + "&database_id=" + databaseId;

    $.ajax({
      dataType: "json",
      url,
      success(d) {
        loadRelatedDataTable(d.columns, relatedTableId, url);
      },
      error(){ }
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

function rotateIcon (icon, nestedRowOpen) {
  if (nestedRowOpen) {
    icon.removeClass("rotate");
  } else {
    icon.addClass("rotate");
  }
}

function rotateNestedTableIcon () {
  $("body").on("click", ".table--nested-table", function () {
    let triangleIcon = $(this).children(".nested-table");
    let nestedRowOpen = $(this).parent().parent().next().hasClass("table--nested-row");
    rotateIcon(triangleIcon, nestedRowOpen);
  });

  $("body").on("click", ".sorting_1", function () {
    let triangleIcon = $(this).children().children(".nested-table");
    let nestedRowOpen = $(this).parent().next().hasClass("table--nested-row");
    rotateIcon(triangleIcon, nestedRowOpen);
  });
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

  rotateNestedTableIcon();
});
