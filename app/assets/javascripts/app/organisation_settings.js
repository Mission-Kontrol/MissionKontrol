$(document).ready(function () {
  $("#organisation_setting_company_name, #organisation_setting_license_key").bind("keyup", function() {
    var form = $(this).form;
    var action = $(form).attr("action");
    var method = $(form).attr("method");

    var value = $(this).val();

    $.ajax({
      method: method,
      url: action,
      data: { field_name: value },
      dataType: "script"
    });
  });
})