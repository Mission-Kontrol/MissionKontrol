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


// function addPaddingToDraggableItems(containers) {
//   var containerArray = containers.split(" ");
//   let withoutLastContainer = containerArray.pop();
//   $(containerArray).each(function () {
//     var container = this.slice(0, -1);
//     var draggedItems = $(container).children(".layout-builder-draggable-field");
//     if (draggedItems.length > 1) {
//       addPaddingToContainer(draggedItems);
//     } else {
//       $(draggedItems).each(function () {
//         $(this).css({"margin": "-2px"});
//       });
//     }
//   });

//   var lastContainer = $("#layout-builder-draggable-main-container3");
//   var draggedItemsFinal = lastContainer.children(".layout-builder-draggable-field");
//   if (draggedItemsFinal.length > 1) {
//     addPaddingToContainer(draggedItemsFinal);
//   } else {
//     $(draggedItemsFinal).each(function () {
//       $(this).css({"margin": "-2px"});
//     });
//   }
// }

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
  // var containers = "#layout-builder-draggable-trash-container, #layout-builder-draggable-fields-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3";

  getOptionsForDraggable(table, databaseId);
  // addPaddingToDraggableItems(containers);
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
      // let clickedTableClass = ".draggable-list-item-for-" + clickedTable;
      // let primaryTable = $(this).data().primaryTable;
      // let header = "Fields / " + clickedTable;

      // $(".related-table-notice").addClass("hide");
      // $("[id^=draggable-list-for-relatable-table-]").not("#draggable-list-for-relatable-table-" + clickedTable).addClass("hide");
      // $("#layout_builder_selected_table_name").html(header);
      // showFieldSettingsFormScreen2();
      rebuildDraggable(table, databaseId);
      $(this).addClass('active');
      // if (clickedTable != primaryTable) {
        // $(".related-table-notice").removeClass("hide");
        // $(clickedTableClass).parent().removeClass("hide");
        // $(clickedTableClass).removeClass("hide");
        // setTimeout(function(){
        //   $("#layout-builder-draggable-fields-container .layout-builder-draggable-field" ).css( "background-color", "#c2c2c2" );
        //   $("#layout-builder-draggable-fields-container .layout-builder-draggable-field" ).css( "pointer-events", "none" );
        // }, 2000);
      // }
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