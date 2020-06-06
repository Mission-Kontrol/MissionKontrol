function loadTaskQueuePreviewDataTable (columns) {
  if ($.fn.dataTable.isDataTable("#task-queue-preview-table")) {
    var table = $("#task-queue-preview-table").DataTable();
    table.destroy();
  }

  $("#task-queue-preview-table").DataTable({
    colReorder: false,
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    ajax: "/task_queues/" + location.pathname.split("/")[2] + "/preview",
    dom: "<'table--info'pB>rti<'clear'>",
    pagingType: "simple_numbers",
    language: {
      paginate: {
        next: "Next >",
        previous: "< Prev",
      },
      info: "of _MAX_ results",
      zeroRecords: "Nothing found - sorry",
      infoEmpty: "",
      infoFiltered: "filtered from _MAX_ total records"
    },
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
      {
        extend: "csv",
        className: "table--export ",
        text: "Export"
      }
    ],
    createdRow(row, data) {
      let id = data.id;
      let table = $(this).data("table-name");
      let databaseId = $(this).data("database-id");
      let previewUrl = "/tables/" + table + "/" + id + "?table=" + table + "&database_id=" + databaseId;

      $(row).attr("data-href",  previewUrl);
      $(row).attr("data-task-queue-id", location.pathname.split("/")[2]);
      $(row).addClass("task-queue-item");
      $(row).addClass("clickable-row");
      $(row).attr( "data-task-queue-item-primary-key", id);
    }
  });

  $("#task-queue-preview-table").removeClass("hide");
}

function loadTaskQueueDataTable (columns) {
  if ($.fn.dataTable.isDataTable("#target-table-task-queues")) {
    var table = $("#target-table-task-queues").DataTable();
    table.destroy();
  }

  $("#target-table-task-queues").DataTable({
    colReorder: false,
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    processing: false,
    ajax: location.pathname,
    dom: "f<'table--info'pB>rti<'clear'>",
    pagingType: "simple_numbers",
    language: {
      paginate: {
        next: "Next >",
        previous: "< Prev",
      },
      info: "of _MAX_ results",
      zeroRecords: "Nothing found - sorry",
      infoEmpty: "",
      infoFiltered: "filtered from _MAX_ total records"
    },
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
      {
        extend: "csv",
        className: "table--export ",
        text: "Export"
      }
    ],
    createdRow(row, data) {
      let id = data.id;
      let table = $(this).data("table-name");
      let databaseId = $(this).data("database-id");
      let previewUrl = "/tables/" + table + "/" + id + "?table=" + table + "&database_id=" + databaseId;

      $(row).attr("data-href",  previewUrl);
      $(row).attr("data-task-queue-id", location.pathname.split("/")[2]);
      $(row).addClass("task-queue-item");
      $(row).addClass("clickable-row");
      $(row).attr( "data-task-queue-item-primary-key", id);
    }
  });

  $("#target-table-task-queues").removeClass("hide");
}

function initQueryBuilder (filters) {
  $("#builder").on("afterUpdateRuleValue.queryBuilder", function(e, rule) {
    if (rule.filter.plugin === "datepicker") {
      rule.$el.find(".rule-value-container input").datepicker("update");
    }
  });

  $("#builder").queryBuilder({
    filters,
    operators: ["equal",
                "not_equal",
                "contains",
                "not_contains",
                "between",
                "not_between",
                "is_null",
                "is_not_null",
                "begins_with",
                "not_begins_with",
                "is_empty",
                "is_not_empty",
                "less",
                "less_or_equal",
                "greater",
                "greater_or_equal",
                "ends_with",
                "not_ends_with"]
  });

  let taskQueueRules = $("#builder").data().taskQueueRules;
  $(".spinner").hide();
  if (!$.isEmptyObject(taskQueueRules) ) {
    $("#builder").queryBuilder("setRules", taskQueueRules);
  }
}

function buildFilterForDataType (type, id) {
  var filter = {};

  if (type === "datetime") {
    filter["id"] = id;
    filter["type"] = "date";
    filter["validation"] = {
      format: "YYYY/MM/DD"
    };
    filter["plugin"] = "datepicker";
    filter["plugin_config"] = {
      format: "yyyy/mm/dd",
      todayBtn: "linked",
      todayHighlight: true,
      autoclose: true
    };
  } else {
    filter["id"] = id;
    filter["type"] = type;
  }

  return filter;
}

function loadQueryBuilder (data) {
  $(".spinner").show();
  const filters = [];

  for (var i = 0; i < data.length; i++) {
    var filter;
    var id = data[i][0];
    var type = data[i][1];

    if (type === "inet" || type === "text") {
      filter = {};
      filter["id"] = id;
      filter["type"] = "string";
    } else {
      filter = buildFilterForDataType(type, id);
    }

    filters.push(filter);
  }

  initQueryBuilder(filters);
}

function getFieldsWithType (table) {
  $.ajax({
    url: "/related_table_fields_with_type",
    type: "GET",
    data: {
      table,
      id: $("#database-id").text().trim()
    },
    async: true,
    dataType: "json",
    error() {
      window.toastr.error("Invalid target database, please review credentials.");
    },
    success(data) {
      loadQueryBuilder(data);
    }
  });
}

function loadResults () {
  var taskQueueId = document.getElementById("builder").dataset.taskQueueId;

  var params = {};
  params["task_queue"] = {};

  if ($("#builder").queryBuilder("getRules") !== null) {
    params["task_queue"]["query_builder_rules"] = JSON.stringify($("#builder").queryBuilder("getRules"), null, 2);
  }

  if ($("#builder").queryBuilder("getSQL") !== null) {
    params["task_queue"]["query_builder_sql"] = $("#builder").queryBuilder("getSQL").sql;
  }

  params["task_queue"]["details"] = document.getElementById("task_queue_details").value;
  params["task_queue"]["name"] = document.getElementById("task_queue_name").value;

  $.ajax({
    url: "/task_queues/" + taskQueueId,
    type: "PATCH",
    data: params,
    dataType: "json",
    error() {
      window.toastr.error("Task queue preview failed, review SQL.");
    },
    success(response) {
      let columns = response.columns;

      if (typeof columns !== "undefined") {
        loadTaskQueuePreviewDataTable(columns);
      }

      window.toastr.info("Task queue updated.");
    }
  });
}

function updateSettings(button) {
  var taskQueueId = document.getElementById("builder").dataset.taskQueueId;
  var params = {};
  $(button.form).serializeArray().map(function (x) {
    params[x.name] = x.value;
  });

  $.ajax({
    url: "/task_queues/" + taskQueueId,
    type: "PATCH",
    data: params,
    dataType: "json",
    error() {
      window.toastr.error("Task queue preview failed, please review errors and try again.");
    },
    success(data) {
      $(".task-queue--outcome-button-success")[0].text = data["task_queue"]["success_outcome_title"];
      $(".task-queue--outcome-button-failure")[0].text = data["task_queue"]["failure_outcome_title"];
      $(".task-queue--name")[0].innerText = data["task_queue"]["name"];
      $(".task-queue--details")[0].innerText = data["task_queue"]["details"];
      window.toastr.info("Task queue updated.");
    }
  });
}

function linkToSingleDataView () {
  $("body").on("click", ".clickable-row", function () {
    let previewLocation = $(this).data("href");
    let taskQueueId = $(this).data("task-queue-id");
    let taskQueueParams = "&task_queue_id=" + taskQueueId;

    window.location.href = previewLocation + taskQueueParams;
  });
}

function showLabel(outcome) {
  let label = $("#task-queue-" + outcome + "-label");
  if (label.hasClass("hide")) {
    label.removeClass("hide");
  }
}

function hideInput(outcome, input) {
  let inputField = $("#task-queue-" + outcome + input);
  if (!inputField.hasClass("hide")) {
    inputField.addClass("hide");
  }
}

function displayUpdateField (field, outcome) {
  if (field.value === "Boolean") {
    hideInput(outcome, "-text");
    $("#task-queue-" + outcome + "-boolean").removeClass("hide");
    showLabel(outcome);
  } else if (field.value === "Text") {
    hideInput(outcome, "-boolean");
    $("#task-queue-" + outcome + "-text").removeClass("hide");
    showLabel(outcome);
  } else if (field.value === "Increment") {
    hideInput(outcome, "-boolean");
    hideInput(outcome, "-text");
    if (!$("#task-queue-" + outcome + "-label").hasClass("hide")) {
      $("#task-queue-" + outcome + "-label").addClass("hide");
    }
  }
}

function updateTaskQueue(checkbox) {
  var taskQueueId = document.getElementById("builder").dataset.taskQueueId;

  var params = { "task_queue[enabled]": checkbox.checked };

  $.ajax({
    url: "/task_queues/" + taskQueueId,
    type: "PATCH",
    data: params,
    dataType: "json",
    error() {
      window.toastr.error("Task queue preview failed, please review errors and try again.");
    },
    success() {
      window.toastr.info("Task queue updated.");
    }
  });
}

function loadCorrectInput() {
  let successType = $("#task_queue_success_database_update_type").val();
  let failureType = $("#task_queue_failure_database_update_type").val();

  if (successType === "Boolean") {
    showLabel("success");
    $("#task-queue-success-boolean").removeClass("hide");
  } else if (successType === "Text") {
    showLabel("success");
    $("#task-queue-success-text").removeClass("hide");
  }

  if (failureType === "Boolean") {
    showLabel("failure");
    $("#task-queue-failure-boolean").removeClass("hide");
  } else if (failureType === "Text") {
    showLabel("failure");
    $("#task-queue-failure-text").removeClass("hide");
  }
}

Paloma.controller("TaskQueues", {
  index () {
    $(".spinner").hide();
  },

  new () {
    $("#new-task-queue-modal").modal({
      backdrop: "static",
      keyboard: false
    });

    $("#queue-builder-modal-save-button").click(function() {
      var params = {};
      params["task_queue"] = {};
      params["task_queue"]["name"] = document.getElementById("task_queue_name").value;
      params["task_queue"]["details"] = document.getElementById("task_queue_details").value;
      params["task_queue"]["table"] = document.getElementById("task_queue_table").value;
      saveTaskQueue(params);
    });
  },

  edit () {
    $(".spinner").show();
    let taskQueueTable = document.getElementById("builder").dataset.taskQueueTable;
    let taskQueueId = document.getElementById("builder").dataset.taskQueueId;

    getFieldsWithType(taskQueueTable);

    $(".task-queue-update-button").click(function() {
      loadResults();
    });

    $(".task-queue-update-settings").click(function(evt) {
      evt.preventDefault();
      updateSettings(this);
    });

    linkToSingleDataView();

    $("#task_queue_success_database_update_type").change(function() {
      displayUpdateField(this, "success");
    });

    $("#task_queue_failure_database_update_type").change(function() {
      displayUpdateField(this, "failure");
    });

    $("#task-queue-enable").change(function() {
      updateTaskQueue(this);
    });

    var params = {};
    params["task_queue"] = {};
    $.ajax({
      url: "/task_queues/" + taskQueueId,
      type: "PATCH",
      data: { "task_queue": { "param": null } },
      dataType: "json",
      error() {
        window.toastr.error("Task queue preview failed, review SQL.");
      },
      success(response) {
        let columns = response.columns;

        if (typeof columns !== "undefined") {
          loadTaskQueuePreviewDataTable(columns);
        }
      }
    });

    loadCorrectInput();

    $(window).load(function() {
      $(".spinner").hide();
    });
  },

  show () {
    $.ajax({
      dataType: "json",
      url: "/" + (location.pathname+location.search).substr(1),
      cache: false,
      success(d) {
        loadTaskQueueDataTable(d.columns);
      },
      error(){
        toastr.error("Something went wrong. Please reload the page or speak to an Administrator");
      }
    });
    linkToSingleDataView();
  }
});