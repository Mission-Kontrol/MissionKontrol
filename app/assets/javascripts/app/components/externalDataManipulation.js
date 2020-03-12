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

// TODO: add ajax call here
function deleteData (table) {
  $("body").on("click", ".filter-bar--delete", function () {
    alert("ARE YOU SURE")
  })
};