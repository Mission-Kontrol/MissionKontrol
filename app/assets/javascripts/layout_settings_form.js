$(document).ready(function() {
  $('#layout_setting_visible_columns').bootstrapDualListbox();

  let primaryTable = $('#layout_setting_primary_table').val();

  if (primaryTable && primaryTable != "Select a primary table") {
    updateOptionsForLayoutSettingVisibleFields(primaryTable);
  }

  $("#layout_setting_primary_table").change(function(evt) {
    toastr.success('Primary Table changed, remember to save and update your fields.');
    updateOptionsForLayoutSettingVisibleFields(evt.target.value);
  })
});

function updateOptionsForLayoutSettingVisibleFields(primaryTable) {

  let selected = [];

  $.ajax({
    url: "/view_builder/table_fields",
    type: 'GET',
    data: {
      table: primaryTable
    },
    async: true,
    dataType: "json",
    error: function(XMLHttpRequest, errorTextStatus, error){
              alert("Failed: "+ errorTextStatus+" ;"+error);
           },
    success: function(data){
      $("#layout_setting_visible_columns").empty();

      $.each(data, function (i, val) {
        var opt = '<option value="'+ val +'">'+ val +'</option>'
        $("#layout_setting_visible_columns").append(opt);
      })

      $('#layout_setting_visible_columns').bootstrapDualListbox('refresh', true);
    }
  })
}
