function closeModal() {
  $("body").on("click", ".modal--close-btn", function () {
    var modal = $(this).parent().parent();
    modal.removeClass("show");
    modal.addClass("hide");
  });
}

$(document).ready(function() {
  closeModal();
});