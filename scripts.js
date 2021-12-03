$(window).on('load', function() {
	var interval,
		timerMinutes,
		timerSeconds,
		minutesInSeconds,
		totalSeconds;

	setTimer();

	function setTimer() {
		// Parsing integer to avoid extra string processing
		timerMinutes = parseInt($('.text-minutes').html(), 10);
		timerSeconds = parseInt($('.text-seconds').html(), 10);
		checkIfSecondsOverSixty(timerSeconds, timerMinutes);
		// Getting total seconds
		minutesInSeconds = timerMinutes * 60;
		totalSeconds = minutesInSeconds + timerSeconds;
	}

	function checkIfSecondsOverSixty(timerSeconds, timerMinutes) {
		// Failsafe so we don't have seconds values over 59
		if (timerSeconds > 59) {
			timerSeconds = timerSeconds - 60;
			timerMinutes++;
			checkIfSecondsOverSixty(timerSeconds, timerMinutes)
		} else {
			timerSeconds = timerSeconds;
			// Adding trailing zero when minutes and seconds are <10
			timerSeconds = (timerSeconds < 10) ? '0' + timerSeconds : timerSeconds;
			timerMinutes = (timerMinutes < 10) ?  '0' + timerMinutes : timerMinutes;
			// Setting timer html to correct value
			$('.text-minutes').html(timerMinutes);
			$('.text-seconds').html(timerSeconds);
		}
	}

	function startTimer(currentSeconds) {
		$('.progress-bar').removeClass('green');
		$('.progress-bar').addClass('red');
		var secondsCountdown = currentSeconds ? currentSeconds : totalSeconds;
		var secondsPercentage;
		interval = setInterval(function() {
		    // Parsing integer to avoid extra string processing
			var minutes = parseInt($('.text-minutes').html(), 10);
			var seconds = parseInt($('.text-seconds').html(), 10);
		    --seconds;
			--secondsCountdown;
			secondsPercentage = (secondsCountdown / totalSeconds) * 100;
		    minutes = (seconds < 0) ? --minutes : minutes;
		    seconds = (seconds < 0) ? 59 : seconds;
			// Adding trailing zero when minutes and seconds are <10
			minutes = (minutes < 10) ?  '0' + minutes : minutes;
		    seconds = (seconds < 10) ? '0' + seconds : seconds;

			$('.text-minutes').html(minutes);
			$('.text-seconds').html(seconds);
			$('body').get(0).style.setProperty('--progress', secondsPercentage + '%');
			timerMinutes = parseInt(minutes, 10);
			timerSeconds = parseInt(seconds, 10);
		    if (minutes === '00' && seconds === '00') {
		        clearInterval(interval);
				$('.progress-bar').addClass('green');
				$('.toggle-btn').addClass('hide');
				$('.done').removeClass('hide');
		    }
		}, 1000);
	}

	function stopTimer() {
		$('.toggle-btn').addClass('hide');
		$('.start').removeClass('hide');
		clearInterval(interval);
	}

	function resetTimer() {
		$('body').get(0).style.setProperty('--progress', '100%');
		$('.progress-bar').removeClass('green');
		$('.toggle-btn').addClass('hide');
		$('.start').removeClass('hide');
	}

	// Start timer
	$('.start').click(function() {
		if (timerMinutes === 0 && timerSeconds === 0) {
			alert('Please set the timer first.');
			return;
		}
		$('.toggle-btn').addClass('hide');
		$('.stop').removeClass('hide');
		// Getting seconds left in timer to restart with right number
		var totalTimerSeconds = (timerMinutes * 60) + timerSeconds;
		startTimer(totalTimerSeconds);
	});

	// Stop timer
	$('.stop').click(function() {
		stopTimer();
	});

	// Reset timer
	$('.done').click(function() {
		resetTimer();
	});

	$('.edit-btn').click(function() {
		stopTimer();
		$('.options-btn').addClass('hide');
		$('.confirm-btn').removeClass('hide');
		$('.toggle-btns').addClass('hide');
		$('.timer-text').addClass('hide');
		$('.timer-inputs').removeClass('hide');
		$('.input-minutes').val('');
		$('.input-seconds').val('');
		$('.input-minutes').focus();
	})

	$('.confirm-btn').click(function() {
		stopTimer();
		$('.options-btn').addClass('hide');
		$('.edit-btn').removeClass('hide');
		$('.toggle-btns').removeClass('hide');
		$('.timer-text').removeClass('hide');
		$('.timer-inputs').addClass('hide');
		var min = $('.input-minutes').val() ? $('.input-minutes').val() : 0;
		var sec = $('.input-seconds').val() ? $('.input-seconds').val() : 0;
		$('.text-minutes').html(min);
		$('.text-seconds').html(sec);
		setTimer();
		resetTimer();
	})

	$('.input-minutes').on('input', function(ev) {
		if ($('.input-minutes').val().length === 2) {
			$('.input-seconds').focus();
		}
	})

	$('.input-seconds').on('input', function(ev) {
		if ($('.input-seconds').val().length === 0) {
			$('.input-minutes').focus();
		}
	})
});
