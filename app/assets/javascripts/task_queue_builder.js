let queryBuilderFilters;
let metaTag;
let isCurrentControllerTaskQueues;
let isCurrentActionIndex;
let isCurrentActionEdit;
let taskQueuePreviewSlider;

function getOptionsForDraggable(primaryTable) {
  $.ajax({
    url: "/layouts/table_fields_with_type",
    type: "GET",
    data: {
      table: primaryTable
    },
    async: true,
    dataType: "json",
    error(XMLHttpRequest, errorTextStatus, error){
              window.toastr.error("Invalid target database, please review credentials.");
           },
    success(data){
      updateDraggableFieldsContainer(data);
    }
  })
}

function loadTaskQueuePreview(columns, rows) {
  $(".task-queue-preview-table").footable({
    columns,
    rows
  });
}

function initQueryBuilder(filters) {
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

  if (taskQueueRules) {
    $("#builder").queryBuilder("setRules", taskQueueRules);
  }
}

function buildFilterForDataType(type, id) {
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

function loadQueryBuilder(data) {
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

function getFieldsWithType(table) {
  $.ajax({
    url: "/layouts/table_fields_with_type",
    type: "GET",
    data: {
      table
    },
    async: true,
    dataType: "json",
    error(XMLHttpRequest, errorTextStatus, error) {
              window.toastr.error("Invalid target database, please review credentials.");
           },
    success(data){
      loadQueryBuilder(data);
    }
  });
}

function disableElementbyId(id) {
  $("#" + id).attr("disabled", true);
}

function saveTaskQueue(params) {
  disableElementbyId("queue-builder-modal-save-button");
  disableElementbyId("queue-builder-modal-back-button");

  $.ajax({
    url: "/task_queues",
    type: "POST",
    data: params,
    dataType: "json",
    error(response, status, request) {
      let responseJson = response.responseJSON;
      for (var i = 0; i < responseJson.length; i++) {
        let errorMessage = toString(responseJson[i]);
        window.toastr.error(errorMessage);
      }
      window.toastr.error("Failed to save task queue.");
      disableElementbyId("queue-builder-modal-save-button");
      disableElementbyId("queue-builder-modal-back-button");
    },
    success(response, status, request) {
      window.toastr.info("Task queue saved.");
      let redirectURL = "/task_queues/" + response.id + "/edit";
      window.location.replace(redirectURL);
    }
  });
}

function updateTaskQueueDraggableFields(containerId, containerItems) {
  let containers = "#layout-builder-draggable-trash-container, #layout-builder-draggable-fields-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3";
  var url = window.location.href;
  var id = url.split("/")[4];
  var containerParam = "draggable_fields";
  var data = {};
  data["task_queue"] = {};

  if (containerItems.length === 0) {
    data["task_queue"][containerParam] = JSON.stringify(containerItems);
  } else {
    data["task_queue"][containerParam] = containerItems;
  }

  $.ajax({
    url: "/task_queues/" + id,
    type: "PATCH",
    data,
    error(XMLHttpRequest, errorTextStatus, error){
      window.toastr.error(XMLHttpRequest.responseJSON.error);
    },
    success(response, status, request){
      window.toastr.info("Task queue fields successfully updated.");
    }
  });
}

function loadPreviewSlider() {
  taskQueuePreviewSlider = window.simpleslider.getSlider({
    paused: true,
    prop: "right",
    onChangeEnd: updateSliderCurrentIndex
  });

  var currentRowId = $("#layout-preview-slider-container").children()[slider.currentIndex()].dataset.rowId
  $("#layout-preview-row-id").text(currentRowId);

  function updateSliderCurrentIndex() {
    var currentRowId = $("#layout-preview-slider-container").children()[slider.currentIndex()].dataset.rowId
    $("#layout-preview-row-id").text(currentRowId);
  }
}

function loadIndexPage() {
  if (isCurrentControllerTaskQueues && isCurrentActionIndex) {
    $("#new-task-queue-modal").modal({
      backdrop: "static",
      keyboard: false
    });

    getFieldsWithType("users");

    $("#queue-builder-modal-next-button").click(function() {
      $("#new-queue-modal-screen-1").toggleClass("hide");
      $("#new-queue-modal-screen-2").toggleClass("hide");
    });

    $("#queue-builder-modal-back-button").click(function() {
      $("#new-queue-modal-screen-1").toggleClass("hide");
      $("#new-queue-modal-screen-2").toggleClass("hide");
    });

    $("#queue-builder-modal-save-button").click(function() {
      var params = {};
      params["task_queue"] = {};
      params["task_queue"]["name"] = document.getElementById("task_queue_name").value;
      params["task_queue"]["details"] = document.getElementById("task_queue_details").value;
      params["task_queue"]["table"] = document.getElementById("task_queue_table").value;
      saveTaskQueue(params);
    });
  }
}

function loadEditPage() {
  if (isCurrentControllerTaskQueues && isCurrentActionEdit) {
    let taskQueueId = document.getElementById("builder").dataset.taskQueueId;
    let taskQueueTable = document.getElementById("builder").dataset.taskQueueTable;

    getFieldsWithType(taskQueueTable);

    $(".task-queue-update-button").click(function() {
      var params = {};
      params["task_queue"] = {};

      if ($("#builder").queryBuilder("getRules") != null) {
        params["task_queue"]["query_builder_rules"] = JSON.stringify($("#builder").queryBuilder("getRules"), null, 2);
      }

      if ($("#builder").queryBuilder("getSQL") != null) {
        params["task_queue"]["query_builder_sql"] = $("#builder").queryBuilder("getSQL").sql;
      }

      params["task_queue"]["raw_sql"] = document.getElementById("task_queue_raw_sql").value;

      $.ajax({
        url: "/task_queues/" + taskQueueId,
        type: "PATCH",
        data: params,
        dataType: "json",
        error(response, status, request) {
          window.toastr.error("Task queue preview failed, review SQL.");
        },
        success(response, status, request) {
          let rows = response.rows;
          let columns = response.columns;

          if (rows !== undefined && columns !== undefined) {
            loadTaskQueuePreview(columns, rows);
          }

          window.toastr.info("Task queue updated.");
        }
      });
    });

    getOptionsForDraggable("users");

    initializeDraggable();

    loadPreviewSlider();
  }
}

$(document).ready(() => {
  metaTag = $("meta[name=psj]");
  isCurrentControllerTaskQueues = metaTag.attr("controller") === "task_queues";
  isCurrentActionIndex = metaTag.attr("action") === "index";
  isCurrentActionEdit = metaTag.attr("action") === "edit";

  loadIndexPage();
  loadEditPage();
});
