let hideTrashContainer;
let showTrashContainer;
let iconForFieldType;
let containerDataContainsField;
let containerContainsDraggableItem;
let buildDraggableField;
let saveDraggableContainer;
let updateDraggableFieldsContainer;
let isDataContainer;
let initializeDraggable;

hideTrashContainer = function () {
  $("#layout-builder-draggable-trash-container").addClass("hide");
}

showTrashContainer =  function () {
  $("#layout-builder-draggable-trash-container").removeClass("hide");
  $("#layout-builder-draggable-trash-container").addClass("animated zoomIn");
}

iconForFieldType = function (fieldType) {
  switch(fieldType) {
    case "string":
    case "text":
      return "fa fa-font";
      break;
    case "time":
    case "timestamp":
      return "fa fa-clock-o";
      break;
    case "date":
    case "datetime":
      return "fa fa-calendar";
      break;
    case "boolean":
      return "fa fa-toggle-on";
      break;
    default:
      return "fa fa-font";
  }
}

containerDataContainsField = function (containerId, fieldName) {
  const el = $("#" + containerId)[0];

  if (el === undefined) {
    return;
  }

  let data = JSON.parse($("#" + containerId)[0].dataset.fieldsForContainer);

  if (data !== "[]") {
    let fields = Object.values(data);

    for (var i = 0; i < fields.length; i++) {
      if (fields[i].title === fieldName ) {
        return true;
      }
    }
  }

  return false;
}

containerContainsDraggableItem = function (containerId, fieldName) {
  let draggableItems = $(containerId + " .layout-builder-draggable-item").text().trim().split(" ");
  return draggableItems.includes(fieldName);
}

buildDraggableField = function (field) {
  var icon = iconForFieldType(field.kind);
  var item;

  if (field.editable === "true") {
    item = "<div class='layout-builder-draggable-field layout-builder-draggable-item draggable-source' data-field-table=" + field.table + " data-field-type=" + field.kind + " data-field-editable=" + field.editable + ">" +
      "<div class='row'>" +
      "<div class='col-sm-7'>" +
        "<div class = 'layout-builder-draggable-item-handle'>" +
          "<i class=" + "'" + icon + "'" + "aria-hidden='true'></i> " +
          "<span data-toggle='tooltip' data-placement='top' title = '" + field.title + "'" + "data-original-title='" + field.title + "'" +  " class='no-select'>" + field.title + "</span>" +
        "</div>" +
      "</div>" +

      "<div class='col-sm-5 text-right'>"+
        "<div class = 'layout-builder-field-editable-toggle'>" +
          "<label class='switch'>" +
              "<div class='toggle'>" +
                "<input class='layout-builder-editable-toggle toggle-state' type='checkbox' checked='" + field.editable + "'/>" +
                "<div class='toggle-inner'>" +
                   "<div class='indicator'></div>" +
                "</div>" +
                "<div class='active-bg'></div>" +
              "</div>" +
          "</label>" +
          "</div>" +
        "</div>" +
      "</div>"+
    "</div>"
  } else {
    item = "<div class='layout-builder-draggable-field layout-builder-draggable-item draggable-source' data-field-table=" + field.table + " data-field-type=" + field.kind + ">" +
      "<div class='row'>" +
        "<div class='col-sm-7'>" +
          "<div class = 'layout-builder-draggable-item-handle'>" +
            "<i class=" + "'" + icon + "'" + "aria-hidden='true'></i> " +
            "<span data-toggle='tooltip' data-placement='top' title = '" + field.title + "'" + "data-original-title='" + field.title + "'" +  " class='no-select'>" + field.title + "</span>" +
          "</div>" +
        "</div>" +

        "<div class='col-sm-5 text-right'>"+
          "<div class = 'layout-builder-field-editable-toggle'>" +
            "<label class='switch'>" +
              "<div class='toggle'>" +
                "<input class='layout-builder-editable-toggle toggle-state' type='checkbox' />" +
                "<div class='toggle-inner'>" +
                   "<div class='indicator'></div>" +
                "</div>" +
                "<div class='active-bg'></div>" +
              "</div>" +
            "</label>" +
            "</div>" +
          "</div>" +
        "</div>"+
      "</div>"
  }

  return item;
}

saveDraggableContainer = function (dragEvent, containerId) {
  let containerItemsJSON = getContainerItemsJSON(containerId);

  if (containerId === "task-queue-draggable-field-settings-container") {
    updateTaskQueueDraggableFields(containerId, containerItemsJSON);
  } else {
    updateLayoutBuilderContainer(containerId, containerItemsJSON);
  }
}

updateDraggableFieldsContainer = function (data) {
  $("#sv_builder_primary_table_draggable_fields_container").html("");
  for (var i = 0; i < data.length; i++) {
    var field = {};
    field["title"] = data[i][0];
    field["kind"] = data[i][1];
    field["table"] = data[i][2];
    let draggableField = buildDraggableField(field);

    //
    // add field to draggable container if container data contains field AND
    // contianer does not already inlcude a dragable item with the same field name.
    //

    // if (containerDataContainsField("layout-builder-draggable-header-container1", field.title)) {
    //   if (!containerContainsDraggableItem("#layout-builder-draggable-header-container1", field.title)) {
    //     $("#layout-builder-draggable-header-container1").append(draggableField);
    //   }
    // } else if (containerDataContainsField("layout-builder-draggable-header-container2", field.title)) {
    //   if (!containerContainsDraggableItem("#layout-builder-draggable-header-container2", field.title)) {
    //     $("#layout-builder-draggable-header-container2").append(draggableField);
    //   }
    // } else if (containerDataContainsField("layout-builder-draggable-side-container", field.title)) {
    //   if (!containerContainsDraggableItem("#layout-builder-draggable-side-container", field.title)) {
    //     $("#layout-builder-draggable-side-container").append(draggableField);
    //   }
    if (containerDataContainsField("layout-builder-draggable-main-container1", field.title)) {
      if (!containerContainsDraggableItem("#layout-builder-draggable-main-container1", field.title)) {
        $("#layout-builder-draggable-main-container1").append(draggableField);
      }
    } else if (containerDataContainsField("layout-builder-draggable-main-container2", field.title)) {
      if (!containerContainsDraggableItem("#layout-builder-draggable-main-container2", field.title)) {
        $("#layout-builder-draggable-main-container2").append(draggableField);
      }
    } else if (containerDataContainsField("layout-builder-draggable-main-container3", field.title)) {
      if (!containerContainsDraggableItem("#layout-builder-draggable-main-container3", field.title)) {
        $("#layout-builder-draggable-main-container3").append(draggableField);
      }
    } else if (containerDataContainsField("task-queue-draggable-field-settings-container", field.title)) {
      if (!containerContainsDraggableItem("#task-queue-draggable-field-settings-container", field.title)) {
        $("#task-queue-draggable-field-settings-container").append(draggableField);
      }
    } else {
      $("#sv_builder_primary_table_draggable_fields_container").append(draggableField);
    }
  }
}

isDataContainer = function (containerId) {
  return isNotTrashContainer(containerId) && isNotFieldsContainer(containerId);
}

initializeDraggable = function () {
  const containers = "#layout-builder-draggable-trash-container, .draggable-list-for-relatable-table, #sv_builder_primary_table_draggable_fields_container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3, #task-queue-draggable-field-settings-container";
  const dataContainers = "#layout-builder-draggable-trash-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3, #task-queue-draggable-field-settings-container";

  window.draggable = new window.Draggable.Sortable(document.querySelectorAll(containers), {
    draggable: ".layout-builder-draggable-item",
    handle: ".layout-builder-draggable-item"
  });
  const fieldsContainer = document.querySelectorAll("#sv_builder_primary_table_draggable_fields_container")[0];

  window.draggable.on("drag:start", (dragEvent) => {
    showTrashContainer();
  });

  window.draggable.on("drag:stop", (dragEvent) => {
    let currentContainer = dragEvent.source.parentNode;
    let destinationContainerId = currentContainer.id;
    let sourceContainerId = dragEvent.data.sourceContainer.id;
    let currentContainerId = currentContainer.id;
    let currentFieldValue = dragEvent.source.innerText.trim();

    hideTrashContainer();

    if (destinationContainerId === "layout-builder-draggable-trash-container") {
      fieldsContainer.insertBefore(dragEvent.source, fieldsContainer.childNodes[0]);

      setTimeout(function () {
        fieldsContainer.firstElementChild.classList.toggle("layout-builder-trash-can-item-put-back");
      }, 100);

      setTimeout(function () {
        fieldsContainer.firstElementChild.classList.toggle("layout-builder-trash-can-item-put-back");
      }, 2000);
    }

    if (sourceContainerId === destinationContainerId) {
      return;
    }

    if (isDataContainer(sourceContainerId)) {
      saveDraggableContainer(dragEvent, sourceContainerId);
    }

    if (isDataContainer(destinationContainerId)) {
      saveDraggableContainer(dragEvent, destinationContainerId);
    }
  });
};
