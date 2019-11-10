function submitStatusChange () {
  $('body').on("change", "#user--edit-status:checkbox", function (e) {
    var id = $(this).data('user')
    $.post(
      "/admin_users/update_status",
      {
        id: id
      }
    )
  });
}

function submitTeamChange () {
  $('body').on("change", ".user--team-select", function () {
    var id = $(this).data('user');
    var role = $(this).val();
    $.post(
      "/admin_users/update_role",
      {
        id: id,
        role: role,
      }
    )
  })
}

$(document).ready(function() {
  submitStatusChange();
  submitTeamChange();
})