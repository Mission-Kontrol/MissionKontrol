"use strict";

var draggable;
var drake;

function uncheckEditable(target, currentField) {
  target.checked = false;
  currentField.dataset["fieldEditable"] = false;
}

function checkEditable(target, currentField) {
  target.checked = true;
  currentField.dataset["fieldEditable"] = true;
}

function showWarningModalDialog(yesCallback, noCallback) {
    $("#layout-builder-editable-warning-modal").modal({
      backdrop: "static",
      keyboard: false
    });

    $("#layout-builder-editable-warning-modal-next-button").click(function() {
        yesCallback();
    });

    $("#layout-builder-editable-warning-modal-cancel-button").click(function() {
        noCallback();
    });
}

function isNotTrashContainer(containerId) {
  return containerId !== "layout-builder-draggable-trash-container";
}

function isNotFieldsContainer(containerId) {
  return containerId !== "sv_builder_primary_table_draggable_fields_container";
}

function updateLayoutBuilderContainer (containerId, containerItems) {
  var url = window.location.href;
  var id = url.split("/")[4];
  var containerParam = getContainerParam(containerId);
  var data = {};
  data["view_builder"] = {};
  let container = $("#" + containerId);

  if (containerItems.length === 0) {
    data["view_builder"][containerParam] = JSON.stringify(containerItems);
    if (!container.hasClass("layout-placeholder--border")) {
      container.addClass("layout-placeholder--border");
    }
  } else {
    data["view_builder"][containerParam] = containerItems;
    if (container.hasClass("layout-placeholder--border")) {
      container.removeClass("layout-placeholder--border");
    }
  }

  $.ajax({
    url: "/layouts/" + id,
    type: "PATCH",
    data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      console.error("PATCH /layouts/:id Failed: "+ errorTextStatus+" ;"+error);
    },
    success: function(response, status, request){
    }
  });
}

function getContainerItems(containerId) {
  let query;
  query = "#" + containerId + " " + ".layout-builder-draggable-field:not(.draggable--original):not(.draggable-mirror)";
  return document.querySelectorAll(query);
}

function getContainerItemsJSON(containerId) {
  let containerItems = getContainerItems(containerId);
  let containerItemsJSON = [];

  for (var i = 0; i < containerItems.length; i++) {
    let field = {};
    field["title"] = containerItems[i].innerText.trim();
    field["table"] = containerItems[i].dataset.fieldTable;
    field["kind"] = containerItems[i].dataset.fieldType;
    field["editable"] = containerItems[i].dataset.fieldEditable;
    containerItemsJSON.push(field);
  }

  return containerItemsJSON;
}

function getContainerParam(containerId) {
  switch(containerId) {
    case "layout-builder-draggable-header-container1":
      return "draggable_fields_header_container1";
    case "layout-builder-draggable-header-container2":
      return "draggable_fields_header_container2";
    case "layout-builder-draggable-main-container1":
      return "draggable_fields_main_container1";
    case "layout-builder-draggable-main-container2":
      return "draggable_fields_main_container2";
    case "layout-builder-draggable-main-container3":
      return "draggable_fields_main_container3";
    case "layout-builder-draggable-side-container":
      return "draggable_fields_side_container";
    default:
      console.error("unknown container - " + containerId);
      return;
  }
}

function updateLayoutRelatedTables(el) {
  let data = {};
  let layoutID = location.pathname.split("/")[2];
  data["related_table"] = el.dataset.table;

  $.ajax({
    url: "/layouts/" + layoutID + "/related_tables",
    type: "PATCH",
    data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      alert("Failed: "+ errorTextStatus+" ;"+error);
     }
  });
}

function showFieldSettingsFormScreen2() {
  $("#layout_builder_field_settings_form_screen_1").addClass("hide");
  $("#layout_builder_field_settings_form_screen_2").removeClass("hide");
}

function showFieldSettingsFormScreen1() {
  $("#layout_builder_field_settings_form_screen_2").addClass("hide");
  $("#layout_builder_field_settings_form_screen_1").removeClass("hide");
}


function removeRelatedTable() {
  let clickedTable = event.target.parentElement.parentElement;
  let containerId = "#" + "draggable-list-for-relatable-table-" + clickedTable.dataset.table;
  let data = {};
  let layoutID = location.pathname.split("/")[2];
  data['related_table'] = clickedTable.dataset.table;

  $.ajax({
    url: "/layouts/" + layoutID + "/related_tables/remove",
    type: "PATCH",
    data,
    error: function(XMLHttpRequest, errorTextStatus, error){
        alert("Failed: "+ errorTextStatus+" ;"+error);
     },
    success: function(response, status, request){
      $(clickedTable).find('i.fa-times').hide();
      $(clickedTable).appendTo(containerId);
    }
  })
}

$(document).ready(function() {
  let metaTag = $("meta[name=psj]");
  let isCurrentControllerLayout = metaTag.attr("controller") === "layout_builder";
  let isCurrentActionNew = metaTag.attr("action") === "new";

  $("body").on("click", ".clickable-row" , function() {
      window.location = $(this).data("href");
  });

  if (isCurrentControllerLayout && isCurrentActionNew) {
    $("#layout-builder-modal").modal({
      backdrop: "static",
      keyboard: false
    });
  }

  setTimeout(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, 300)
});

$(document).on("change", ".layout-builder-editable-toggle:checkbox", function(evt) {
  evt.preventDefault();
  const _this = this;
  const currentField = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  const currentFieldContainerId = currentField.parentElement.id;
  const currentFieldEditable = currentField.dataset["fieldEditable"] === "true"
  let currentFieldContainerItems;

  if (_this.checked) {
    let confirmationTitle = `Warning: You are about to make ${currentField.innerText.trim()} editable for your users`
    let confirmationText = "" +
    "Not to alarm you and you probably want to do this as it’s one of the core features. However, we wanted to make sure you were sure." +
    "\n\nMaking this field editable will mean that:" +
    "\n - Your users will be able to edit the field" +
    "\n - Any changes will be done directly on the source data" +
    "\n - The DB will have been updated so please make sure you keep backups" +
    "\n\nYou probably should not make fields editable if:" +
    "\n - They are primary or secondary keys" +
    "\n - They are fields that are calculated by your system (and so will be soon overwritten)" +
    "\n\nIf you are unsure, ask a/your developer.";

    swal(confirmationTitle, confirmationText, {
      buttons: {
        cancel: "No keep field read only",
        confirm: "Yes please make editable"
      }
    }).then((value) => {
      if (value === null) {
        uncheckEditable(_this, currentField)
      } else {
        checkEditable(_this, currentField);
        currentFieldContainerItems = getContainerItemsJSON(currentFieldContainerId);
        updateLayoutBuilderContainer(currentFieldContainerId, currentFieldContainerItems);
      }
    });
  } else {
    uncheckEditable(_this, currentField);
    currentFieldContainerItems = getContainerItemsJSON(currentFieldContainerId);
    updateLayoutBuilderContainer(currentFieldContainerId, currentFieldContainerItems);
  }
});
