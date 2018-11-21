$(document).ready(function() {
  loadTableFields();
  loadTableConfigurations();
});

function loadDualSelect () {
  $('#bootstrap-duallistbox-nonselected-list_').bootstrapDualListbox({
    selectorMinimalHeight: 160,
    moveOnSelect: true,
    infoText: false,
    bootstrap3Compatible: true
  });
}

function loadTableFields () {
  $('#Select_table').change(function(e) {
    if($(this).val() === 'Select Table') {
      return false
    } else {
      $('#bootstrap-duallistbox-nonselected-list_').bootstrapDualListbox('destroy', true)
      $.ajax({
        url: "/view_builder/table_fields",
        type: 'GET',
        data: {
          table: $(this).val()
        },
        async: true,
        dataType: "json",
        error: function(XMLHttpRequest, errorTextStatus, error){
                  alert("Failed: "+ errorTextStatus+" ;"+error);
               },
        success: function(data){
          $("#field_select").remove()
          $("#fieldSelect").append(
            "<div id='field_select' class='bootstrap-duallistbox-container row'> \
              <div class='col-sm-8'> \
                <select multiple='multiple' id='bootstrap-duallistbox-nonselected-list_' class='form-control field-select-options'> \
                </select> \
              </div> \
              <div class='col-sm-2'> \
                <button type='button' class='btn btn-block btn-primary margin-top-20' id='saveFieldConfiguration'>Next</button> \
              </div> \
            </div>"
          )
          $.each(data, function (i, val) {
            var opt = '<option value="'+ val +'">'+ val +'</option>'
            $("#bootstrap-duallistbox-nonselected-list_").append(opt);
          })
          loadDualSelect();
          saveFieldConfiguration();
        }
      })
    }
  });
}

function saveFieldConfiguration () {
  $('#saveFieldConfiguration').click(function() {
    var selectedOptions = $('#bootstrap-duallistbox-selected-list_ option').map(function () {
      return $(this).val();
    }).get()
    $.ajax({
      url: "/view_builder",
      type: 'POST',
      data: {
        table: $('#Select_table').val(),
        selectedOptions: selectedOptions
      },
      error: function(XMLHttpRequest, errorTextStatus, error){
                alert("Failed: "+ errorTextStatus+" ;"+error);
             },
      success: function(response, status, request){
        $('body').html(response);
      }
    })
  })
}

function loadTableConfigurations () {
  $('#updateFieldConfiguration').click(function() {
    var tableConfigurations = $('#tableOrderConfiguration tr').map(function (a, b) {
                                var field = $('.tableField', b).text();
                                // var position = $('.tablePosition', b).text();
                                return field ;
                              }).get();
    var defaultRows = $("#default_rows").val()
    var viewBuilder = $("#tableOrderConfiguration").data("viewBuilder")
    $.ajax({
      url: "/view_builder/" + viewBuilder,
      type: 'PUT',
      data: {
        tableConfigurations: tableConfigurations,
        defaultRows: defaultRows
      },
      error: function(XMLHttpRequest, errorTextStatus, error){
                alert("Failed: "+ errorTextStatus+" ;"+error);
             },
      success: function(response, status, request){
        $('body').html(response);
      }
    })
  })
}


// https://forum.jquery.com/topic/moving-table-rows-up-or-down-and-dynamically-adjusting-each-row-s-sequence-id
