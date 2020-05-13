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
    createdRow(row, data) {
      let table = $(this).data("table-name");
      let nestedTable = $(this).data("nested-table");
      let id = data.id;
      let previewUrl = "/tables/" + table + "/" + id + "?table=" + table;

      if (nestedTable.length === 0) {
        $($(row).children()[1]).addClass("table--clickable-cell");
      } else {
        $($(row).children()[2]).addClass("table--clickable-cell");
      }

      $(row).addClass("table--nested-row");
      $(row).addClass("table--preview-link");
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

function linkToPreview () {
  $("body").on("click", ".table--clickable-cell", function () {
    let previewLocation = $(this).parent().data("href");
    let databaseId = (location.pathname+location.search).substr(1).split("/")[1].split("?")[0];
    let databaseParams = "&database_id=" + databaseId;

    window.location.href = previewLocation + databaseParams;
  });
}

function applyOutcomeRule () {
  $(".task-queue--outcome-button").click(function (event) {
    event.preventDefault();
    let table = location.pathname.substr(1).split("/")[1];
    let primaryKey = location.pathname.substr(1).split("/")[2].split("?")[0];
    let outcome = $(this).data("outcome");
    let taskQueueId = $(this).data("task-queue-id");
    let url = "/task_queues/" + taskQueueId + "/outcome";

    let data = {
      outcome,
      table,
      primary_key: primaryKey,
      task_queue_id: taskQueueId
    }

    $.ajax({
      url,
      type: "POST",
      data,
      async: true,
      dataType: "json",
      error () {
                window.toastr.error("Something went wrong, please try again.");
             },
      success () {
        window.toastr.success("Task queue outcome updated.");
        $(".task-queue--outcome-buttons").addClass("hide");
        // TODO: Add a comment to activity history marking outcome
      }
    });
  });
}

Paloma.controller("Tables", {
  show () {
    fetchDataForTable();
    updateEditableFieldInput();
    rotateNestedTableIcon();
    linkToPreview();
  },

  preview () {
    fetchDataForRelatedTables();
    updateEditableFieldInput();
    applyOutcomeRule();
    rotateNestedTableIcon();
  }
});
