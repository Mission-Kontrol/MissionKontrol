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

Paloma.controller("LayoutBuilder", {
  edit () {
    toggleInlineEditableField();
  }
});