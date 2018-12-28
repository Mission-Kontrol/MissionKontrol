

$(function() {
  $(".layout-setting-primary-table-select").change(function(evt) {
    toastr.success('Primary table changed, remember to update your fields');
    filterColumnsByTableName(evt.target.value);
    showOptionsForTable();
  })

  $('#layout-settings-visible-column-select').bootstrapDualListbox();

  let metaTag = $('meta[name=psj]');
  let isCurrentControllerLayoutBuilder = metaTag.attr('controller') == 'layout_builder';
  let isCurrentActionEdit = metaTag.attr('action') == 'edit';

  if (isCurrentControllerLayoutBuilder && isCurrentActionEdit) {
    let visibleColumnSelectDualList = $('#layout-settings-visible-column-select') ;
    let visibleColumns = $('.layout_visible_columns').data('columns') ;
    let selectedTable = $('.layout-setting-primary-table :selected').text();

    if (selectedTable && selectedTable != "Select a primary table") {
      // closeMissingPrimaryTableAlert();
      // document.getElementById('layout-setting-missing-primary-table-alert').style.display = 'none';

      filterColumnsByTableName(selectedTable);
      showOptionsForTable();

      let options = getOptionsForColumnSelect(selectedTable);
      let modifiedOptions = "";

      $(options).each(function() {
        if (visibleColumns.includes($(this).val())) {
          $(this).attr('selected','selected');
          modifiedOptions += this.outerHTML
        } else {
          modifiedOptions += this.outerHTML
        }
      })

      if (options) {
        $("#layout-settings-visible-column-select").html(modifiedOptions);
        $('#layout-settings-visible-column-select').bootstrapDualListbox('refresh', true);
      }
    }
  }
})

function filterColumnsByTableName(tableName) {
  let options = getOptionsForTableName(tableName);

  if (options) {
    $("#layout-settings-visible-column-select").html(options);
    $('#layout-settings-visible-column-select').bootstrapDualListbox('refresh', true);
  }
}

function getOptionsForTableName(tableName) {
  let columns = $('#primary-table-fields').html();
  let label = "optgroup[label='" + tableName + "']";
  return $(columns).filter(label).html();
}

function showOptionsForTable() {
  $('#options-for-table').removeClass('hide');
}
//
// function closeMissingPrimaryTableAlert() {
//   // $('#layout-setting-missing-primary-table-alert').addClass('hide');
//   document.getElementById('layout-setting-missing-primary-table-alert').style.display = 'none';
// }
