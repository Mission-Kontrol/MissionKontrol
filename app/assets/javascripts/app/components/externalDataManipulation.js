"use strict";

function displayActionsBar (table) {
  var filterBar = $(".table--filter-bar-container").html();
  var tableInfo = $(".table--info");
  let checkedCount = $('.data-table--select-input:checked').length
  let selectedText = $(".filter-bar--selected .white").last()

  if (tableInfo.find(".table--filter-bar").length === 0) {
    tableInfo.append(filterBar);
  } else if (checkedCount > 1) {
    selectedText.text(checkedCount + " results selected");
  } else if (checkedCount === 1) {
    selectedText.text(checkedCount + " result selected");
  } else if (checkedCount === 0) {
    $(".table--filter-bar").last().remove();
  }
};

function selectInput (table) {
  $("body").on("change", ".data-table--select-input:checkbox", function () {
    displayActionsBar(table);
  });
};

function deleteData (table) {
  $("body").on("click", ".filter-bar--delete", function () {
    let checkbox = $(".data-table--select-input:checked").first();
    let database_id = checkbox.data("id");
    let record_id = checkbox.parent().parent().data("record-id");
    let table = checkbox.val();

    $.ajax({
      method: "POST",
      url: "/table/delete_record",
      dataType: "script",
      data: {
        database_id,
        table,
        record_id
      },
      success(data) {
        toastr.success('Record(s) successfully deleted.')
        $(".table--filter-bar").last().remove();
        $(".data-table").DataTable().ajax.reload();
      },
      error() {
        toastr.error('Unable to delete the record(s).')
      }
    })
  })
};