function submitSettings () {
  $("body").on("change", ".table--settings-nested-select, .table--settings-create-select, .table--settings-delete-select", function () {
    var databaseId = (location.pathname+location.search).substr(1).split("/")[1].charAt(0);

    $.post(
      "/table/update_settings",
      {
        table: $(this).data("table"),
        setting: $(this).data("setting"),
        value: $(this).val(),
        database_id: databaseId
      }
    );
  });
}

$(document).ready(function() {
  submitSettings();
});