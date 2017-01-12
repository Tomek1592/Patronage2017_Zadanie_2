function ScoreUI(_domElement, _format, _startValue) {
	"use strict";

	var self = this,
	    counterValue,
	    scoreCounter;

	self.domElement = _domElement;
	self.format = _format;
	self.startValue = _startValue;

	counterValue,
	scoreCounter = new ScoreCounter(
	    self.domElement.querySelector(".counter"),
	    self.format,
	    self.startValue
	);

	counterValue = self.domElement.querySelector(".counter").innerHTML;

	if (counterValue == 9 && self.format == 1 || 
	    counterValue == 99 && self.format == 2 || 
	    counterValue == 999 && self.format == 3 || 
	    counterValue == 9999 && self.format == 4) {
	        toggleDisabled(".up", true);
	}

	if (counterValue == 0 ) {
	    toggleDisabled(".down", true);
	    self.domElement.querySelector(".reset").disabled = true;
	    self.domElement.querySelector(".reset").style.color = "grey";
	}

	function toggleDisabled(selector, flag) {
	    self.domElement.querySelector(selector).disabled = flag;
	    (flag) ?
	        self.domElement.querySelector(selector).classList.add("grayed") :
		self.domElement.querySelector(selector).classList.remove("grayed");
	}

	function btnChecker(format, type) {
	    var max = "",
		i = 0,
		value;

		while(i < format) {
		    max = max + "9";
		    i++;
		}

		max = Number(max);

		switch(type) {
			case "up":
				if (counterValue == max - 1) {
					scoreCounter.up();
					toggleDisabled(".up", true);
				} else if (counterValue == 0) {
					scoreCounter.up();
					toggleDisabled(".down", false);
				} else {
					scoreCounter.up();
				}
				break;
		    case "down":
				if (counterValue == 1) {
					toggleDisabled(".down", true);
					self.domElement.querySelector(".reset").disabled = true;
					self.domElement.querySelector(".reset").style.color = "grey";
					scoreCounter.down();
				} else if (counterValue == max) {
					scoreCounter.down();
					toggleDisabled(".up", false);
				} else {
					scoreCounter.down();
				}
				break;
		    default:
				break;
		}
	}

	function inputChecker(format) {
	    var inputValue = self.domElement.querySelector(".value").value,
			counterValue = self.domElement.querySelector(".counter").innerHTML,
			bool1,
			bool2,
			bool3,
			bool4,
			max = "",
			i = 0;

        while(i < format) {
        	max = max + "9";
            i++;
        }

        max = Number(max);

        bool1 = inputValue > max && counterValue == 0;
		bool2 = inputValue < 0 && counterValue == 0;
		bool3 = inputValue > max && counterValue == max;
		bool4 = inputValue < 0 && counterValue == max;

		if (inputValue != "") {
			if (inputValue == 0) {
				toggleDisabled(".up", false);
				toggleDisabled(".down", true);
				self.domElement.querySelector(".reset").disabled = true;
				self.domElement.querySelector(".reset").style.color = "grey";
			} else if (inputValue == max || bool3 || bool4) {
				toggleDisabled(".up", true);
				toggleDisabled(".down", false);
				self.domElement.querySelector(".reset").disabled = false;
				self.domElement.querySelector(".reset").style.color = "black";
			} else if (bool1 || bool2) {
				toggleDisabled(".up", false);
				toggleDisabled(".down", true);
				self.domElement.querySelector(".reset").disabled = true;
				self.domElement.querySelector(".reset").style.color = "grey";
			} else {
				toggleDisabled(".up", false);
				toggleDisabled(".down", false);
				self.domElement.querySelector(".reset").disabled = false;
				self.domElement.querySelector(".reset").style.color = "black";
			}
		}
	}

	function validator(format) {
		var inputValue = self.domElement.querySelector(".value").value,
			max = "",
			i = 0;

        while(i < format) {
            max = max + "9";
            i++;
        }

        max = Number(max);

		if (inputValue < 0 || inputValue > max || inputValue == "") {
			self.domElement.querySelector(".validation").innerHTML = 
				"Enter a number from 1 to " + max + "!";
		}
	}

	self.domElement.querySelector(".up").addEventListener("click", function(){ // up button
		self.domElement.querySelector(".validation").innerHTML = "";
		counterValue = self.domElement.querySelector(".counter").innerHTML;

		btnChecker(self.format, "up");
		self.domElement.querySelector(".reset").disabled = false;
		self.domElement.querySelector(".reset").style.color = "black";
	});

	self.domElement.querySelector(".down").addEventListener("click", function(){ // down button
		self.domElement.querySelector(".validation").innerHTML = "";
		counterValue = self.domElement.querySelector(".counter").innerHTML;
		btnChecker(self.format, "down");
	});

	self.domElement.querySelector(".reset").addEventListener("click", function(){ // reset button
		self.domElement.querySelector(".validation").innerHTML = "";

		scoreCounter.reset();
		toggleDisabled(".up", false);
		toggleDisabled(".down", true);
		self.domElement.querySelector(".reset").disabled = true;
		self.domElement.querySelector(".reset").style.color = "grey";
	});

	self.domElement.querySelector(".get").addEventListener("click", function(){ // get button
		self.domElement.querySelector(".validation").innerHTML = "";
		scoreCounter.value();
	});

	self.domElement.querySelector(".set").addEventListener("click", function(){ // set button
		var inputValue = self.domElement.querySelector(".value").value;

		scoreCounter.value(inputValue);
		self.domElement.querySelector(".validation").innerHTML = "";
		validator(self.format);
		inputChecker(self.format);
		self.domElement.querySelector(".value").value = "";
	});
	
	self.domElement.querySelector(".delete").addEventListener("click", function(){ // delete button
		var node = self.domElement;
		
		node.parentNode.removeChild(node);
	});
}
