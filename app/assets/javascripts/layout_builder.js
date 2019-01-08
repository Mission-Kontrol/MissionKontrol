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

  $('#myModal').modal({});

  // init draggable & droppable

  // debugger
  // const draggable = new Draggable.Draggable(document.getElementById('draggable-fields-container'), {});


  var containers = document.querySelectorAll('.containerr');
  //
  // var draggable = new window.Draggable.Sortable(containers, {
  //   draggable: '.drag-item',
  //   appendTo: '.containerr',
  //   classes: {
  //     body: 'draggable-container--is-dragging',
  //   },
  // });

  // draggable.on('sortable:sorted', function() {
  //   console.log('sorted!');
  // });

  // const droppable = new Draggable.Droppable($('#droppable-fields-container'), {
  //   draggable: 'div',
  //   dropzone: 'dropzone'
  // });
  //

  // const droppable = new window.Draggable.Droppable(containers, {
  //   draggable: '.drag-item',
  //   droppable: '.dropzone'
  // });
  //
  // droppable.on('droppable:dropped', () => console.log('droppable:dropped'));
  // droppable.on('droppable:returned', () => console.log('droppable:returned'));
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
  $('#screen-1').toggleClass('hide');
  $('#screen-2').toggleClass('hide');
}

function goToPreviousScreen() {
  $('#screen-1').toggleClass('hide');
  $('#screen-2').toggleClass('hide');
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
      updateDraggable(data);
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

function updateDraggable(data) {
  $('#draggable-fields-container').html('');

  for (var i = 0; i < data.length; i++) {
    var fieldName = data[i][0]
    var fieldType = data[i][1]
    var icon = iconForFieldType(fieldType);
    var item = "<div class='layout-builder-draggable-field draggable-source'>" +
    "<i class=" + "'" + icon + "'" + "aria-hidden='true'></i> " + fieldName +
    "</div>"
    $('#draggable-fields-container').append(item);
  }
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
