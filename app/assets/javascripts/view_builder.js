$(document).ready(function() {
  loadTableFields();
  loadDualSelect();
});

var demo2 = $('.field_select_options').bootstrapDualListbox({
  selectorMinimalHeight: 160,
  moveOnSelect: true,
  infoText: false,
  bootstrap3Compatible: true
});

function loadDualSelect () {
  $('.field_select_options').bootstrapDualListbox({
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
      $.ajax({
        url: "/view_builder/table_fields", // this will be routed
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
          $("#bootstrap-duallistbox-nonselected-list_").empty()
          $('.field_select_options').bootstrapDualListbox().trigger('bootstrapduallistbox.refresh', true);
          for(var i in data)
            {
              var value = data[i];
              $("#bootstrap-duallistbox-nonselected-list_").append('<option value="'+ value +'">'+ value +'</option>');
              $('.field_select_options').bootstrapDualListbox().trigger('bootstrapduallistbox.refresh', true);
            }
          }
        })
      }
  });
}
