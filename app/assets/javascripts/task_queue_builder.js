let queryBuilderFilters;
let metaTag;
let isCurrentControllerTaskQueues;
let isCurrentActionIndex;
let isCurrentActionEdit;

$(document).ready(() => {
  metaTag = $("meta[name=psj]");
  isCurrentControllerTaskQueues = metaTag.attr("controller") === "task_queues";
  isCurrentActionIndex = metaTag.attr("action") === "index";
  isCurrentActionEdit = metaTag.attr('action') === "edit";

  loadIndexPage();
  loadEditPage();
})

function loadIndexPage() {
  if (isCurrentControllerTaskQueues && isCurrentActionIndex) {
    $('#new-task-queue-modal').modal({
      backdrop: 'static',
      keyboard: false
    })

    getFieldsWithType("users");

    $('#btn-get').on('click', function() {
      var result = $('#builder').queryBuilder('getRules');

      if (!$.isEmptyObject(result)) {
        $('.qb-rules').val(JSON.stringify(result, null, 2));
      }
    });

    $('#queue-builder-modal-next-button').click(function() {
      $('#new-queue-modal-screen-1').toggleClass('hide');
      $('#new-queue-modal-screen-2').toggleClass('hide');
    })

    $('#queue-builder-modal-back-button').click(function() {
      $('#new-queue-modal-screen-1').toggleClass('hide');
      $('#new-queue-modal-screen-2').toggleClass('hide');
    })

    $('#queue-builder-modal-save-button').click(function() {
      var params = {};
      params["task_queue"] = {}
      params["task_queue"]["name"] = document.getElementById('task_queue_name').value;
      params["task_queue"]["details"] = document.getElementById('task_queue_details').value;
      params["task_queue"]["table"] = document.getElementById('task_queue_table').value;
      saveTaskQueue(params);
    })
  }
}

function loadEditPage() {
  if (isCurrentControllerTaskQueues && isCurrentActionEdit) {
    let taskQueueId = document.getElementById("builder").dataset.taskQueueId;
    let taskQueueTable = document.getElementById("builder").dataset.taskQueueTable;

    getFieldsWithType(taskQueueTable);

    $('.task-queue-update-button').click(function() {
      var params = {};
      params["task_queue"] = {}
      params["task_queue"]["query_builder_rules"] = JSON.stringify($('#builder').queryBuilder('getRules'), null, 2);
      params["task_queue"]["raw_sql"] = document.getElementById('task_queue_raw_sql').value;;

      $.ajax({
        url: "/task_queues/" + taskQueueId,
        type: 'PATCH',
        data: params,
        dataType: "json",
        error: function(response, status, request) {
          console.error(status);
          toastr.error('Task queue preview failed, review SQL.');
        },
        success: function(response, status, request) {
          let rows = response.rows
          let columns = response.columns
          loadTaskQueuePreview(columns, rows);
          toastr.info('Task queue updated.');
        }
      })
    })
  }
}

function getFieldsWithType(table) {
  $.ajax({
    url: "/layouts/table_fields_with_type",
    type: 'GET',
    data: {
      table: table
    },
    async: true,
    dataType: "json",
    error: function(XMLHttpRequest, errorTextStatus, error){
              toastr.error("Invalid target database, please review credentials.")
           },
    success: function(data){
      loadQueryBuider(data);
    }
  })
}

function loadQueryBuider(data) {
  const filters = [];
  let taskQueueRules;

  for (var i = 0; i < data.length; i++) {
    var type;
    var filter = {}
    var id = data[i][0]
    filter['id'] = id

    if (data[i][1] === "inet" || data[i][1] === "text") {
      type = "string"
    } else {
      type = data[i][1]
    }

    filter['type'] = type
    filters.push(filter)
  }

  $('#builder').queryBuilder({
    filters: filters,
    allow_groups: false,
    operators: ['equal',
                'not_equal',
                'contains',
                'not_contains',
                'between',
                'not_between',
                'is_null',
                'is_not_null',
                'begins_with',
                'not_begins_with',
                'is_empty',
                'is_not_empty',
                'less',
                'less_or_equal',
                'greater',
                'greater_or_equal',
                'ends_with',
                'not_ends_with']
  });

  taskQueueRules = $("#builder").data().taskQueueRules;

  if (taskQueueRules) {
    $("#builder").queryBuilder('setRules', taskQueueRules)
  }
}

function saveTaskQueue(params) {
  // document.getElementById("queue-builder-modal-save-button").disabled = true;

  $.ajax({
    url: "/task_queues",
    type: 'POST',
    data: params,
    dataType: "json",
    error: function(response, status, request) {
      console.error(response);
      console.error(status);
      console.error(request);
      // console.log("Failed: "+ errorTextStatus+" ;"+error);
    },
    success: function(response, status, request) {
      console.log("it worked");
    }
  })
}

function loadTaskQueuePreview(columns, rows) {
  $('.task-queue-preview-table').footable({
    "columns": columns,
    "rows": rows
  });
}
