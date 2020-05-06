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

function toggleInlineEditableField () {
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
}


function getOptionsForDraggable (primaryTable) {
  $.ajax({
    url: "/layouts/table_fields_with_type",
    type: "GET",
    data: {
      table: primaryTable,
      id: location.pathname.substr(1).split("/")[1]
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

function rebuildDraggable(table) {
  if (draggable) {
    draggable.destroy();
  }

  rebuildDraggableDataContainers();

  getOptionsForDraggable(table);
  initializeDraggable();
}

function loadDraggableFields () {
  $(".sv_builder_table_navigation").click(function(evt) {
    evt.preventDefault();
    if ($(this).hasClass("active")) {
      $("#sv_builder_primary_table_draggable_fields_container").html("");
      $(this).removeClass("active");
    } else {
      let table = $(this).data().tableName;

      rebuildDraggable(table);
      $(this).addClass("active");
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

Paloma.controller("LayoutBuilder", {
  new () {
    $("#layout-builder-modal").modal({
      backdrop: "static",
      keyboard: false
    });
  },
  edit () {
    toggleInlineEditableField();
    rebuildDraggableDataContainers();
    initializeDraggable();
    loadDraggableFields();
    initializeDragula();
  }
});
