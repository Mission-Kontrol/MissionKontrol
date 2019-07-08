function goToRegistrationStep(step) {
  $("#registration-step-1, #registration-step-2").toggleClass("hide");
}

function checkPasswordMatch() {
  let password = $("#admin_user_password").val();
  let confirmPassword = $("#admin_user_password_confirmation").val();

   if (password === confirmPassword) {
    $("#password-mismatch").hide();
    $("#next-registration-step").attr("disabled", false);
  } else {
    $("#password-mismatch").show();
    $("#next-registration-step").attr("disabled", true);
  }
}

$(document).ready(function () {
  $('#password-mismatch').hide()
  $("#admin_user_password, #admin_user_password_confirmation").keyup(function() {
    checkPasswordMatch()
  });
});

