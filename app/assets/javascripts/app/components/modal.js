"use strict";

function closeModal() {
  $("body").on("click", ".modal--close-btn", function () {
        var modal = $(this).parents(".show");
        modal.removeClass("show");
        modal.addClass("hide");
        $("button.table--settings").attr("disabled", false);
    });
}

$(document).ready(function () {
    closeModal();
});