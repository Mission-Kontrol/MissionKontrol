// TODO: remove this file once view_builder has been renamed to layout_buidler across the app

$(document).ready(function() {
  return
  loadTableFields();
  loadTableConfigurations();
  loadViewData();
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
          replaceArrowGlypicon();
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
        view_name: $('#View_name').val(),
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
                                var field = $('.tableField', b).data('value');
                                var position = $('.tableField', b).data('pos');
                                return { Field: field, Position: position } ;
                              }).get();
    var defaultRows = $("#defaultRows").val();
    var viewBuilderId = $("#tableOrderConfiguration").data("viewBuilderId");
    var status = $("#status").val();
    var name = $('#viewName').val();
    $.ajax({
      url: "/view_builder/" + viewBuilderId,
      type: 'PUT',
      data: {
        tableConfigurations: tableConfigurations,
        defaultRows: defaultRows,
        status: status,
        name: name
      },
      error: function(XMLHttpRequest, errorTextStatus, error){
                alert("Failed: "+ errorTextStatus+" ;"+error);
             },
      success: function(response, status, request){
        window.location = '/view_builder/' + viewBuilderId
      }
    })
  })
}

function loadViewData () {
  if($('#viewBuilderPanel').length >= 1) {
    viewBuilderId = $('#viewBuilderPanel').data("viewBuilderId");
    userId = $('#viewBuilderPanel').data("userId");
    $.ajax({
      url: "/view_builder/retrieve_data",
      type: 'GET',
      data: {
        viewBuilderId: viewBuilderId,
        userId: userId
      },
      error: function(XMLHttpRequest, errorTextStatus, error){
                alert("Failed: "+ errorTextStatus+" ;"+error);
             },
     success: function(data){
       var result = ""
       $.each(data, function (i, val) {
         result += "<tr>"
         $.each(val, function (i,val) {
           result += "<td>" + val + "</td>"
         })
         result += "</tr>"
       })
       $('#viewTableBody').append(result)
     }
    })
  }
}
