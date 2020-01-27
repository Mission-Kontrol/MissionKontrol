function renderAvailableDatabases (data, dropdownOriginal) {
  var dropdown = dropdownOriginal.next();
  var availableDatabases = [];
  dropdown[0].innerHTML = "";

  $.each(data.databases, function( index, value ) {
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
  dropdown.append(availableDatabases.join(""));
  dropdown.addClass("in");
}

function renderAvailableDatabaseSettings (data, dropdownOriginal) {
  var dropdown = dropdownOriginal.next();
  var availableDatabases = [];
  dropdown[0].innerHTML = "";

  $.each(data.databases, function( index, value ) {
    availableDatabases.push(
      "<li>"+
        "<a href='/databases/"+value.id+"/edit' class='nav-link-for-database-settings' data-database-id='"+value.id+"'>"+
          "<span class='nav-label' data-i18n='nav.layouts'>"+
            value.friendly_name+
          "</span>"+
        "</a>"+
      "</li>"
    );
  });

  if (data.can_add === "true") {
    availableDatabases.push(
      "<li>"+
        "<a id='nav-link-for-add-database' href='/databases/new'>Add</a>"+
      "</li>"
    );
  }

  dropdown.append(availableDatabases.join(""));

  dropdown.addClass("in");
}

function fetchAvailableDatabases (dropdown) {
  $.ajax({
    dataType: "json",
    url: "/databases",
    success(data) {
      renderAvailableDatabases(data, dropdown);
    }
  });
}

function loadAvailableDatabases () {
  $("#nav-link-for-available-databases").click(function() {
    var dropdown = $(this);

    fetchAvailableDatabases(dropdown);
  });
}

function loadAvailableDatabaseSettings () {
  $("#nav-link-for-available-databases-settings").click(function() {
    var dropdown = $(this);

    if ($(this).next("ul").hasClass("in")) {
      $(this).next("ul").removeClass("in");
    } else {
      $.ajax({
        dataType: "json",
        url: "/databases",
        data: { settings: true },
        success(data) {
          renderAvailableDatabaseSettings(data, dropdown);
        }
      });
    }
  });
}

function renderAvailableTables (tables, databaseId) {
  var dropdown = $("#nav-populate-available-databases-"+databaseId);
  var availableTables = [];
  dropdown[0].innerHTML = "";

  $.each(tables, function( index, value ) {
    availableTables.push(
      "<li>"+
        "<a href='/tables/"+databaseId+"?table="+value+"'>"+value+"</a>"+
      "</li>"
    );
  });
  dropdown.append(availableTables.join(""));
  dropdown.addClass("in");
}

function fetchAvailableTables (databaseId) {
  $.ajax({
    dataType: "json",
    url: "/tables",
    data: { database_id: databaseId },
    success(data) {
      renderAvailableTables(data, databaseId);
    }
  });
}

function loadAvailableTables () {
  $("body").on("click", ".nav-link-for-databases", function (e) {
    e.preventDefault();
    var databaseId = $(this).data("databaseId");
    var tableList = $(this).next("ul");

    if (tableList.hasClass("in")) {
      tableList.removeClass("in");
    } else {
      fetchAvailableTables(databaseId);
    }
  });
}

function loadDatabasesNav () {
  if ($("#nav-link-databases").hasClass("active")) {
    var dropdown = $("#nav-link-for-available-databases");

    fetchAvailableDatabases(dropdown);

    var databaseId = (location.pathname+location.search).substr(1).split("/")[1].charAt(0);

    fetchAvailableTables(databaseId);
  }
}

$(document).ready(function() {
  loadAvailableDatabases();
  loadAvailableDatabaseSettings();
  loadAvailableTables();
  loadDatabasesNav();
});