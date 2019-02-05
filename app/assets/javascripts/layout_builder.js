var draggable;

$(document).ready(function() {
  let metaTag = $('meta[name=psj]');
  let isCurrentControllerLayout = metaTag.attr('controller') == 'layout_builder';
  let isCurrentActionNew = metaTag.attr('action') == 'new';
  let isCurrentActionEdit = metaTag.attr('action') == 'edit';

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
      var table = $(this).data().tableName;
      showFieldSettingsFormScreen2();
      rebuildDraggable(table);
    })

    $('.layout_builder_field_settings_form_back_btn').click(function() {
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

    // show this only on new route and not edit
    $('#layout-builder-modal').modal({
      backdrop: 'static',
      keyboard: false
    })

    let currentTable = $('#view_builder_table_name').data('table-name');

    if (currentTable) {
      document.getElementById("layout-builder-field-settings-tab").click();
      showFieldSettingsFormScreen2();
      rebuildDraggable(currentTable)
    } else {
      document.getElementById("layout-builder-general-settings-tab").click();
    }
  }
})

// $(document).on('change', '.layout-builder-editable-toggle:checkbox', function(evt) {
//
//
//   let _this = this;
//
//   // update field editable to true
//   function accept() {
//     // _this.checked = true;
//     evt.currentTarget.checked = false;
//     $('#layout-builder-editable-warning-modal').modal('hide');
//   }
//
//   function decline() {
//     console.log("edit modal confirmation declined.")
//     _this.checked = false;
//     $('#layout-builder-editable-warning-modal').modal('hide');
//   }
//
//   if (_this.checked) {
//     _this.checked = false;
//     evt.preventDefault();
//     evt.stopPropagation();
//     showWarningModalDialog(accept, decline);
//   } else {
//     // update field and container by setting editable to false
//   }
//
//   // evt.stopPropagation();
//   // evt.preventDefault();
//   // console.log('stopping')
//   // return false;
// })

// $(document).on('change', '.layout-builder-editable-toggle-input:checkbox', function(evt) {
//   // evt.preventDefault();
//   evt.stopPropagation();
//   // update field editable to true
//   function accept() {
//     $('#layout-builder-editable-warning-modal').modal('hide');
//     return true
//   }
//
//   // update field editable to false
//   // why is this unchecking all editable toggles instead of just one?!?!
//   //
//   // This should only uncheck the checkbox that resulted in this event, yet it
//   // seems to uncheck all checked checkboxes.
//   //
//   function decline() {
//     console.log("edit modal confirmation declined.")
//     // $(evt.currentTarget).prop("checked", false);
//     evt.currentTarget.checked = false;
//     $('#layout-builder-editable-warning-modal').modal('hide');
//     return false
//   }
//
//   if (this.checked) {
//       let r = showWarningModalDialog(accept, decline);
//       console.log(r);
//       // update field and container by setting editable to true
//   } else {
//     // update field and container by setting editable to false
//   }
// });

$(document).on('change', '.layout-builder-editable-toggle:checkbox', function(evt) {
  // evt.preventDefault();
  // evt.stopPropagation();
  // update field editable to true
  let _this = this;

  function accept() {
    console.log("edit modal confirmation accepted.")
    evt.currentTarget.checked = true;
    $('#layout-builder-editable-warning-modal').modal('hide');
    return true
  }

  // update field editable to false
  // why is this unchecking all editable toggles instead of just one?!?!
  //
  // This should only uncheck the checkbox that resulted in this event, yet it
  // seems to uncheck all checked checkboxes.
  //
  function decline() {
    console.log("edit modal confirmation declined.")
    // evt.currentTarget.checked = false;
    $('#layout-builder-editable-warning-modal').modal('hide');
    return false
  }

  if (this.checked) {
     _this.checked = false;
      let r = showWarningModalDialog(accept, decline);
      console.log(r);
      // update field and container by setting editable to true
  } else {
    // update field and container by setting editable to false
  }
});

$(document).on('click', '#layout-builder-editable-warning-modal-ignore-checkbox', function(evt) {
  // debugger
  if (this.checked) {
      // let r = showWarningModalDialog(accept, decline);
      console.log('will ignore this warning next time you try to make me editable');
      // update field and container by setting editable to true
  } else {
    // update field and container by setting editable to false
    console.log('will not ignore this warning next time you try to make me editable');
  }
})

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
  getOptionsForDraggable(table);
  document.getElementById('layout_builder_selected_table_name').innerHTML = "Fields / " + table;
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

function buildDraggableField(field) {
  var icon = iconForFieldType(field.kind);
  var item = "<div class='layout-builder-draggable-field layout-builder-draggable-item draggable-source' data-field-table=" + field.table + " data-field-type=" + field.kind + ">" +
  "<div class='row m-l-none m-r-none'>" +
    "<div class='col-sm-9 layout-builder-draggable-item-handle'>" +
      "<div class = ''>" +
        "<i class=" + "'" + icon + "'" + "aria-hidden='true'></i> " + field.title +
      "</div>" +
    "</div>" +

    "<div class='col-sm-3'>"+
      "<div class = ''>" +
        "<input class='form-control layout-builder-editable-toggle' type='checkbox' id='layout-builder-editable-toggle-for-" + field.title + "'>" +
      "</div>" +
      "</div>" +
    "</div>"+
  "</div>"

  return item
}

function getOptionsForDraggable(primaryTable) {
  $.ajax({
    url: "/layouts/table_fields_with_type",
    type: 'GET',
    data: {
      table: primaryTable
    },
    async: true,
    dataType: "json",
    error: function(XMLHttpRequest, errorTextStatus, error){
              alert("Failed: "+ errorTextStatus+" ;"+error);
           },
    success: function(data){
      updateDraggableFieldsContainer(data);
    }
  })
}

function updateDraggableFieldsContainer(data) {
  $('#layout-builder-draggable-fields-container').html('');
  for (var i = 0; i < data.length; i++) {
    var field = {}
    field["title"] = data[i][0]
    field["kind"] = data[i][1]
    field["table"] = data[i][2]
    let draggableField = buildDraggableField(field);

    //
    // add field to draggable container if container data contains field AND
    // contianer does not already inlcude a dragable item with the same field name.
    //

    if (containerDataContainsField('layout-builder-draggable-header-container1', field.title)) {
      if (!containerContainsDraggableItem('#layout-builder-draggable-header-container1', field.title)) {
        $('#layout-builder-draggable-header-container1').append(draggableField);
      }
    } else if (containerDataContainsField('layout-builder-draggable-header-container2', field.title)) {
      if (!containerContainsDraggableItem('#layout-builder-draggable-header-container2', field.title)) {
        $('#layout-builder-draggable-header-container2').append(draggableField);
      }
    } else if (containerDataContainsField('layout-builder-draggable-side-container', field.title)) {
      if (!containerContainsDraggableItem('#layout-builder-draggable-side-container', field.title)) {
        $('#layout-builder-draggable-side-container').append(draggableField);
      }
    } else if (containerDataContainsField('layout-builder-draggable-main-container1', field.title)) {
      if (!containerContainsDraggableItem('#layout-builder-draggable-main-container1', field.title)) {
        $('#layout-builder-draggable-main-container1').append(draggableField);
      }
    } else if (containerDataContainsField('layout-builder-draggable-main-container2', field.title)) {
      if (!containerContainsDraggableItem('#layout-builder-draggable-main-container2', field.title)) {
        $('#layout-builder-draggable-main-container2').append(draggableField);
      }
    } else if (containerDataContainsField('layout-builder-draggable-main-container3', field.title)) {
      if (!containerContainsDraggableItem('#layout-builder-draggable-main-container3', field.title)) {
        $('#layout-builder-draggable-main-container3').append(draggableField);
      }
    } else {
      $('#layout-builder-draggable-fields-container').append(draggableField);
    }
  }
}

function containerDataContainsField(containerId, fieldName) {
  let data = JSON.parse($('#' + containerId)[0].dataset.fieldsForContainer);

  if (data != "[]") {
    let fields = Object.values(data)

    for (var i = 0; i < fields.length; i++) {
      if (fields[i].title === fieldName ) {
        return true
      }
    }
  }

  return false
}

function containerContainsDraggableItem(containerId, fieldName) {
  let draggableItems = $(containerId + ' .layout-builder-draggable-item').text().trim().split(" ")
  return draggableItems.includes(fieldName)
}

function initializeDraggable() {
  const containers = '#layout-builder-draggable-trash-container, #layout-builder-draggable-fields-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3'
  const dataContainers = '#layout-builder-draggable-trash-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3'

  draggable = new window.Draggable.Sortable(document.querySelectorAll(containers), {
    draggable: '.layout-builder-draggable-item',
    handle: '.layout-builder-draggable-item-handle'
  });

  const fieldsContainer = document.querySelectorAll('#layout-builder-draggable-fields-container')[0];

  draggable.on('drag:start', (dragEvent) => {
    showTrashContainer();
  })

  draggable.on('drag:stop', (dragEvent) => {
    let currentContainer = dragEvent.source.parentNode;
    let destinationContainerId = currentContainer.id;
    let sourceContainerId = dragEvent.data.sourceContainer.id;
    let currentContainerId = currentContainer.id;
    let currentFieldValue = dragEvent.source.innerText.trim();

    hideTrashContainer();

    if (destinationContainerId === 'layout-builder-draggable-trash-container') {
      fieldsContainer.insertBefore(dragEvent.source, fieldsContainer.childNodes[0]);

      setTimeout(function () {
        fieldsContainer.firstElementChild.classList.toggle('layout-builder-trash-can-item-put-back');
      }, 100);

      setTimeout(function () {
        fieldsContainer.firstElementChild.classList.toggle('layout-builder-trash-can-item-put-back');
      }, 2000);
    }

    if (sourceContainerId === destinationContainerId) {
      return
    }

    if (isDataContainer(sourceContainerId)) {
      saveDraggableContainer(dragEvent, sourceContainerId)
    }

    if (isDataContainer(destinationContainerId)) {
      saveDraggableContainer(dragEvent, destinationContainerId)
    }
  });
}

function iconForFieldType(fieldType) {
  switch(fieldType) {
    case 'string':
    case 'text':
      return 'fa fa-font'
      break;
    case 'time':
    case 'timestamp':
      return 'fa fa-clock-o'
      break;
    case 'date':
    case 'datetime':
      return 'fa fa-calendar'
      break;
    case 'boolean':
      return 'fa fa-toggle-on'
      break;
    default:
      return 'fa fa-font'
  }
}

function isDataContainer(containerId) {
  return isNotTrashContainer(containerId) && isNotFieldsContainer(containerId)
}

function isNotTrashContainer(containerId) {
  return containerId != 'layout-builder-draggable-trash-container'
}

function isNotFieldsContainer(containerId) {
  return containerId != 'layout-builder-draggable-fields-container'
}

function saveDraggableContainer(dragEvent, containerId) {
  let notification;
  let queryId = "#" + containerId;
  let containerItems = getContainerItems(containerId);
  let containerItemsJSON = [];

  for (var i = 0; i < containerItems.length; i++) {
    let field = {}
    field["title"] = containerItems[i].innerText.trim()
    field["table"] = containerItems[i].dataset.fieldTable
    field["kind"] = containerItems[i].dataset.fieldType
    containerItemsJSON.push(field)
  }

  updateLayoutBuilderContainer(containerId, containerItemsJSON)
}

function updateLayoutBuilderContainer(containerId, containerItems) {
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
    }
  })
}

function getContainerItems(containerId) {
  let query;
  query = "#" + containerId + " " + ".layout-builder-draggable-field:not(.draggable--original):not(.draggable-mirror)"
  return document.querySelectorAll(query);
}

function showTrashContainer() {
  $('#layout-builder-draggable-trash-container').removeClass('hide');
  $('#layout-builder-draggable-trash-container').addClass('animated zoomIn');
}

function hideTrashContainer() {
  $('#layout-builder-draggable-trash-container').addClass('hide');
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
