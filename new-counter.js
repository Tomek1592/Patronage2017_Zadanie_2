(function () {
	var addButton = document.getElementById("buttons-wrapper").querySelector(".add"),
		id;

	addButton.addEventListener("click", function(){
		var node,
			attr,
			amountOfCounters = document.querySelectorAll(".counter").length,
			countersNames = document.querySelectorAll(".counter-name"),
			countersNamesLength = document.querySelectorAll(".counter-name").length,
			lastCounter,
			template,
			userFormat,
			userNumber,
			flag;

		function error(userFormat) {
			var number = "",
				i = 0,
				flag = false;

			while( i < userFormat) {
				number = number + "9";
				i++;
			}

			number = Number(number);
			userNumber = prompt("Type start number for new counter (0-" + number + ").");

			while(!flag) {
				if (userNumber < 0 || userNumber > number) {
					alert("Type number 0-" + number + "!");
					userNumber = prompt("Type start number for new counter (0-" + number + ").");
				} else {
					flag = true;
				}
			}
		}

		id = 1;

		if (!amountOfCounters) {
			attr = "score-" + id;
		} else {
			lastCounter = Number(countersNames[countersNamesLength-1].innerHTML.substring(6));
			id = lastCounter + 1;
			attr = "score-" + id;
		}

		template = "<h1><span class=\"counter-name\">Score " + id + 
						" </span></br><span class=\"counter\"></span></br></h1>" +
							"<form>" +
								"<button type=\"button\" class=\"up btn btn-counter\">+</button> " +
								"<button type=\"button\" class=\"down btn btn-counter\">-</button></br></br> " +
								"<div class=\"apiWrapp\">" + 
								"<button type=\"button\" class=\"get btn\">Get</button> " +
								"<input class=\"value\" type=\"number\"> " +
								"<button type=\"button\" class=\"set btn\">Set</button> " +
								"<button type=\"button\" class=\"reset btn\">Reset</button> " +
								"</div>" +
								"<button type=\"button\" class=\"delete btn\">X</button> " +
							"</form> " +
							"<p class=\"validation\"></p> ";

		node = document.createElement("div");
		node.setAttribute("id", attr);
		node.setAttribute("class", "score");
		node.innerHTML = template;
		document.getElementsByClassName("counters-wrapper")[0].appendChild(node);

		flag = false;

		userFormat = prompt("Type format for new counter (1-4).");

		while(!flag) {
			if (userFormat < 1 || userFormat > 4) {
				alert("Type number 1-4!");
				userFormat = prompt("Type format for new counter (1-4).");
			} else {
				flag = true;
			}
		}

		error(userFormat);

		window[attr] = 
			new ScoreUI(document.getElementById(attr), Number(userFormat), Number(userNumber));
	});

})();