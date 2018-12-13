$(function() {
  let metaTag = $('meta[name=psj]');
  let isCurrentControllerWorkList = metaTag.attr('controller') == 'work_lists';
  let isCurrentActionNew = metaTag.attr('action') == 'new';
  let isCurrentActionEdit = metaTag.attr('action') == 'edit';

  if (isCurrentControllerWorkList && (isCurrentActionNew || isCurrentActionEdit)) {
    let visibleColumnSelectDualList = $('#visible-column-select') ;
    let visibleColumns = $('.work_list_visible_columns').data('columns') ;
    let selectedTable = $('.table-select :selected').text();

    if (selectedTable) {
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
        $("#visible-column-select").html(modifiedOptions);
        $('#visible-column-select').bootstrapDualListbox('refresh', true);
      }
    }
  }
})
