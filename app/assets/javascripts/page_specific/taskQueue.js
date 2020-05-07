function loadResults () {
  $("#task-queue-update-button").click(function() {
    let taskQueueId = document.getElementById("builder").dataset.taskQueueId;
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
}

Paloma.controller("TaskQueues", {
  new () {
    $("#task-queue-modal").modal({
      backdrop: "static",
      keyboard: false
    });
  },
  edit () {
    loadResults();
  }
});