$(document).ready(function() {
	"use strict";

	var moles;
	var userGuess;
	var level = 0;
	var highScore = 0;
	var timer = 30;


	function startGame() {
	    addMole();
	    intervalMole();
	}

	function randomMole() {
		moles = Math.floor(Math.random() * (9) + 1);
		console.log(moles);
		return moles;
	}

	function animateMole(random_hole) {
		var mole = $("[data-tile='" + random_hole + "']");
		$(mole).append("<img src='/img/whackamole.png' />");
		setTimeout(function() {
			$(mole).remove("img");
		}, 1000)
	}

	function intervalMole() {
		var timerInterval = setInterval(function() {
			timer--;
			console.log("Timer: " + timer);
			setTimer();
			if(timer == 0) {
				clearInterval(timerInterval);
			}
			animateMole(randomMole());

		}, 1000);
	}

	function onRound(sequence) {
		$("#level").html("Level: " + sequence);
		if (sequence > record) {
			record = sequence;
			$("#record").html("Record: " + record);
		}
	}

	function setTimer() {
		$("#timer").html("Timer: " + timer);
	}

	function nextRound() {
		userGuess = '';
		moles = '';
		onRound(moles);
		intervalMole();
	}

	function checkValue(sequence, user) {
		if (sequence == user) {
			return true;
		}
		return false;
	}

	function validateValue(sequence, user) {
		var right = checkValue(moles, userGuess);
		if (right == false) {
			userGuess = '';
			moles = '';
			onRound(moles);
			alert("Game Over");
		}
		else {
			nextRound();
		}
	}

	function addMole() {
		
	}

	function getNewHole() {

	}


	function endGame() {

	}

	$('#start').click(function() {
	    startGame();
	});

});