function fetchDataForPermissionsTable() {
  $.ajax({
    dataType: "json",
    url: "/" + (location.pathname+location.search).substr(1),
    success: function(d) {
      loadPermissionsDataTable(d.columns);
    }
  });
}

function displayCheckbox (data) {
  if (data === true) {
    return "<img src='/assets/images/icons/black-check-box-with-white-check.png'>"
  } else {
    return "<img src='/assets/images/icons/black-checkbox-empty.svg'>"
  }
}

function formatNestedColumns ( d ) {
  return '<table id="permissions--nested-table" cellpadding="5" cellspacing="0" border="0">'+
      '<tr>'+
          '<td><p>View</p></td>'+
          '<td>'+ displayCheckbox(d.Admin_view) +'</td>'+
          '<td>'+ displayCheckbox(d.Sales_view) +'</td>'+
          '<td>'+ displayCheckbox(d.Team_Lead_view) +'</td>'+
      '</tr>'+
      '<tr>'+
          '<td><p>Create</p></td>'+
          '<td>'+ displayCheckbox(d.Admin_create) +'</td>'+
          '<td>'+ displayCheckbox(d.Sales_create) +'</td>'+
          '<td>'+ displayCheckbox(d.Team_Lead_create) +'</td>'+
      '</tr>'+
      '<tr>'+
          '<td><p>Edit</p></td>'+
          '<td>'+ displayCheckbox(d.Admin_edit) +'</td>'+
          '<td>'+ displayCheckbox(d.Sales_edit) +'</td>'+
          '<td>'+ displayCheckbox(d.Team_Lead_edit) +'</td>'+
      '</tr>'+
      '<tr>'+
          '<td><p>Delete</p></td>'+
          '<td>'+ displayCheckbox(d.Admin_delete) +'</td>'+
          '<td>'+ displayCheckbox(d.Sales_delete) +'</td>'+
          '<td>'+ displayCheckbox(d.Team_Lead_delete) +'</td>'+
      '</tr>'+
  '</table>';
}

function loadPermissionsDataTable (columns) {
  var searchableTable = $(".data-table-permissions").DataTable({
    "colReorder": true,
    "paging": false,
    "info": false,
    "searching": false,
    "deferRender": true,
    "autoWidth": false,
    "scrollX": true,
    "serverSide": true,
    "processing": true,
      "language": {
        processing: "<div class='sk-spinner sk-spinner-chasing-dots'>" +
              "<div class='sk-dot1'></div>" +
              "<div class='sk-dot2'></div>" +
            "</div>"},
    "ajax": "/" + (location.pathname+location.search).substr(1),
    "columns": columns,
    "stateSave": true,
    "stateSaveCallback": function (settings, data) {
      if ( settings.iDraw <= 1 ) {
        return;
      }

      $.ajax({
        "url": "/data_table_states/save?table=" + $(this).data("table-name"),
        "data": { "state": data },
        "dataType": "json",
        "type": "POST",
        "success": function () {}
      });
    },
    "stateLoadCallback": function (settings, callback) {
      $.ajax({
        "url": "/data_table_states/load?table=" + $(this).data("table-name"),
        "dataType": "json",
        "success": function (json) {
          callback( json );
        }
      });
    },
    "createdRow": function( row, data, dataIndex ) {
      let table = $(this).data("table-name");
      let id = data.id;
      let previewUrl = "/tables/" + table + "/" + id + "?table=" + table;
      $(row).addClass( "clickable-row-permissions" );
      $(row).attr( "data-href",  previewUrl);
    },
    "initComplete": function(settings, json) {
      $('[id ^="target-table-"][id $="_filter"] input').unbind();
      $('[id ^="target-table-"][id $="_filter"] input').bind('keyup', function(e) {
        if(e.keyCode === 13) {
          searchableTable.search( this.value ).draw();
        }
      });
    }
  });

  $('body').on('click', '#target-table-permissions > tbody > tr.clickable-row-permissions', function () {
    var tr = $(this);
    var row = searchableTable.row(tr);

    if ( row.child.isShown() ) {
      row.child.hide();
      tr.removeClass('shown');
    }
    else {
      row.child( formatNestedColumns(row.data()) ).show();
      tr.addClass('shown');
    }
  })
}


$(document).ready(function() {
  let metaTag = $("meta[name=psj]");
  let isCurrentControllerPermissions = metaTag.attr("controller") === "permissions";

  if (isCurrentControllerPermissions) {
    fetchDataForPermissionsTable();
  }
})
