var enjoyhint;

$(document).ready(function() {
  let metaTag = $('meta[name=psj]');
  let isCurrentControllerDashboard = metaTag.attr('controller') == 'dashboard';
  let isCurrentControllerTables = metaTag.attr('controller') == 'tables';
  let isCurrentControllerLayoutBuilder = metaTag.attr('controller') == 'layout_builder';
  let isCurrentActionShow = metaTag.attr('action') == 'show';
  let isCurrentActionPreview = metaTag.attr('action') == 'preview';
  let isCurrentActionEdit = metaTag.attr('action') == 'edit';

  loadFlotChart();
  loadFooTable();
  loadToastr();

  if (isCurrentControllerDashboard && isCurrentActionShow) {
    loadEnjoyhint1();
    enjoyhint.run();
  }

  if (isCurrentControllerTables && isCurrentActionShow) {
    loadEnjoyhint2();
    enjoyhint.run();
  }

  if (isCurrentControllerTables && isCurrentActionPreview) {
    loadEnjoyhint3();
    enjoyhint.run();
  }

  if (isCurrentControllerLayoutBuilder && isCurrentActionEdit) {
    loadEnjoyhint4();
    enjoyhint.run();
  }
});

function loadFooTable () {
  $('.footable').footable();
}

function loadFlotChart() {
  var data1 = [
    [0, 4], [1, 8], [2, 5], [3, 10], [4, 4], [5, 16], [6, 5], [7, 11], [8, 6], [9, 11], [10, 30], [11, 10], [12, 13], [13, 4], [14, 3], [15, 3], [16, 6]
  ];

  var data2 = [
    [0, 1], [1, 0], [2, 2], [3, 0], [4, 1], [5, 3], [6, 1], [7, 5], [8, 2], [9, 3], [10, 2], [11, 1], [12, 0], [13, 2], [14, 8], [15, 0], [16, 0]
  ];

  $("#flot-dashboard-chart").length && $.plot($("#flot-dashboard-chart"), [
    data1, data2
  ],
  {
    series: {
      lines: {
        show: false,
        fill: true
      },
      splines: {
        show: true,
        tension: 0.4,
        lineWidth: 1,
        fill: 0.4
      },
      points: {
        radius: 0,
        show: true
      },
      shadowSize: 2
    },
    grid: {
      hoverable: true,
      clickable: true,
      tickColor: "#d5d5d5",
      borderWidth: 1,
      color: '#d5d5d5'
    },
    colors: ["#1ab394", "#1C84C6"],
    xaxis: {
    },
    yaxis: {
      ticks: 4
    },
    tooltip: false
  }
);
}

function loadToastr() {
  toastr.options = {
      closeButton: true,
      howMethod: 'fadeIn',
      hideMethod: 'fadeOut',
      preventDuplicates: true,
      timeOut: 2000
  };
}

function loadEnjoyhint1() {
  enjoyhint = new EnjoyHint({});

  var enjoyhint_script_steps = [
    {
      'click #nav-link-for-tables' : 'Click on tables to show tables available on database',
    },

    {
      'click #nav-link-for-users-table' : 'Click on users',
    }
  ];

  enjoyhint.set(enjoyhint_script_steps);
}

function loadEnjoyhint2() {
  enjoyhint = new EnjoyHint({});

  var enjoyhint_script_steps = [
    {
      'click #column-visibility-settings-modal-trigger' : 'You can change number of columns visible in the table here',
    },
    {
      'click .clickable-row:first' : 'Click on first user',
    }
  ];

  enjoyhint.set(enjoyhint_script_steps);
}

function loadEnjoyhint3() {
  enjoyhint = new EnjoyHint({});

  var enjoyhint_script_steps = [
    {
      'click .edit-layout-btn' : 'Click on Edit Layout to change what is visible on the page',
    }
  ];

  enjoyhint.set(enjoyhint_script_steps);
}

function loadEnjoyhint4() {
  enjoyhint = new EnjoyHint({});

  var enjoyhint_script_steps = [
    {
      'click .layout_builder_selected_table_name:first' : 'Click here to get tables with related fields to the current table',
    },
    {
      'click #layout-builder-draggable-fields-container' : 'Drag fields from here onto the page',
    },
    {
      event: 'click',
      selector: '.wrapper-content .layout-builder-field-editable-toggle:first',
      description: 'Select this to make this field editable on the page'
    },
    {
      'click .preview-layout' : 'Click here to preview your changes',
    },
  ];

  enjoyhint.set(enjoyhint_script_steps);
}
