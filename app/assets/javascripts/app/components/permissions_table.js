var emptyCheckboxIcon = "/assets/images/icons/black-checkbox-empty.svg";
var filledCheckboxIcon = "/assets/images/icons/black-check-box-with-white-check.png";
var emptyCircleIcon = "/assets/images/icons/circle-with-cross.png";
var halfFullCircleIcon = "/assets/images/icons/circle-with-contrast.png";
var fullCircleIcon = "/assets/images/icons/circle-with-check-symbol.png";

function fetchDataForPermissionsTable() {
  $.ajax({
    dataType: "json",
    url: "/" + (location.pathname+location.search).substr(1),
    success: function(d) {
      loadPermissionsDataTable(d.columns);
    }
  });
}

function deHumanizeString (str) {
  return str.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
}

function humanizeString (str) {
  var restOfStr = str.slice(1).replace(/_/g, ' ')

  return str.charAt(0).toUpperCase() + restOfStr
}

function displayCheckbox (value, role_name, action) {
  if (value === true) {
    return "<img class='filled-checkbox' src='"+filledCheckboxIcon+"' data-role='"+role_name+"' data-action='"+action+"'>"
  } else {
    return "<img class='empty-checkbox' src='"+emptyCheckboxIcon+"' data-role='"+role_name+"' data-action='"+action+"'>"
  }
}

function amendAllRelatedPermissions (role, table, action) {
  var humanizedTable = humanizeString(table)

  $(".permissions--nested-table-data[data-role='"+role+"'][data-table='"+humanizedTable+"']").each (function () {
    var checkbox = $(this).children()

    if (action === 'enable') {
      checkbox.attr({ "src": filledCheckboxIcon })
    } else if (action === 'disable') {
      checkbox.attr({ "src": emptyCheckboxIcon })
    }
  })
}

function enableTooltipOnContentClick () {
  $('body').on('click', '.permissions-enable-all', function (e) {
    e.preventDefault();
    var role = $(this).data('role');
    var table = $(this).data('table');

    $.post(
      "/permissions/enable_all",
      {
        role: role,
        table: table
      }
    );

    amendAllRelatedPermissions(role, table, 'enable');

    $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr({ "src": fullCircleIcon });
  });

  $('body').on('click', '.permissions-disable-all', function (e) {
    e.preventDefault();
    var role = $(this).data('role');
    var table = $(this).data('table');

    $.post(
      "/permissions/disable_all",
      {
        role: role,
        table: table
      }
    );

    amendAllRelatedPermissions(role, table, 'disable');

    $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr({ "src": emptyCircleIcon });
  });
}

function activateTooltipster () {
  $('.tooltipster-tooltip').each(function () {
    var role = $(this).data('role');
    var table = $(this).data('table');

    $(this).tooltipster({
      theme: ['tooltipster-shadow', 'tooltipster-shadow-customized'],
      side: 'bottom',
      trigger: 'click',
      triggerClose: {
        mouseleave: true
      },
      interactive: true,
      contentAsHTML: true,
      content: $('<div class="tooltip_templates">'+
        '<span id="tooltip_content">'+
        '<a href="#" class="permissions-enable-all" data-role="'+role+'" data-table="'+table+'">Enable</a>'+
        '<br>'+
        '<a href="#" class="permissions-disable-all" data-role="'+role+'" data-table="'+table+'">Disable</a>'+
        '</span>'+
        '</div>'
      ),
    });
  })
}

function formatNestedColumns ( d ) {
  var permissionsClass = 'class="permissions--nested-table-data"';
  var adminTd = permissionsClass+' data-role="Admin"';
  var salesTd = permissionsClass+' data-role="Sales"';
  var teamLeadTd = permissionsClass+' data-role="Team Lead"';

  return '<table id="permissions--nested-table" data-table="'+d.Table+'">'+
      '<tr>'+
          '<td '+permissionsClass+'><p>View</p></td>'+
          '<td '+adminTd+' data-action="view" data-table="'+d.Table+'">'+ displayCheckbox(d.Admin_view, 'Admin', 'view') +'</td>'+
          '<td '+salesTd+' data-action="view" data-table="'+d.Table+'">'+ displayCheckbox(d.Sales_view, 'Sales', 'view') +'</td>'+
          '<td '+teamLeadTd+' data-action="view" data-table="'+d.Table+'">'+ displayCheckbox(d.Team_Lead_view, 'Team Lead', 'view') +'</td>'+
      '</tr>'+
      '<tr>'+
          '<td '+permissionsClass+'><p>Create</p></td>'+
          '<td '+adminTd+' data-action="create" data-table="'+d.Table+'">'+ displayCheckbox(d.Admin_create, 'Admin', 'create') +'</td>'+
          '<td '+salesTd+' data-action="create" data-table="'+d.Table+'">'+ displayCheckbox(d.Sales_create, 'Sales', 'create') +'</td>'+
          '<td '+teamLeadTd+' data-action="create" data-table="'+d.Table+'">'+ displayCheckbox(d.Team_Lead_create, 'Team Lead', 'create') +'</td>'+
      '</tr>'+
      '<tr>'+
          '<td '+permissionsClass+'><p>Edit</p></td>'+
          '<td '+adminTd+' data-action="edit" data-table="'+d.Table+'">'+ displayCheckbox(d.Admin_edit, 'Admin', 'edit') +'</td>'+
          '<td '+salesTd+' data-action="edit" data-table="'+d.Table+'">'+ displayCheckbox(d.Sales_edit, 'Sales', 'edit') +'</td>'+
          '<td '+teamLeadTd+' data-action="edit" data-table="'+d.Table+'">'+ displayCheckbox(d.Team_Lead_edit, 'Team Lead', 'edit') +'</td>'+
      '</tr>'+
      '<tr>'+
          '<td '+permissionsClass+'><p>Delete</p></td>'+
          '<td '+adminTd+' data-action="delete" data-table="'+d.Table+'">'+ displayCheckbox(d.Admin_delete, 'Admin', 'delete') +'</td>'+
          '<td '+salesTd+' data-action="delete" data-table="'+d.Table+'">'+ displayCheckbox(d.Sales_delete, 'Sales', 'delete') +'</td>'+
          '<td '+teamLeadTd+' data-action="delete" data-table="'+d.Table+'">'+ displayCheckbox(d.Team_Lead_delete, 'Team Lead', 'delete') +'</td>'+
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
    "ordering": true,
    columnDefs: [
    {
      "orderable": true,
      "targets": 0,
    },
    {
      orderable: false,
      targets: [1, 2, 3]
    }],
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
      $(row).addClass( "original-row-permissions" );
      $(row).attr( "data-href",  previewUrl);
    },
    "initComplete": function(settings, json) {
      $('[id ^="target-table-"][id $="_filter"] input').unbind();
      $('[id ^="target-table-"][id $="_filter"] input').bind('keyup', function(e) {
        if(e.keyCode === 13) {
          searchableTable.search( this.value ).draw();
        }
      });
      activateTooltipster();
    }
  });

  $('body').on('click', '#target-table-permissions > tbody > tr.original-row-permissions > td:first-child', function () {
    var tr = $(this).closest('tr');
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

function getUniqueRelatedPermissions (role, table, permission) {
  var relatedPermissions = [];

  $(".permissions--nested-table-data[data-role='"+role+"'][data-table='"+table+"']").each (function () {
    var checkbox = $(this).children().attr('src');

    if ($(this).data('action') === permission) {
      return
    } else if (checkbox === emptyCheckboxIcon) {
      relatedPermissions.push(false)
    } else if (checkbox === filledCheckboxIcon) {
      relatedPermissions.push(true)
    }
  });

  return [...new Set(relatedPermissions)]
}

function updateTablePermissionsImg (role, table, permission, action) {
  var humanizedTable = table
  var table = deHumanizeString(table)
  var current_image_src = $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr("src");
  var image = current_image_src.substr(current_image_src.length - 5)
  var uniqueRelatedPermissions = getUniqueRelatedPermissions(role, humanizedTable, permission)
  var uniquePermissionStrings = uniqueRelatedPermissions.sort().toString()

  if (action === 'remove') {
    if (image === 'l.png') {
      $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr({ "src": halfFullCircleIcon });
    } else if (uniquePermissionStrings === 'false') {
      $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr({ "src": emptyCircleIcon });
    }
  } else if (action === 'add') {
    if (image === 's.png') {
      $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr({ "src": halfFullCircleIcon });
    } else if (uniquePermissionStrings === 'true') {
      $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+table+"']").attr({ "src": fullCircleIcon });
    }
  }
}

function addRolePermission (role, permission, table) {
  $.post(
    "/permissions/add_to_role",
    {
      role: role,
      permission: permission,
      table: deHumanizeString(table)
    }
  );

  $(".permissions--nested-table-data[data-role='"+role+"'][data-table='"+table+"'][data-action='"+permission+"']").children().attr({ "src": filledCheckboxIcon });
  updateTablePermissionsImg(role, table, permission, 'add')
}

function removeRolePermission (role, permission, table) {
  $.post(
    "/permissions/remove_from_role",
    {
      role: role,
      permission: permission,
      table: deHumanizeString(table)
    }
  );

  $(".permissions--nested-table-data[data-role='"+role+"'][data-table='"+table+"'][data-action='"+permission+"']").children().attr({ "src": emptyCheckboxIcon });

  if (permission === 'view') {
    amendAllRelatedPermissions(role, table, 'disable');
    $(".tooltipster-tooltip[data-role='"+role+"'][data-table='"+deHumanizeString(table)+"']").attr({ "src": emptyCircleIcon });
  } else {
    updateTablePermissionsImg(role, table, permission, 'remove')
  }
}

$(document).ready(function() {
  let metaTag = $("meta[name=psj]");
  let isCurrentControllerPermissions = metaTag.attr("controller") === "permissions";

  if (isCurrentControllerPermissions) {
    fetchDataForPermissionsTable();
  }

  $('body').on('click', '#target-table-permissions .empty-checkbox', function () {
    var role = $(this).data('role')
    var permission = $(this).data('action')
    var table = $(this).closest('table').data('table')

    addRolePermission(role, permission, table)
  });

  $('body').on('click', '#target-table-permissions .filled-checkbox', function () {
    var role = $(this).data('role')
    var permission = $(this).data('action')
    var table = $(this).closest('table').data('table')

    removeRolePermission(role, permission, table)
  });

  enableTooltipOnContentClick();
})
