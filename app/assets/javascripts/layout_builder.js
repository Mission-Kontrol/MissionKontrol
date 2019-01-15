$(document).ready(function() {
  $('.layout-builder-nav-item').click(function(evt) {
    evt.preventDefault();
    var elems = document.querySelectorAll(".layout-builder-nav-item");
    var tab = "#" + $(this).data().tabName;
    removeActiveClass(elems);
    hideSettingsForm();
    $(this).addClass('active');
    $(tab).removeClass('hide');
  })

  $('.layout_builder_selected_table_name').click(function(evt) {
    evt.preventDefault();
    var table = $(this).data().tableName;
    hideFieldSettingsFormScreen1();
    showFieldSettingsFormScreen2();
    // clear droppable containers of previous elements belonging to incorrect fields
    getOptionsForDraggable(table);
    document.getElementById('layout_builder_selected_table_name').innerHTML = "Fields / " + table;
  })

  $('.layout_builder_field_settings_form_back_btn').click(function() {
    hideFieldSettingsFormScreen1();
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

  $('#layout-builder-modal').modal({});
})

function removeActiveClass(elements) {
  [].forEach.call(elements, function(el) {
    el.classList.remove("active");
  });
}

function hideSettingsForm() {
  $('#layout_builder_general_settings_form').addClass('hide');
  $('#layout_builder_field_settings_form').addClass('hide');
}

function goToNextScreen() {
  $('#layout-builder-modal-screen-1').toggleClass('hide');
  $('#layout-builder-modal-screen-2').toggleClass('hide');
}

function goToPreviousScreen() {
  $('#layout-builder-modal-screen-1').toggleClass('hide');
  $('#layout-builder-modal-screen-2').toggleClass('hide');
}

function hideFieldSettingsFormScreen1() {
  $('#layout_builder_field_settings_form_screen_1').toggleClass('hide');
}

function showFieldSettingsFormScreen2() {
  $('#layout_builder_field_settings_form_screen_2').toggleClass('hide');
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
      updateDraggableFields(data);
    }
  })
}

function updateDraggableContainerItems() {
  console.log('updating draggable container items')
  return
  // when a drag event is executed
  // fetch all the containers and their fields for the current layout and save them
  $.ajax({
    url: "/layouts",
    type: 'PATCH',
    data: {
      table: primaryTable,
      view_name: name,
      layo
    },
    error: function(XMLHttpRequest, errorTextStatus, error){
              alert("Failed: "+ errorTextStatus+" ;"+error);
           },
    success: function(response, status, request){
      // clear and update container fields for all containers
      // updateDraggableItems();
      layoutID = response.id;
      redirectURL = "/layouts/" + layoutID + "/edit";
      window.location.replace(redirectURL);
    }
  })
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

// TODO: update containers according to db values when initializing draggable
function updateDraggableFields(data) {
  // get header container1 field
  // get header container2 field
  // get header side nav fields
  // get header side nav fields
  // get main container 1 fields
  // get main container 2 fields
  // get main container 3 fields

  // loop through fields and append each field to correct container
  $('#layout-builder-draggable-fields-container').html('');

  for (var i = 0; i < data.length; i++) {
    var fieldName = data[i][0]
    var fieldType = data[i][1]
    var icon = iconForFieldType(fieldType);
    var item = "<div class='layout-builder-draggable-field layout-builder-draggable-item draggable-source'>" +
    "<i class=" + "'" + icon + "'" + "aria-hidden='true'></i> " + fieldName +
    "</div>"
    $('#layout-builder-draggable-fields-container').append(item);
  }

  clearDroppableContainers();
  initializeDraggable();
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

function initializeDraggable() {
  const containers = '#layout-builder-draggable-trash-container, #layout-builder-draggable-fields-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3'

  const draggable = new window.Draggable.Sortable(document.querySelectorAll(containers), {
    draggable: '.layout-builder-draggable-item'
  });

  const trashContainer = draggable.containers[1]
  const fieldsContainer = document.querySelectorAll('#layout-builder-draggable-fields-container')[0];

  draggable.on('drag:start', (dragEvent) => {
    showTrashContainer();
  })

  draggable.on('drag:stop', (dragEvent) => {
    let currentContainer = dragEvent.source.parentNode;

    if (currentContainer === trashContainer) {
      fieldsContainer.insertBefore(dragEvent.source, fieldsContainer.childNodes[0])

      setTimeout(function () {
        fieldsContainer.firstElementChild.classList.toggle('layout-builder-trash-can-item-put-back');
      }, 100);

      setTimeout(function () {
        fieldsContainer.firstElementChild.classList.toggle('layout-builder-trash-can-item-put-back');
      }, 2000);
      // reinitialize draggable
      // update element
      updateDraggableContainerItems();
      console.log('item droppped into trash');
    } else {
      // add item to container
      // append to container
      // debugger
      let currentContainerId = currentContainer.id
      let currentFieldValue = dragEvent.source.innerText.trim()
      console.log(currentFieldValue + ' droppped into container - ' + currentContainerId);
    }

    hideTrashContainer();
  });
}

function clearDroppableContainers() {
  const containers = document.querySelectorAll('#layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, #layout-builder-draggable-main-container1, #layout-builder-draggable-main-container2, #layout-builder-draggable-main-container3')

  containers.forEach(function(container) {
    container.innerHTML = ""
  })
}

function showTrashContainer() {
  $('#layout-builder-draggable-trash-container').addClass('animated zoomIn');
  $('#layout-builder-draggable-trash-container').removeClass('hide');
}

function hideTrashContainer() {
  $('#layout-builder-draggable-trash-container').addClass('hide');
}
