var enjoyhint;

$(document).ready(function() {
  let metaTag = $('meta[name=psj]');
  let isCurrentControllerDashboard = metaTag.attr('controller') == 'dashboard';
  let isCurrentActionShow = metaTag.attr('action') == 'show';

  loadFlotChart();
  loadFooTable();
  loadToastr();
  loadEnjoyhint();

  //run Enjoyhint script only on dashboard
  if (isCurrentControllerDashboard && isCurrentActionShow) {
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

function loadEnjoyhint() {
  enjoyhint = new EnjoyHint({});

  var enjoyhint_script_steps = [
    {
      'click #nav-link-for-tables' : 'Click on tables to show tables available on database',
    },

    {
      'click #nav-link-for-users-table' : 'Click on users',
    },

    {
      'click #column-visibility-settings-modal-trigger' : 'You can change number of columns visible in the table here',
    },
  ];

  //set script config
  enjoyhint.set(enjoyhint_script_steps);
}
