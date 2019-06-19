$(document).ready(function() {
  $(".excelexport").on("click", function (e) {
    let tableId = e.target.parentElement.parentElement.parentElement.getElementsByTagName("table")[0].id
    var csv = FooTable.get("#" + tableId).toCSV(true);
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = "kuwinda-" + tableId + ".csv";
    hiddenElement.click();
  });
})
