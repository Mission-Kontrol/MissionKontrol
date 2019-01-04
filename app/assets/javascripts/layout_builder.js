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
    console.log("selected table is - ", table);
    hideFieldSettingsFormScreen1();
    showFieldSettingsFormScreen2();
    getOptionsForDraggable(table);
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

  $('#myModal').modal({});
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

function updateDraggable(data) {
  console.log(data);

  // <div class="layout-builder-draggable-field">
  //   <i class="<%= icon_for_field_type('string') %>" aria-hidden="true"></i> Name
  // </div>
}
