"use strict";

function closeModal() {
  $("body").on("click", ".modal--close-btn", function () {
        var modal = $(this).parents(".show");
        modal.removeClass("show");
        modal.addClass("hide");
    });
}

$(document).ready(function () {
    closeModal();
});