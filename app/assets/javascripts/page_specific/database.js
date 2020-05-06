function submitPasswordChange () {
  $("input#database_password").on("change", function () {
    $("#database_password_changed").val(true);
  });
}

function clearGemCredentials () {
  $("#remove-gem-connection").on("click", function () {
    $("#database_domain_url").val("");
    $("#database_gem_token").val("");
  });
}

Paloma.controller("Databases", {
  new () {
    submitPasswordChange();
  },

  edit () {
    submitPasswordChange();
    clearGemCredentials();
  }
});