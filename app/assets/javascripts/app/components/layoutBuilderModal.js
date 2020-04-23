"use strict";

function goToNextScreen () {
  $("#layout-builder-modal-next-button").click(function() {
    $("#layout-builder-modal-screen-1").toggleClass("hide");
    $("#layout-builder-modal-screen-2").toggleClass("hide");
  });
}

function goToPreviousScreen () {
  $("#layout-builder-modal-back-button").click(function() {
    $("#layout-builder-modal-screen-1").toggleClass("hide");
    $("#layout-builder-modal-screen-2").toggleClass("hide");
  });
}

function saveLayout(name, primaryTable, ignoreModal, databaseId) {
  var layoutID;
  var redirectURL;

  $.ajax({
    url: "/layouts",
    type: "POST",
    data: {
      table: primaryTable,
      view_name: name,
      ignore_modal: ignoreModal,
      database_id: databaseId
    },
    error: function(XMLHttpRequest, errorTextStatus, error){
              alert("Failed: "+ errorTextStatus+" ;"+error);
           },
    success: function(response, status, request){
      layoutID = response.id;
      redirectURL = "/layouts/" + layoutID + "/edit";
      window.location.replace(redirectURL);
    }
  });
}

function layoutBuilderModalSave () {
  $("#layout-builder-modal-save-button").click(function() {
    var ignoreModal = $("#layout-builder-modal-ignore-checkbox").is(":checked");
    var layoutName = document.getElementById("layout-builder-modal-form-name").value;
    var layoutPrimaryTable = document.getElementById("layout-builder-modal-form-primary-table").value;
    var databaseId = $(this).data('database-id');
    saveLayout(layoutName, layoutPrimaryTable, ignoreModal, databaseId);
  });
}

function modalButtonActions () {
  goToNextScreen();
  goToPreviousScreen();
  layoutBuilderModalSave();
}

$(document).ready(function () {
  modalButtonActions();
});
