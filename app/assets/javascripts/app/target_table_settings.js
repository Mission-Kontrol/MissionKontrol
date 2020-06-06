function toggleCheckbox () {
  $("body").on("change", ".toggle-state:checkbox", function (e) {
    let value = $(this).val();
    if (value === "false") {
      $(this).val("true");
    } else if (value === "true") {
      $(this).val("false");
    }
  });
}

$(document).ready(function() {
  toggleCheckbox();
});