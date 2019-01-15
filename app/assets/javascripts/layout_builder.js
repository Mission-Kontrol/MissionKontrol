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

function updateDraggableFields(data) {
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
  const containers = '#layout-builder-draggable-trash-container, #layout-builder-draggable-fields-container, #layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, .layout-builder-draggable-main-container'

  const draggable = new window.Draggable.Sortable(document.querySelectorAll(containers), {
    draggable: '.layout-builder-draggable-item'
  });

  const trashContainer = draggable.containers[1]
  const fieldsContainer = document.querySelectorAll('#layout-builder-draggable-fields-container')[0];

  draggable.on('drag:start', (dragEvent) => {
    // show delete container
    // trashContainer.classList.toggle('hide');
    $('#layout-builder-draggable-trash-container').addClass('animated fadeIn');
    $('#layout-builder-draggable-trash-container').removeClass('hide');
  })

  draggable.on('drag:stop', (dragEvent) => {
    let currentContainer = dragEvent.source.parentNode;

    if (currentContainer === trashContainer) {
      fieldsContainer.insertBefore(dragEvent.source, fieldsContainer.childNodes[0])

      setTimeout(function () {
        fieldsContainer.firstElementChild.classList.toggle('layout-builder-trash-can-item-put-back');
        // $('#layout-builder-draggable-trash-container').addClass('animated bounceOutLeft');
      }, 100);

      setTimeout(function () {
        fieldsContainer.firstElementChild.classList.toggle('layout-builder-trash-can-item-put-back');
        // $('#layout-builder-draggable-trash-container').addClass('animated bounceOutRight');
      }, 2000);
    }

    // hide delete container
    $('#layout-builder-draggable-trash-container').addClass('hide');
  });
}

function clearDroppableContainers() {
  const containers = document.querySelectorAll('#layout-builder-draggable-header-container1, #layout-builder-draggable-header-container2, #layout-builder-draggable-side-container, .layout-builder-draggable-main-container')

  containers.forEach(function(container) {
    container.innerHTML = ""
  })
}
