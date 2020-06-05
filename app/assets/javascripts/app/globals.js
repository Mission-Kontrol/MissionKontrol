"use strict";

function loadToastr() {
  toastr.options = {
      closeButton: true,
      howMethod: "fadeIn",
      hideMethod: "fadeOut",
      preventDuplicates: true,
      timeOut: 5000
  };
}

$(document).ready(function() {
  loadToastr();

  $(".alert").fadeTo(5000, 500).slideUp(500, function(){
    $(".alert").slideUp(500);
  });

  $("[data-link]").click(function() {
    window.location.href = $(this).attr("data-link");
    return false;
  });

  // show spinner on AJAX start
  $(document).ajaxStart(function(){
    $(".spinner").show();
  });

  // hide spinner on AJAX stop
  $(document).ajaxStop(function(){
    $(".spinner").hide();
  });
});

// show spinner on AJAX start
$(document).ajaxStart(function(){
  $(".spinner").show();
});

// hide spinner on AJAX stop
$(document).ajaxStop(function(){
  $(".spinner").hide();
});

$(document).on("page:fetch", function(){
  $(".spinner").show();

});

$(document).on("page:receive", function(){
  $(".spinner").hide();
});