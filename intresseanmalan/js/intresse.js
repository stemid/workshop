// This is weird. Months start from zero when comparing them in this callback!
var workshopDates = ['2013-9-29', '2013-10-26'];

// Callback function for jquery-ui datepicker to disable dates.
function availableDates (date) {
  day = date.getDate();
  month = date.getMonth();
  current_date = date.getFullYear() + '-' + month + '-' + day;
  console.log(current_date + ' - ' + date);
  if ($.inArray(current_date, workshopDates) !== -1) {
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
		dayNames: ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'],
		dayNamesMin: ['Må', 'Ti', 'On', 'To', 'Fr', 'Lö', 'Sö'],
		dayNamesShort: ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'],
		monthNames: [
			'Januari', 
			'Februari', 
			'Mars', 
			'April', 
			'Maj', 
			'Juni', 
			'Juli', 
			'Augusti', 
			'September', 
			'Oktober', 
			'November', 
			'December'
		],
		monthNamesShort: [
			'Jan', 
			'Feb', 
			'Mar', 
			'Apr', 
			'Maj', 
			'Jun', 
			'Jul', 
			'Aug', 
			'Sep', 
			'Okt', 
			'Sep', 
			'Dec'
		],
		firstDay: 0,
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
