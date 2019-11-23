function submitSettings () {
  $("body").on("change", ".table--settings-nested-select, .table--settings-create-select, .table--settings-delete-select", function () {
    $.post(
      "/table/update_settings",
      {
        table: $(this).data("table"),
        setting: $(this).data("setting"),
        value: $(this).val()
      }
    );
  });
}

$(document).ready(function() {
  submitSettings();
});