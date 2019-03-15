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
  let description = "Welcome to Kuwinda \n\n" +
  "We’d love to show you around quickly. \n\n" +
  "We have the app connected to a dummy database for a very basic events app. \n\n" +
  "Click on the tables to show tables available from the database.";

  var enjoyhint_script_steps = [
    {
      description: "Welcome to Kuwinda",
      selector: '#enjoyhint-welcome-handler',
      showNext: true,
    },

    {
      description: "We’d love to show you around quickly.",
      selector: '#enjoyhint-welcome-handler',
      showNext: true,
      showSkip: false,
    },

    {
      description: "We have the app connected to a dummy database for a very basic events app.",
      selector: '#enjoyhint-welcome-handler',
      showNext: true,
      showSkip: false,
    },

    {
      'click #nav-link-for-tables' : 'Click on the tables to show tables available from the database.',
      showSkip: false,
    },

    {
      'click .nav-second-level' : 'When first setting up Kuwinda, it automatically finds all the tables available to it in your database and presents them here.',
      showNext: true,
      showSkip: false,
    },

    {
      'click .nav-second-level' : 'Click on users to see the users table.',
      showSkip: false,
    }
  ];

  enjoyhint.set(enjoyhint_script_steps);
}

function loadEnjoyhint2() {
  enjoyhint = new EnjoyHint({});

  var enjoyhint_script_steps = [
    {
      'click .footable-header' : 'By default Kuwinda will show all of the fields that it can find in the table.',
      timeout: 800,
      showNext: true,
      showSkip: false,
    },

    {
      'click .clickable-row:first' : 'Click on the first user to look at that user in a bit more detail.',
      showSkip: false,
    }
  ];

  enjoyhint.set(enjoyhint_script_steps);
}

function loadEnjoyhint3() {
  enjoyhint = new EnjoyHint({});

  var enjoyhint_script_steps = [
    {
      'click .enjoyhint-table-detail-handler' : 'A layout is built using the fields from a table. It can also show fields from related tables. We have included the ability to comment on records and will be adding more here soon.',
      showNext: true,
      showSkip: false,
    },
    {
      'click .edit-layout-btn' : 'Click on Edit layout to see how a layout is built',
      showSkip: false,
    }
  ];

  enjoyhint.set(enjoyhint_script_steps);
}

function loadEnjoyhint4() {
  enjoyhint = new EnjoyHint({});

  var enjoyhint_script_steps = [
    {
      'click .logo-thumbnail' : 'Welcome to the layout editor. Here you can build your layouts using our drag and drop editor. You can add fields from the main table or fields from related tables.',
      showNext: true,
      showSkip: false,
    },

    {
      'click .layout-builder-side-nav' : 'Click into users and try adding some fields',
      showSkip: false,
    },

    {
      'click .logo-thumbnail' : 'Finish tour',
      showSkip: false,
      showNext: true,
    }
  ];

  enjoyhint.set(enjoyhint_script_steps);
}
