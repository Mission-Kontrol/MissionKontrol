function showEditable(evt) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContentWrapper = editableRow.getElementsByClassName("editable-content-wrapper")[0];
  let editableInput = editableRow.getElementsByClassName("editable-input")[0];

  editableContentWrapper.style.display = "none";
  editableInput.style.display = "block";
  editableInput.children[0].focus();

  return true;
}

function cancelEditable(evt) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContentWrapper = editableRow.getElementsByClassName("editable-content-wrapper")[0];
  let editableInput = editableRow.getElementsByClassName("editable-input")[0];

  editableContentWrapper.style.display = "block";
  editableInput.style.display = "none";
}

function hideEditable(editableRow) {
  let editableContentWrapper = editableRow.getElementsByClassName("editable-content-wrapper")[0]
  let editableInput = editableRow.getElementsByClassName("editable-input")[0];

  editableContentWrapper.style.display = "block";
  editableInput.style.display = "none";
}

function updateTableField(evt, table, field, id) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContent = editableRow.getElementsByClassName("editable-content")[0];
  let editableInput = editableRow.getElementsByClassName("editable-input")[0];
  let currentValue = editableContent.innerText.trim();
  let newValue = editableInput.children[0].value;

  if (currentValue === newValue) {
    cancelEditable(evt);
    return;
  }

  let data = {};
  data["table_field"] = {};
  data["table_field"]["table"] = table;
  data["table_field"]["id"] = id;
  data["table_field"]["field"] = field;
  data["table_field"]["value"] = newValue;

  $.ajax({
    url: "/table_field",
    type: "PATCH",
    data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      if (XMLHttpRequest.status == 400) {
        prepareLongToast();
        toastr.error(XMLHttpRequest.responseJSON.error);
      }

      console.error("PATCH /table_field Failed: "+ errorTextStatus+" ;"+error);
    },
    success: function(response, status, request){
      refreshEditableContent(editableContent, newValue);
      hideEditable(editableRow);
      toastr.info("Table field successfully updated.");
    }
  });
}

function updateRelatedTableField(evt, table, field, foreignKeyTitle, foreignKeyValue) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContent = editableRow.getElementsByClassName("editable-content")[0];
  let editableInput = editableRow.getElementsByClassName("editable-input")[0];
  let currentValue = editableContent.innerText.trim();
  let newValue = editableInput.children[0].value;

  if (currentValue === newValue) {
    cancelEditable(evt);
    return;
  }

  let data = {};
  data["related_table_field"] = {};
  data["related_table_field"]["table"] = table;
  data["related_table_field"]["foreign_key_value"] = foreignKeyValue;
  data["related_table_field"]["foreign_key_title"] = foreignKeyTitle;
  data["related_table_field"]["field"] = field;
  data["related_table_field"]["value"] = newValue;

  $.ajax({
    url: "/related_table_field",
    type: "PATCH",
    data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      if (XMLHttpRequest.status === 400) {
        prepareLongToast();
        toastr.error(XMLHttpRequest.responseJSON.error);
      }

      console.error("PATCH /table_field Failed: "+ errorTextStatus+" ;"+error);
    },
    success: function(response, status, request){
      refreshEditableContent(editableContent, newValue);
      hideEditable(editableRow);
      toastr.info("Related table field successfully updated.");
    }
  });
}

function refreshEditableContent(editableContent, newValue) {
  editableContent.innerText = newValue;
}