// This is weird. Months start from zero when comparing them in this callback!
//var workshopDates = ['2013-9-29', '2013-10-26'];
var workshopDates = [
  new Date('2013-10-29T00:00:00').getTime(), 
  new Date('2013-11-26T00:00:00').getTime()
]

// Callback function for jquery-ui datepicker to disable dates.
function availableDates (date) {
  if ($.inArray(date.getTime(), workshopDates) !== -1) {
    return [true, "", "Workshop"];
  } else {
    return [false, "", "Ingen workshop"];
  }
}

$(document).ready(function() {
  var alertSuccess = $('#register-success');
  var alertError = $('#register-error');

  $('.close').on('click', function () {
    $(this).parent().hide(250);
  });

  $('#interest-form').submit(function (event) {
    var request;

    if (request) {
      request.abort();
    }

    event.preventDefault();

    var $form = $(this);
    var $inputs = $form.find('input');
    var url = $form.attr('action');
    var sendData = $form.serialize();

    $inputs.prop('disabled', true);
    $('.btn').button('loading');

    request = $.get(url, sendData);

    request.done(function () {
      alertError.hide(0);
      alertSuccess.show(100);
    });

    request.error(function (jq, status, message) {
      alertSuccess.hide(0);
      alertError.show(10);
      console.log(status + ',' + message);
    });

    request.always(function () {
      $inputs.prop('disabled', false);
      $('.btn').button('reset');
    });
  });

  // Datepicker
  var dateArgs = {
    dateFormat: 'yy-mm-dd',
    regional: 'se',
    firstDay: 1,
    minDate: "2013-10-01",
    maxDate: "2014-01-01",
    showMonthAfterYear: true,
    constraintInput: true,
    // Funny display options
    //showAnim: 'explode',
    //showOptions: {pieces: 8},
    beforeShowDay: availableDates
  }

  $('#date-picker').datepicker(dateArgs);
});
