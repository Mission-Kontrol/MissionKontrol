function renderAvailableDatabases (databases, dropdown) {
  var dropdown = dropdown.next();
  var availableDatabases = [];
  dropdown[0].innerHTML = '';

  $.each(databases, function( index, value ) {
    availableDatabases.push(
      "<li>"+
        "<a href='' class='nav-link-for-databases' data-database-id='"+value.id+"'>"+
          "<span class='nav-label' data-i18n='nav.layouts'>"+
            value.friendly_name+
          "</span> <span class='fa arrow'></span>"+
        "</a>"+
        "<ul class='nav nav-second-level nav-databases collapse' id='nav-populate-available-databases-"+value.id+"'>"+
        "</ul>"+
      "</li>"
    );
  });
  dropdown.append(availableDatabases.join(''));
  dropdown.addClass("in");
}

function loadAvailableDatabases () {
  $('.nav-link-for-available-databases').click(function() {
    var dropdown = $(this);
    $.ajax({
      dataType: "json",
      url: "/databases",
      success(data) {
        renderAvailableDatabases(data, dropdown)
      }
    });
  });
}

function renderAvailableTables (tables, databaseId) {
  var dropdown = $("#nav-populate-available-databases-"+databaseId);
  var availableTables = [];
  $.each(tables, function( index, value ) {
    availableTables.push(
      "<li>"+
        "<a href='/tables/"+databaseId+"?table="+value+"'>"+value+"</a>"+
      "</li>"
    );
  });
  dropdown.append(availableTables.join(''));
  dropdown.addClass("in");
}

function loadAvailableTables () {
  $("body").on("click", ".nav-link-for-databases", function (e) {
    e.preventDefault();
    var databaseId = $(this).data('databaseId');
    $.ajax({
      dataType: "json",
      url: "/tables",
      data: { database_id: databaseId },
      success(data) {
        renderAvailableTables(data, databaseId);
      }
    });
  });
}

$(document).ready(function() {
  loadAvailableDatabases();
  loadAvailableTables();
})