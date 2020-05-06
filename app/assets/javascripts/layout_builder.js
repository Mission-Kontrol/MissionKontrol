"use strict";

var draggable;
var drake;

function isNotTrashContainer(containerId) {
  return containerId !== "layout-builder-draggable-trash-container";
}

function isNotFieldsContainer(containerId) {
  return containerId !== "sv_builder_primary_table_draggable_fields_container";
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
