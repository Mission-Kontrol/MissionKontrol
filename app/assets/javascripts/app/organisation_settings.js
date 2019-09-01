$(document).ready(function () {
  $("#organisation_setting_company_name, #organisation_setting_license_key").bind('keyup', function() {
    var form = $(this).form
    var action = $(form).attr('action')
    var method = $(form).attr('method')
    var field_name = $(this).name.split('[')[1].split(']')[0]

    var value = $(this).val()

    $.ajax({
      method: method,
      url: action,
      data: { field_name: value },
      dataType: 'script'
    })
  })
})