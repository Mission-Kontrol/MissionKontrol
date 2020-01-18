"use strict";

function displayFilterBar () {
  var filterBar = $(".table--filter-bar-container").html();
  $(".table--info").append(filterBar);
}

function removeFilterBar () {
  $(".table--filter-bar").last().remove();
}

function filterByTeams (table) {
  $(".users-teams--table-data").click(function() {
    var role = $(this).data("role");

    table.column( 2 )
      .search( role )
      .draw();

    displayFilterBar();
  })
}

function filterByStatus (table) {
  $(".users-status--table-data").click(function() {
    var status = $(this).data("status");

    table.column( 3 )
      .search( status )
      .draw();

    displayFilterBar();
  })
}

function clearFilters (table) {
  $("body").on("click", ".filter-bar--clear", function () {
    table.columns( [2, 3] )
      .search( "" )
      .draw();

    removeFilterBar();
  })
}

function displayEditLink () {
  $(".users-teams--count").hover(function() {
    $(this).children(".team--user-count").toggleClass("hide");
    $(this).children(".team--edit-link").toggleClass("hide");
  })
}

function loadUserDataTable (columns) {
  var canExport = $("#target-table-admin-users").data("can-export");
  columns.push({"data":null,"defaultContent":"<a class='user--edit-link' data-remote='true' href='#'><img src='/assets/images/icons/edit@2x.png'></a>"});
  var searchableTable = $("#target-table-admin-users").DataTable({
    colReorder: true,
    deferRender: true,
    autoWidth: false,
    scrollX: true,
    serverSide: true,
    processing: true,
    language: {
      processing: "<div class='sk-spinner sk-spinner-chasing-dots'>" +
            "<div class='sk-dot1'></div>" +
            "<div class='sk-dot2'></div>" +
          "</div>",
      paginate: {
        next: "Next >",
        previous: "< Prev"
      },
      info: "of _MAX_ results",
    },
    ajax: "/" + (location.pathname+location.search).substr(1),
    dom: "f<'table--info'piB>rt<'clear'>",
    columns,
    stateSave: false,
    createdRow( row, data, dataIndex ) {
      var id = data.id;
      var previewUrl = "/users/" + id;
      var editLink = row.lastChild.firstChild;
      var statusField = row.children[3];
      var userStatus = statusField.innerHTML;

      if (userStatus === "false") {
        statusField.innerHTML = "<img src='/assets/images/icons/circle-with-cross.png'>";
      } else {
        statusField.innerHTML = "<img src='/assets/images/icons/circle-with-check-symbol.png'>";
      }

      $(editLink).attr("href",  previewUrl);
    },
    buttons: [
      {
        extend: "csv",
        className: "table--export " + canExport,
        text: "Export"
      },
      {
        text: "Add",
        className: "table--add",
        action () {
          $.ajax({
            url: "/admin_users/new"
          });
        }
      }
    ],
    initComplete(settings, json) {
      initCompleteFunction(settings, json, searchableTable);
    }
  });

  filterByTeams(searchableTable);
  filterByStatus(searchableTable);
  clearFilters(searchableTable);
}

function fetchDataForUserTable () {
  $.ajax({
    dataType: "json",
    url: "/" + (location.pathname+location.search).substr(1),
    success(d) {
      loadUserDataTable(d.columns);
    }
  });
}

function submitStatusChange () {
  $("body").on("change", "#user--edit-status:checkbox", function (e) {
    var id = $(this).data("user");
    $.post(
      "/admin_users/update_status",
      {
        id: id
      }
    );
  });
}

function submitTeamChange () {
  $("body").on("change", ".user--team-select", function () {
    var id = $(this).data("user");
    var role = $(this).val();
    $.post(
      "/admin_users/update_role",
      {
        id: id,
        role: role,
      }
    );
  });
}

function validateForm () {
  var password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

  $("body").on("keyup", "#admin_user_first_name, #admin_user_last_name, #admin_user_email, #admin_user_password", function () {
    var fieldsFilled = $("#admin_user_first_name").val().length > 0 &&
    $("#admin_user_last_name").val().length > 0 &&
    $("#admin_user_email").val().length > 0;

    var create = $(".user--form-action").val() === "create";
    var update = $(".user--form-action").val() === "update";
    var passwordEmpty = $("#admin_user_password").val().length === 0;
    var passwordValid = $("#admin_user_password").val().match(password);

    var validForm = (create && fieldsFilled && passwordValid) || (update && fieldsFilled && passwordEmpty) || (update && fieldsFilled && !passwordEmpty && passwordValid);

    if (validForm) {
      $("input[type=submit]").prop("disabled", false);
    } else {
      $("input[type=submit]").prop("disabled", true);
    }
  });
}

function editFields () {
  $("body").on("click", ".user--modal-edit-button", function () {
    var id = $(this).data("user");
    var role = $(this).val();

    $.ajax({
      url: "/users/edit",
      data: { id: id },
      type: "GET",
      success() {}
    });
  });
}

$(document).ready(function() {
  let metaTag = $("meta[name=psj]");
  let isCurrentControllerAdminUsers = metaTag.attr("controller") === "admin_users";

  if (isCurrentControllerAdminUsers) {
    fetchDataForUserTable();
  }

  submitStatusChange();
  submitTeamChange();

  validateForm();

  editFields();

  displayEditLink();
})