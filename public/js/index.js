$(document).ready(function() {
	"use strict";

	$("html,body").css('cursor', "url(http://icons.iconarchive.com/icons/sirea/sharp-kitchen/128/Knife-icon.png), auto");

	var moles;
	var userGuess;
	var level;
	var highScore = 0;
	var duration = 500;
	var timer;


	function startGame() {
	    intervalMole();
	    timer = 30;
		level = 0;
	}

	function randomMole() {
		moles = Math.floor(Math.random() * (9) + 1);
		console.log(moles);
		return moles;
	}

	function animateMole(random_hole) {
		$("[data-tile='" + random_hole + "'] img").animate({
			top: '-80px'
		}, duration)
		console.log("top");

		setTimeout(function() {
			$("[data-tile='" + random_hole + "'] img").animate({
				top: '100px'
			}, duration)
		}, duration + 100)

		$(".gameboard").on("click", "img", function() {
			console.log("clicked");
			$("html,body").css('cursor', "url(http://wcdn2.dataknet.com/static/resources/icons/set57/6ff26b3b.png), auto");
			level += 1;
			$(this).hide("explode", {pieces: 100});
			console.log(level);
		});
		$("html,body").delay(2000).css('cursor', "url(http://icons.iconarchive.com/icons/sirea/sharp-kitchen/128/Knife-icon.png), auto");
	}

	function intervalMole() {
		var timerInterval = setInterval(function() {
			timer--;
			console.log("Timer: " + timer);
			onRound();
			if(timer == 0) {
				clearInterval(timerInterval);
				var x = confirm("Play again?");
				if(x == true) {
					startGame();
				} else {
					endGame();
				}
				
			}
			animateMole(randomMole());

		}, 1000);
	}

	function selectLevel (){
		var value = $('.active').val();
		console.log(value);
		switch (value) {
		    case "easy":
		    	duration = 2000;
		    	break;
		    case "medium":
		    	duration = 500;
		    	break;
		    case "hard":
		    	duration = 150;	
		    	break;
			}
	}

	function onRound() {
		$("#timer").html("Timer: " + timer);
		$("#level").html("Level: " + level);
		if (level > highScore) {
			highScore = level;
			$("#record").html("Record: " + highScore);
		}
	}

	function endGame() {
		console.log("Game ended!")
	}

	$(".btn-group button:first-child").addClass("active");
	
	$(".btn-group button").click(function() {
		// if($('.btn-group button').hasClass('active')){
		// 	$('btn-group button').removeClass('active')
		// } 
		$(this).addClass('active');
		
		
		// if($(".active")) {
		// 	$(this).removeClass("active");
		// }
		// $(this).addClass("active");
		// if(timer == 0) {
		// 	$(this).removeClass("active");
		// }
	});
	
	$('#start').click(function() {
	    startGame();
	    selectLevel();
	});

	// $('#pause').click(function() {
	//     pauseGame();
	// });


});