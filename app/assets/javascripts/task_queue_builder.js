let queryBuilderFilters;
let metaTag;
let isCurrentControllerTaskQueues;
let isCurrentActionIndex;
let isCurrentActionEdit;
let getOptionsForDraggable;
let loadTaskQueuePreview;
let initQueryBuilder;
let buildFilterForDataType;
let loadQueryBuilder;
let getFieldsWithType;
let disableElementbyId;
let saveTaskQueue;
let updateTaskQueueDraggableFields;
let updateTaskQueueItemFeed;
let addToTaskQueueActivityStream;
let applyOutcomeRule;
let loadIndexPage;
let loadEditPage;

getOptionsForDraggable = function (primaryTable) {
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
  });
}

initQueryBuilder = function (filters) {
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

  if ($.isEmptyObject(taskQueueRules) ) {
    console.log("no rule present")
  } else {
    $("#builder").queryBuilder("setRules", taskQueueRules);
  }
}

buildFilterForDataType = function (type, id) {
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

loadQueryBuilder = function (data) {
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

getFieldsWithType = function (table) {
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

disableElementbyId = function (id) {
  $("#" + id).attr("disabled", true);
}

saveTaskQueue = function (params) {
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

updateTaskQueueDraggableFields = function (containerId, containerItems) {
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
      refreshTaskQueuePreviewSettings();
    }
  });
}

loadTaskQueuePreview = function (columns, rows) {
  $(".task-queue-preview-table").footable({
    columns,
    rows
  });
}

updateTaskQueueItemData = function (data) {
  const entries = Object.entries(data.row)
  $('#task_queue_item_data').empty();

  for (var i = 0; i < entries.length; i++) {
    const entryHtml = "<p><b>" + entries[i][0]+ "</b>: <span>" + entries[i][1]+ "</span></p>"
    $('#task_queue_item_data').append(entryHtml);
  }
}

addToTaskQueueActivityStream = function(kind, content, time, author) {
  let streamIcon;
  let stream;

  if (kind === 'note') {
    streamIcon = "fa fa-pencil";
  } else if (kind === 'call') {
    streamIcon = "fa fa-phone";
  } else if (kind === "meeting") {
    streamIcon = "fa fa-calendar";
  } else {
    streamIcon = "fa fa-circle";
  }

  stream = "<div class='stream'>" +
    "<div class='stream-badge'>" +
      "<i class='" + streamIcon + "'></i>" +
    "</div>" +
    "<div class='stream-panel'>" +
      "<div class='stream-info'>" +
        "<a href=''>" +
          "<img src='/assets/a2-22c5f70142282015b1aa1e8611a895fed56efb2db0045afe0fa124d2a1973d3c.jpg' />" +
          "<span>" + author + "</span>" +
          "<span class='date'>" + moment(time).fromNow() + "</span>" +
        "</a>" +
      "</div>" +
      content +
    "</div>" +
  "</div>";

  $('#task-queue-record-activity-stream').append(stream);

  if (kind === 'note') {
    $('#task-queue-record-note-activity-stream').append(stream);
  } else if (kind === 'call') {
    $('#task-queue-record-call-activity-stream').append(stream);
  } else {
    $('#task-queue-record-meeting-activity-stream').append(stream);
  }
}

updateTaskQueueItemFeed = function (data) {
  const entries = Object.entries(data.activities)
  $('#task-queue-record-activity-stream').empty();
  $('#task-queue-record-note-activity-stream').empty();
  $('#task-queue-record-call-activity-stream').empty();
  $('#task-queue-record-meeting-activity-stream').empty();

  for (var i = 0; i < entries.length; i++) {
    addToTaskQueueActivityStream(entries[i][1].kind, entries[i][1].content, entries[i][1]["created_at"], data.author)
  }
}

getTaskQueueItem = function (taskQueueId, taskQueueItemPrimaryKey) {
  let data = {};
  let url = "/task_queues/" + taskQueueId + "/record";

  data["task_queue_item_primary_key"] = taskQueueItemPrimaryKey;
  data["task_queue_id"] = taskQueueId;

  $.ajax({
    url,
    type: "GET",
    data,
    async: true,
    dataType: "json",
    error(XMLHttpRequest, errorTextStatus, error){
              window.toastr.error("Something went wrong, please try again.");
           },
    success(data){
      updateTaskQueueItemData(data);
      updateTaskQueueItemFeed(data);
    }
  });
}

applyOutcomeRule = function (outcome) {
  let table = $('#task-queue-item-modal').data('taskQueueTable');
  let primaryKey = $('#task-queue-item-modal').data('taskQueueItemPrimaryKey');
  let taskQueueId = $('#task-queue-item-modal').data('taskQueueId');
  let url = "/task_queues/" + taskQueueId + "/outcome";
  let data = {};

  data['outcome'] = outcome;
  data['table'] = table;
  data['primary_key'] = primaryKey;
  data['task_queue_id'] = taskQueueId;

  $.ajax({
    url,
    type: "POST",
    data,
    async: true,
    dataType: "json",
    error(XMLHttpRequest, errorTextStatus, error){
              window.toastr.error("Something went wrong, please try again.");
           },
    success(data){
      window.toastr.success("Task queue outcome updated.");
    }
  });
}

loadIndexPage = function () {
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

loadEditPage = function () {
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

      params["task_queue"]["details"] = document.getElementById("task_queue_details").value;
      params["task_queue"]["name"] = document.getElementById("task_queue_name").value;
      params["task_queue"]["success_outcome_title"] = document.getElementById("task_queue_success_outcome_title").value;
      params["task_queue"]["success_outcome_timeout"] = document.getElementById("task_queue_success_outcome_timeout").value;
      params["task_queue"]["failure_outcome_title"] = document.getElementById("task_queue_failure_outcome_title").value;
      params["task_queue"]["failure_outcome_timeout"] = document.getElementById("task_queue_failure_outcome_timeout").value;

      $.ajax({
        url: "/task_queues/" + taskQueueId,
        type: "PATCH",
        data: params,
        dataType: "json",
        error(response, status, request) {
          window.toastr.error("Task queue preview failed, review SQL.");
        },
        success(response, status, request) {
          let columns = response.columns;

          if (typeof columns !== "undefined") {
            loadTaskQueuePreviewDataTable(columns);
          }

          window.toastr.info("Task queue updated.");
        }
      });
    });

    $(document).on('click','.task-queue-item', function() {
      let taskQueueTable = $(this).parent().parent().data().tableName;
      let taskQueueItemPrimaryKey = $(this).data().taskQueueItemPrimaryKey;
      let taskQueueId = $('#task-queue-item-modal').data().taskQueueId;

      $('#task-queue-item-modal').data('taskQueueTable', taskQueueTable);
      $('#task-queue-item-modal').data('taskQueueItemPrimaryKey', taskQueueItemPrimaryKey);
      $('#task-queue-item-modal').modal({});

      getTaskQueueItem(taskQueueId, taskQueueItemPrimaryKey)
    })

    $("#task-queue-record-activity-form").submit( function() {
      let taskQueueItemPrimaryKey = $('#task-queue-item-modal').data('taskQueueItemPrimaryKey');
      $(this).append("<input type='hidden' name='activity[feedable_id]' value='" + taskQueueItemPrimaryKey + "'/>");
      return true;
    });

    getOptionsForDraggable("users");

    initializeDraggable();
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
