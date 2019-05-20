function hideTrashContainer() {
  $('#layout-builder-draggable-trash-container').addClass('hide');
}

function showTrashContainer() {
  $('#layout-builder-draggable-trash-container').removeClass('hide');
  $('#layout-builder-draggable-trash-container').addClass('animated zoomIn');
}

function isDataContainer(containerId) {
  return isNotTrashContainer(containerId) && isNotFieldsContainer(containerId)
}

function initializeDraggable() {
  const containers = "#layout-builder-draggable-trash-container, #layout-builder-draggable-fields-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3, #task-queue-draggable-field-settings-container";
  const dataContainers = "#layout-builder-draggable-trash-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3, #task-queue-draggable-field-settings-container";

  window.draggable = new window.Draggable.Sortable(document.querySelectorAll(containers), {
    draggable: ".layout-builder-draggable-item",
    handle: ".layout-builder-draggable-item-handle"
  });

  const fieldsContainer = document.querySelectorAll("#layout-builder-draggable-fields-container")[0];

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
      return
    }

    if (isDataContainer(sourceContainerId)) {
      saveDraggableContainer(dragEvent, sourceContainerId);
    }

    if (isDataContainer(destinationContainerId)) {
      saveDraggableContainer(dragEvent, destinationContainerId);
    }
  });
}
