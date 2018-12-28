$(document).ready(function() {
  $('#layout_setting_visible_columns').bootstrapDualListbox();

  let primaryTable = $('#layout_setting_primary_table').val();

  if (primaryTable && primaryTable != "Select a primary table") {
    updateOptionsForLayoutSettingVisibleColumns(primaryTable);
  }

  $("#layout_setting_primary_table").change(function(evt) {
    toastr.success('Primary Table changed, remember to save.');
    updateOptionsForLayoutSettingVisibleColumns(evt.target.value);
  })
});

function updateOptionsForLayoutSettingVisibleColumns(primaryTable) {

let visibleColumns = $('#layout_setting_visible_columns').data('columns') ;

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
        var opt;

        if (visibleColumns.includes(val)) {
          opt = '<option value="'+ val +'" selected>'+ val +'</option>';
        } else {
          opt = '<option value="'+ val +'">'+ val +'</option>';
        }

        $("#layout_setting_visible_columns").append(opt);
      })

      $('#layout_setting_visible_columns').bootstrapDualListbox('refresh', true);
    }
  })
}
