var draggable;
var slider;
var drake;

$(document).ready(function() {
  let metaTag = $('meta[name=psj]');
  let isCurrentControllerLayout = metaTag.attr('controller') == 'layout_builder';
  let isCurrentActionNew = metaTag.attr('action') == 'new';
  let isCurrentActionEdit = metaTag.attr('action') == 'edit';
  let containers = '#layout-builder-draggable-trash-container, #layout-builder-draggable-fields-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3'
  let isCurrentActionPreview = metaTag.attr('action') == 'preview';

  prepareNormalToast();
  addPaddingToDraggableItems(containers);

  $("body").on('click', '.clickable-row' , function() {
      window.location = $(this).data("href");
  });

  if (isCurrentControllerLayout && isCurrentActionPreview) {
    slider = simpleslider.getSlider({
      paused: true,
      prop: 'right',
      onChangeEnd: updateSliderCurrentIndex
    });

    var currentRowId = $('#layout-preview-slider-container').children()[slider.currentIndex()].dataset.rowId
    $('#layout-preview-row-id').text(currentRowId);

    function updateSliderCurrentIndex() {
      var currentRowId = $('#layout-preview-slider-container').children()[slider.currentIndex()].dataset.rowId
      $('#layout-preview-row-id').text(currentRowId);
    }
  }

  if (isCurrentControllerLayout && isCurrentActionNew) {
    $('#layout-builder-modal').modal({
      backdrop: 'static',
      keyboard: false
    })
  }

  if (isCurrentControllerLayout && isCurrentActionEdit) {
    drake = dragula([document.querySelector('#draggable-list-of-relatable-tables'), document.querySelector('#droppable-list-of-relatable-tables')]);

    drake.on('drop', (el) => {
      $(el).find(".remove-related-table").removeClass("hide");
      $(el).find('i.fa-times').show();
      updateLayoutRelatedTables(el);
    })
  }

  if (isCurrentControllerLayout && (isCurrentActionNew || isCurrentActionEdit)) {
    $('.layout-builder-nav-item').click(function(evt) {
      evt.preventDefault();

      let currentTable = $('#view_builder_table_name').data('table-name');

      var tabName = $(this).data().tabName;

      tablinks = document.getElementsByClassName("layout-builder-nav-item");

      for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
      }

      evt.currentTarget.className += " active";


      goToTab(tabName);
    })

    $('.layout_builder_selected_table_name').click(function(evt) {
      evt.preventDefault();
      $(".related-table-notice").addClass('hide');
      $(".draggable-list-item-for-relatable-table").addClass('hide');

      let clickedTable = $(this).data().tableName;
      let clickedTableClass = ".draggable-list-item-for-" + clickedTable;
      let primaryTable = $(this).data().primaryTable;
      let header = "Fields / " + clickedTable;

      $('#layout_builder_selected_table_name').html(header);
      showFieldSettingsFormScreen2();
      rebuildDraggable(clickedTable);

      if (clickedTable != primaryTable) {
        $(".related-table-notice").removeClass('hide');
        $(clickedTableClass).removeClass('hide');
        setTimeout(function(){
          $("#layout-builder-draggable-fields-container .layout-builder-draggable-field" ).css( 'background-color', '#c2c2c2' );
          $("#layout-builder-draggable-fields-container .layout-builder-draggable-field" ).css( 'pointer-events', 'none' );
        }, 2000);
      }
    })

    $('.layout_builder_field_settings_form_back_btn').click(function(e) {
      e.preventDefault();
      showFieldSettingsFormScreen1();
    })

    $('a#back_to_current_table_link').click(function() {
      let currentTable = $('#view_builder_table_name').data('table-name');
      rebuildDraggable(currentTable)
      showFieldSettingsFormScreen2();
    })

    $('#layout-builder-modal-next-button').click(function() {
      goToNextScreen();
    })

    $('#layout-builder-modal-back-button').click(function() {
      goToPreviousScreen();
    })

    $('#layout-builder-modal-save-button').click(function() {
      var layoutName = document.getElementById('layout-builder-modal-form-name').value;
      var layoutPrimaryTable = document.getElementById('layout-builder-modal-form-primary-table').value;
      saveLayout(layoutName, layoutPrimaryTable);
    })

    let currentTable = $('#view_builder_table_name').data('table-name');

    if (currentTable) {
      document.getElementById("layout-builder-field-settings-tab").click();

      if (window.location.pathname.indexOf('edit') > -1) {
        showFieldSettingsFormScreen1();
      } else {
        showFieldSettingsFormScreen2();
      }

      rebuildDraggable(currentTable)
    } else {
      document.getElementById("layout-builder-general-settings-tab").click();
    }
  }

  setTimeout(() => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, 300)
})

$(document).on('change', '.layout-builder-editable-toggle:checkbox', function(evt) {
  evt.preventDefault();
  const _this = this;
  const currentField = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
  const currentFieldContainerId = currentField.parentElement.id;
  const currentFieldEditable = currentField.dataset['fieldEditable'] === 'true'
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
        cancel: 'No keep field read only',
        confirm: 'Yes please make editable'
      }
    }).then((value) => {
      if (value === null) {
        uncheckEditable(_this, currentField)
      } else {
        checkEditable(_this, currentField);
        currentFieldContainerItems = getContainerItemsJSON(currentFieldContainerId);
        updateLayoutBuilderContainer(currentFieldContainerId, currentFieldContainerItems);
      }
    })
  } else {
    uncheckEditable(_this, currentField);
    currentFieldContainerItems = getContainerItemsJSON(currentFieldContainerId);
    updateLayoutBuilderContainer(currentFieldContainerId, currentFieldContainerItems);
  }
})

function uncheckEditable(target, currentField) {
  target.checked = false
  currentField.dataset["fieldEditable"] = false
  console.log(currentField.dataset)
}

function checkEditable(target, currentField) {
  target.checked = true
  currentField.dataset["fieldEditable"] = true
  console.log(currentField.dataset)
}

function showWarningModalDialog(yesCallback, noCallback) {
    $('#layout-builder-editable-warning-modal').modal({
      backdrop: 'static',
      keyboard: false
    });

    $('#layout-builder-editable-warning-modal-next-button').click(function() {
        yesCallback();
    });

    $('#layout-builder-editable-warning-modal-cancel-button').click(function() {
        noCallback();
    });
}

function rebuildDraggable(table) {
  if (draggable) {
    draggable.destroy();
  }

  rebuildDraggableDataContainers();
  let containers = '#layout-builder-draggable-trash-container, #layout-builder-draggable-fields-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3'

  getOptionsForDraggable(table);
  addPaddingToDraggableItems(containers);
  initializeDraggable();
}

function rebuildDraggableDataContainers() {
  let dataContainerIds = ["#layout-builder-draggable-header-container1",
    "#layout-builder-draggable-header-container2",
    "#layout-builder-draggable-side-container",
    "#layout-builder-draggable-main-container1",
    "#layout-builder-draggable-main-container2",
    "#layout-builder-draggable-main-container3"]

  for (var i = 0; i < dataContainerIds.length; i++) {
    let containerId = dataContainerIds[i];
    let data = JSON.parse($(containerId)[0].dataset.fieldsForContainer);

    if (data != "[]") {
      let fieldsForContainer = Object.values(data);

      for (var j = 0; j < fieldsForContainer.length; j++) {
        let field = fieldsForContainer[j]
        if (!containerContainsDraggableItem(containerId, field.title)) {
          let draggableField = buildDraggableField(field);
          $(containerId).append(draggableField);
        }
      }
    }
  }
}

function isNotTrashContainer(containerId) {
  return containerId != 'layout-builder-draggable-trash-container'
}

function isNotFieldsContainer(containerId) {
  return containerId != 'layout-builder-draggable-fields-container'
}

function updateLayoutBuilderContainer (containerId, containerItems) {
  let containers = '#layout-builder-draggable-trash-container, #layout-builder-draggable-fields-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3'
  var url = window.location.href;
  var id = url.split("/")[4];
  var containerParam = getContainerParam(containerId);
  var data = {};
  data["view_builder"] = {};

  if (containerItems.length === 0) {
    data["view_builder"][containerParam] = JSON.stringify(containerItems)
  } else {
    data["view_builder"][containerParam] = containerItems
  }

  $.ajax({
    url: "/layouts/" + id,
    type: 'PATCH',
    data: data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      console.error("PATCH /layouts/:id Failed: "+ errorTextStatus+" ;"+error);
    },
    success: function(response, status, request){
      console.log("PATCH /layouts/:id Success")
      addPaddingToDraggableItems(containers)
    }
  })
}

function getContainerItems(containerId) {
  let query;
  query = "#" + containerId + " " + ".layout-builder-draggable-field:not(.draggable--original):not(.draggable-mirror)"
  return document.querySelectorAll(query);
}

function getContainerItemsJSON(containerId) {
  let containerItems = getContainerItems(containerId);
  let containerItemsJSON = [];

  for (var i = 0; i < containerItems.length; i++) {
    let field = {}
    field["title"] = containerItems[i].innerText.trim()
    field["table"] = containerItems[i].dataset.fieldTable
    field["kind"] = containerItems[i].dataset.fieldType
    field["editable"] = containerItems[i].dataset.fieldEditable
    containerItemsJSON.push(field)
  }

  return containerItemsJSON
}

function getContainerParam(containerId) {
  switch(containerId) {
    case 'layout-builder-draggable-header-container1':
      return 'draggable_fields_header_container1'
      break;
    case 'layout-builder-draggable-header-container2':
      return 'draggable_fields_header_container2'
      break;
    case 'layout-builder-draggable-main-container1':
      return 'draggable_fields_main_container1'
      break;
    case 'layout-builder-draggable-main-container2':
      return 'draggable_fields_main_container2'
      break;
    case 'layout-builder-draggable-main-container3':
      return 'draggable_fields_main_container3'
      break;
    case 'layout-builder-draggable-side-container':
      return 'draggable_fields_side_container'
      break;
    default:
      console.error("unknown container - " + containerId);
      return
  }
}

function saveLayout(name, primaryTable) {
  var layoutID;
  var redirectURL;

  $.ajax({
    url: "/layouts",
    type: 'POST',
    data: {
      table: primaryTable,
      view_name: name
    },
    error: function(XMLHttpRequest, errorTextStatus, error){
              alert("Failed: "+ errorTextStatus+" ;"+error);
           },
    success: function(response, status, request){
      layoutID = response.id;
      redirectURL = "/layouts/" + layoutID + "/edit";
      window.location.replace(redirectURL);
    }
  })
}

function updateLayoutRelatedTables(el) {
  let data = {};
  let layoutID = location.pathname.split("/")[2];
  data['related_table'] = el.dataset.table;

  $.ajax({
    url: "/layouts/" + layoutID + "/related_tables",
    type: 'PATCH',
    data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      alert("Failed: "+ errorTextStatus+" ;"+error);
     }
  })
}

function goToNextScreen() {
  $('#layout-builder-modal-screen-1').toggleClass('hide');
  $('#layout-builder-modal-screen-2').toggleClass('hide');
}

function goToPreviousScreen() {
  $('#layout-builder-modal-screen-1').toggleClass('hide');
  $('#layout-builder-modal-screen-2').toggleClass('hide');
}

function showFieldSettingsFormScreen2() {
  $('#layout_builder_field_settings_form_screen_1').addClass('hide');
  $('#layout_builder_field_settings_form_screen_2').removeClass('hide');
}

function showFieldSettingsFormScreen1() {
  $('#layout_builder_field_settings_form_screen_2').addClass('hide');
  $('#layout_builder_field_settings_form_screen_1').removeClass('hide');
}

function goToTab(tabName) {
  var i, tabContent;

  // Get all elements with class="tabcontent" and hide them
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Show the current tab
  document.getElementById(tabName).style.display = "block";
}

function showEditable(evt) {
  evt.preventDefault()

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContentWrapper = editableRow.getElementsByClassName("editable-content-wrapper")[0]
  let editableInput = editableRow.getElementsByClassName("editable-input")[0]

  editableContentWrapper.style.display = 'none'
  editableInput.style.display = 'block'
  editableInput.children[0].focus();

  return true
}

function cancelEditable(evt) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContentWrapper = editableRow.getElementsByClassName("editable-content-wrapper")[0]
  let editableInput = editableRow.getElementsByClassName("editable-input")[0];

  editableContentWrapper.style.display = 'block';
  editableInput.style.display = 'none';
}

function hideEditable(editableRow) {
  let editableContentWrapper = editableRow.getElementsByClassName("editable-content-wrapper")[0]
  let editableInput = editableRow.getElementsByClassName("editable-input")[0];

  editableContentWrapper.style.display = 'block';
  editableInput.style.display = 'none';
}

function updateTableField(evt, table, field, id) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContent = editableRow.getElementsByClassName("editable-content")[0];
  let editableInput = editableRow.getElementsByClassName("editable-input")[0];
  let currentValue = editableContent.innerText.trim();
  let newValue = editableInput.children[0].value;

  if (currentValue === newValue) {
    cancelEditable(evt)
    return
  }

  let data = {};
  data['table_field'] = {}
  data['table_field']['table'] = table
  data['table_field']['id'] = id
  data['table_field']['field'] = field
  data['table_field']['value'] = newValue

  $.ajax({
    url: "/table_field",
    type: 'PATCH',
    data: data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      if (XMLHttpRequest.status == 400) {
        prepareLongToast()
        toastr.error(XMLHttpRequest.responseJSON.error);
      }

      console.error("PATCH /table_field Failed: "+ errorTextStatus+" ;"+error);
    },
    success: function(response, status, request){
      refreshEditableContent(editableContent, newValue);
      hideEditable(editableRow);
      toastr.info('Table field successfully updated.');
    }
  })
}

function updateRelatedTableField(evt, table, field, foreignKeyTitle, foreignKeyValue) {
  evt.preventDefault();

  let editableRow = evt.currentTarget.parentElement.parentElement.parentElement;
  let editableContent = editableRow.getElementsByClassName("editable-content")[0];
  let editableInput = editableRow.getElementsByClassName("editable-input")[0];
  let currentValue = editableContent.innerText.trim();
  let newValue = editableInput.children[0].value;

  if (currentValue === newValue) {
    cancelEditable(evt)
    return
  }

  let data = {};
  data['related_table_field'] = {}
  data['related_table_field']['table'] = table
  data['related_table_field']['foreign_key_value'] = foreignKeyValue
  data['related_table_field']['foreign_key_title'] = foreignKeyTitle
  data['related_table_field']['field'] = field
  data['related_table_field']['value'] = newValue

  $.ajax({
    url: "/related_table_field",
    type: 'PATCH',
    data: data,
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
      toastr.info('Related table field successfully updated.');
    }
  })
}

function refreshEditableContent(editableContent, newValue) {
  editableContent.innerText = newValue;
}

function prepareLongToast() {
  toastr.options = {
    closeButton: true,
    howMethod: 'fadeIn',
    hideMethod: 'fadeOut',
    timeOut: 15000,
    preventDuplicates: true,
    positionClass: "toast-bottom-right"
  };
}

function prepareNormalToast() {
  toastr.options = {
    closeButton: true,
    howMethod: 'fadeIn',
    hideMethod: 'fadeOut',
    timeOut: 2000,
    preventDuplicates: true,
    positionClass: "toast-bottom-right"
  };
}

function addPaddingToDraggableItems(containers) {
  var containerArray = containers.split(' ')
  let withoutLastContainer = containerArray.pop()
  $(containerArray).each(function () {
    var container = this.slice(0, -1)
    var draggedItems = $(container).children('.layout-builder-draggable-field')
    if (draggedItems.length > 1) {
      addPaddingToContainer(draggedItems)
    } else {
      $(draggedItems).each(function () {
        $(this).css({'margin': '-2px'})
      })
    }
  })

  var lastContainer = $('#layout-builder-draggable-main-container3')
  var draggedItemsFinal = lastContainer.children('.layout-builder-draggable-field')
  if (draggedItemsFinal.length > 1) {
    addPaddingToContainer(draggedItemsFinal)
  } else {
    $(draggedItemsFinal).each(function () {
      $(this).css({'margin': '-2px'})
    })
  }
}

function addPaddingToContainer(draggedItems) {
  $(draggedItems).each(function () {
    $(this).css({'margin': '10px -2px'})
  })
  $(draggedItems.first()).css({'margin-top': '-2px'})
  $(draggedItems.last()).css({'margin-bottom': '-2px'})
}

function updateCallableFields() {
  const url = window.location.href;
  const id = url.split("/")[4];
  const callableFields = document.getElementsByClassName("callable-field");
  const newCallableFields = [];
  const data = {};
  data['view_builder'] = {};

  for (var i = 0; i < callableFields.length; i++) {
    let callableField = callableFields[i];

    if (callableField.checked) {
      newCallableFields.push(callableField.value)
    }
  }

  if (newCallableFields.length === 0) {
    data['view_builder']['callable_fields'] = JSON.stringify(newCallableFields)
  } else {
    data['view_builder']['callable_fields'] = newCallableFields
  }

  $.ajax({
    url: "/layouts/" + id,
    type: 'PATCH',
    data: data,
    error: function(XMLHttpRequest, errorTextStatus, error){
      console.error("PATCH /layouts/:id Failed: "+ errorTextStatus+" ;"+error);
    },
    success: function(response, status, request){
      console.log("PATCH /layouts/:id Success")
    }
  })
}

function removeRelatedTable() {
  let clickedTable = event.target.parentElement.parentElement;
  let data = {};
  let layoutID = location.pathname.split("/")[2];
  data['related_table'] = clickedTable.dataset.table;

  $.ajax({
    url: "/layouts/" + layoutID + "/related_tables/remove",
    type: 'PATCH',
    data,
    error: function(XMLHttpRequest, errorTextStatus, error){
        alert("Failed: "+ errorTextStatus+" ;"+error);
     },
    success: function(response, status, request){
      $(clickedTable).find('i.fa-times').hide();
      $(clickedTable).appendTo("#draggable-list-of-relatable-tables");
    }
  })
}
