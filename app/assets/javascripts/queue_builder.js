var queryBuilderFilters;

$(document).ready(() => {
  let metaTag = $('meta[name=psj]');
  let isCurrentControllerQueues = metaTag.attr('controller') == 'queues';
  let isCurrentActionIndex = metaTag.attr('action') == 'index';

  if (isCurrentControllerQueues && isCurrentActionIndex) {
    $('#new-queue-modal').modal({
      // backdrop: 'static',
      // keyboard: false
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
  }
})


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

  for (var i = 0; i < data.length; i++) {
    var type;
    var filter = {}
    var id = data[i][0]
    filter['id'] = id

    if (data[i][1] === "inet") {
      type = "string"
    } else {
      type = data[i][1]
    }

    filter['type'] = type
    filters.push(filter)
  }

  $('#builder').queryBuilder({
    filters: filters
  });
}
