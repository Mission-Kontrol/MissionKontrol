"use strict";

function getOptionsForDraggable (primaryTable, databaseId) {
  $.ajax({
    url: "/layouts/table_fields_with_type",
    type: "GET",
    data: {
      table: primaryTable,
      id: databaseId
    },
    async: true,
    dataType: "json",
    error(XMLHttpRequest, errorTextStatus, error){
              window.toastr.error("Invalid target database, please review credentials.");
           },
    success(data){
      updateDraggableFieldsContainer(data);
    }
  });
}

function rebuildDraggableDataContainers() {
  var dataContainerIds = [
    "#layout-builder-draggable-main-container1",
    "#layout-builder-draggable-main-container2",
    "#layout-builder-draggable-main-container3"
  ];

  for (var i = 0; i < dataContainerIds.length; i++) {
    let containerId = dataContainerIds[i];
    let data = JSON.parse($(containerId)[0].dataset.fieldsForContainer);

    if (data !== "[]") {
      let fieldsForContainer = Object.values(data);

      for (var j = 0; j < fieldsForContainer.length; j++) {
        let field = fieldsForContainer[j];
        if (!containerContainsDraggableItem(containerId, field.title)) {
          let draggableField = buildDraggableField(field);
          $(containerId).append(draggableField);
        }
      }
    }
  }
}

function rebuildDraggable(table, databaseId) {
  if (draggable) {
    draggable.destroy();
  }

  rebuildDraggableDataContainers();

  getOptionsForDraggable(table, databaseId);
  initializeDraggable();
}

function loadDraggableFields () {
  $(".sv_builder_table_navigation").click(function(evt) {
    evt.preventDefault();
    if ($(this).hasClass('active')) {
      $("#sv_builder_primary_table_draggable_fields_container").html("");
      $(this).removeClass('active');
    } else {
      let table = $(this).data().tableName;
      let databaseId = $(this).data().databaseId;

      rebuildDraggable(table, databaseId);
      $(this).addClass('active');
    }
  });
}

function initializeDragula () {
  drake = dragula([...document.querySelectorAll(".draggable-list-for-relatable-table"), document.querySelector("#droppable-list-of-relatable-tables")]);

  drake.on("drop", (el) => {
    $(el).find(".remove-related-table").removeClass("hide");
    $(el).find("i.fa-times").show();
    updateLayoutRelatedTables(el);
  });
}

$(document).ready(function () {
  rebuildDraggableDataContainers();
  initializeDraggable();
  loadDraggableFields();
  initializeDragula();
});