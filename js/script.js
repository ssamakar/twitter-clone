//e3#E

$(document).ready(function(){

	$("abbr.timeago").timeago();

	var handle = $("body p").first().text();

	//wrap all functions into an initialize function.
	var init = function(){
		// step 2: upon clicking text area, text area should double in size and tweet button and character count should show up.
		// used $().focus in case user "tabs" into text area instead of clicking.
		// used $().blur to remove buttons after user exits text area.
		$("#tweet-content > .tweet-compose").focus(function(){
			//var textAreaHeight = $(this).height();
			//$(this).css({"height": textAreaHeight*2})
			$(this).css({"height": "10em"})
			$("#tweet-controls").show();
		});
		
		//remove the button and return the box to default size ONLY if user hasn't started a tweet
		$("#tweet-content > .tweet-compose").blur(function(){
			if ($("#char-count").text() == 140){
				$("#tweet-content > .tweet-compose").css({"height": "2.5em"})
				$("#tweet-controls").hide();
				//TODO: change text color to gray upon blur
			}
		});

		//step 3: as the user types in the textbox, the number of characters should change to reflect how many characters they have left.
		$(".tweet-compose").on('input', function(){
			$("#char-count").text(140 - $("textarea").val().length);
		
			//show how many characters we have left
			if ($("#char-count").text() <= 10){
				$("#char-count").css({"color": "red"});
				} else {$("#char-count").css({"color": "#999"});}

			//disable tweet button when we have too many characters
			if ($("#char-count").text() < 0){
				//$("#tweet-submit").css({"opacity": ".5"});
				($("#tweet-submit").attr("disabled", "true"));
				//$("#tweet-submit").on("click", event.preventDefault());
			}

			if ($("#char-count").text() >= 0){
				($("#tweet-submit").removeAttr("disabled"));
				//TODO: do we need to re-enable the tweet button after event.preventDefault()??
			}

		});

		//upon clicking the tweet area, the reply and stats divs should show up. disappear them when user mouses out.
		$(".tweet").click(function(){
			$(this).find(".reply, .stats").slideDown();
		})
		$(".tweet").mouseleave(function(){
			$(this).find(".reply, .stats").slideUp();
		});
	};

	$("#tweet-submit").on('click', function(){
		var tweetText = $(".tweet-compose").val();
		var newTweet = $("#stream .tweet").first().clone();
		$(newTweet).find("p").first().text(tweetText);
		$(newTweet).find("img").first().attr("src", "img/alagoon.jpg");
		$(newTweet).find(".fullname").text(handle);
		$(newTweet).find(".username").text("@hacksaw");
		$("#tweet-content > .tweet-compose").css({"height": "2.5em"})
		$("#tweet-content > .tweet-compose").val("")
	 	$("#tweet-controls").toggle();
		$("#stream").prepend(newTweet);
		$("#char-count").text(140);
		//call initialize function again after adding a new tweet
		init();
	});

	//call initialize function when the page loads
	init();

});