/* Get a Twilio Client token with an AJAX request */
$(document).ready(function() {
  $.post("/token/generate", {page: window.location.pathname}, function(data) {
    // Set up the Twilio Client Device with the token
    Twilio.Device.setup(data.token);
  });

  /* Report any errors to the call status display */
  Twilio.Device.error(function (error) {
    updateCallStatus("ERROR: " + error.message);
  });

  /* Callback to let us know Twilio Client is ready */
  Twilio.Device.ready(function (device) {
    updateCallStatus("Ready");
  });

  /* Callback for when Twilio Client initiates a new connection */
  Twilio.Device.connect(function (connection) {
    $("#call-status").removeClass('hide');
    $(".hangup-button").prop("disabled", false);
  });

  /* Callback for when a call ends */
  Twilio.Device.disconnect(function(connection) {
    $("#call-status").addClass('hide');
    $(".hangup-button").prop("disabled", true);
    $(".call-customer-button").prop("disabled", false);
    updateCallStatus("Ready");
  });
});

/* Call a customer from a support ticket */
function callCustomer(phoneNumber) {
  updateCallStatus("Calling " + phoneNumber + "...");

  var params = {"phoneNumber": phoneNumber};
  Twilio.Device.connect(params);
}

/* Helper function to update the call status bar */
function updateCallStatus(status) {
  $("#call-status").text(status);
}

/* End a call */
function hangUp() {
  Twilio.Device.disconnectAll();
}
