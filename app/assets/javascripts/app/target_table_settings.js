function submitSettings () {
  $("body").on("change", ".table--settings-nested-select, .table--settings-create-select, .table--settings-delete-select", function () {
    var tableName = $(this).data("table");
    var setting = $(this).data("setting");
    var value = $(this).val();


    $.post(
      "/table/update_settings",
      {
        table: tableName,
        setting: setting,
        value: value
      }
    );
  });
}

$(document).ready(function() {
  submitSettings()
});