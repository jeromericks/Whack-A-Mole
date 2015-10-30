$(document).ready(function() {
	"use strict";

	$("html,body").css('cursor', "url(http://icons.iconarchive.com/icons/sirea/sharp-kitchen/128/Knife-icon.png), auto");

	var moles;
	var userGuess;
	var score;
	var highScore = 0;
	var duration = 500;
	var timer;
	var timerInterval;
	var audio = new Audio('/sound/head.mp3');
	var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65, 13];
	var user = [];
	var reset = false;

	function startGame() {
		if (!$(".btn-default").hasClass("active")) {
			$(".btn-default:first-child").addClass("active");
		}
		$("img").attr("src","/img/whackamole.png");
	    intervalMole();
	    timer = 30;
		score = 0;
	}

	function randomMole() {
		moles = (Math.floor(Math.random() * 9) + 1);
		// console.log(moles);
		return moles;
	}

	function animateMole(random_hole) {
		$("[data-tile='" + random_hole + "'] img").animate({
			top: '-80px'
		}, duration)
		// console.log("top");

		setTimeout(function() {
			$("[data-tile='" + random_hole + "'] img").animate({
				top: '100px'
			}, duration)
		}, duration + 750)

	}

	$(".gameboard").on("click", "img", function() {
		$("html,body").css('cursor', "url(http://wcdn2.dataknet.com/static/resources/icons/set57/6ff26b3b.png), auto");
		score += 1;
		$(this).hide("explode", {pieces: 100}, 100).show("explode", {pieces: 100}, 100);
		audio.play();
		setTimeout(function () {
			$("html,body").css('cursor', "url(http://icons.iconarchive.com/icons/sirea/sharp-kitchen/128/Knife-icon.png), auto");
		}, 100);
	});

	function intervalMole() {
		timerInterval = setInterval(function() {
			timer--;
			// console.log("Timer: " + timer);
			onRound();
			if(timer == 0) {
				clearInterval(timerInterval);
				var x = confirm("Play again?");
				if(x) {
					startGame();
				} else {
					endGame();
				}

			}
			animateMole(randomMole());

		}, 1000);
	}

	function selectLevel() {
		var value = $('.active').val();
		// console.log(value);
		switch (value) {
		    case "easy":
		    	duration = 1000;
		    	break;
		    case "medium":
		    	duration = 750;
		    	break;
		    case "hard":
		    	duration = 500;	
		    	break;
			}
			// var x = "extreme";
			// if(x) {
			// 	switch (value) {
			// 		case "extreme":
			// 	    	duration = 150;	
			// 	    	break;
			// 		}
			// 	}
			// }
	}

	function onRound() {
		$("#timer").html("Timer: " + timer);
		$("#score").html("Score: " + score);
		if (score > highScore) {
			highScore = score;
			$("#record").html("Record: " + highScore);
		}
	}

	function endGame() {
		clearDifficulty();
		$(".btn-default:first-child").addClass("active");
		timer = 30;
		score = 0;
	}

	function clearDifficulty() {
		// console.log($('.btn-default'));
		if($('.btn-default').hasClass('active')){
			$('.btn-default').removeClass('active');
			// console.log($(this));
		} 
	}	

	// $(".btn-default:first-child").addClass("active");
	
	$(".btn-default").click(function() {
		clearDifficulty();
		$(this).addClass('active');
	});
	
	$('#start').click(function() {
	    startGame();
	    selectLevel();
	});

	

	// $('#nuke').click(function() {
	// 	$(".tile").css("background-image", "url(/img/explosion.png");
	// });

	// $('#pause').click(function() {
	//     pauseGame();
	// });
	
	$(document).keyup(function(event){
		user.push(event.keyCode);

		if(user[user.length - 1] != konami[user.length - 1]) {
			user = [];
		}

		if(user.length == konami.length) {
			alert("Nuke Mode unlocked");
			$("img").attr("src","/img/explosion.png");
			$("img").animate({
				top: '-90px'
			}, duration)
			// console.log("top");
			setTimeout(function() {
				$("img").animate({
					top: '95px'
				}, duration)
			}, duration + 750)
			$('.btn-group').append('<button type="button" class="btn btn-default" id="reset">Reset to Mole Mode</button>')
			$('#reset').click(function() {
				reset = true;
			});
			if(reset == true) {
				var replaced = $("body").html().replace('Reset to Nuke Mode','Reset to Mole Mode');
				$("button").html(replaced);
				startGame();
			}
			// $(".hole-container").css("background", "url(/img/explosion.png)no-repeat center").css("z-index", 5);
			// $(".tile").css("z-index", -1);
		}
	});
	startGame();
	endGame();



});