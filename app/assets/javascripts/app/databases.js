function submitPasswordChange () {
  $("input#database_password").on("change", function () {
    $("#database_password_changed").val(true);
  });
}

$(document).ready(function() {
  submitPasswordChange();
});
