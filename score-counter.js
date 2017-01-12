function ScoreCounter(_domElement, _format, _startValue) {
    "use strict";

    var self = this;

    initilize(_domElement, _format, _startValue);

    return {
        up: up,
        down: down,
        reset: reset,
        value: value
    };

    function initilize(_domElement, _format, _startValue) {
        self.domElement = _domElement;
        self.format = _format;
        self.startValue = _startValue;
        self.counter = self.domElement.innerHTML;

        setCounterValue(self.startValue);
    }

    function setCounterValue(value) {
        self.counter = formatCounterValue(value, self.format);
        self.domElement.innerHTML = self.counter;
    }

    function formatCounterValue(value, format) {
        var stringValue = value + "";
        while (stringValue.length < format) {
           stringValue = "0" + stringValue;
        }
        return stringValue;
    }

    function rangeCheck(format, value) {
        var max = "", 
            i = 0;

        while(i < format) {
            max = max + "9";
            i++;
        }

        max = Number(max);

        if (value <= max && value >= 0) {
            return value;
        } else {
            return self.counter;
        }
    }

    function up() {
        self.counter++;
        self.counter = formatCounterValue(self.counter, self.format);
        self.domElement.innerHTML = self.counter;
    }

    function down() {
        self.counter--;
        self.counter = formatCounterValue(self.counter, self.format);
        self.domElement.innerHTML = self.counter;
    }

    function reset() {
        self.counter = formatCounterValue(0, self.format);
        self.domElement.innerHTML = self.counter;
    }

    function value(...value) {
        if (value.length) {
            if (value[0].length) {
                self.counter = rangeCheck(self.format, value[0]);
                self.counter = formatCounterValue(self.counter, self.format);
                self.domElement.innerHTML = self.counter;
            } 
        } else {
            alert(self.domElement.innerHTML);
        }
    }
}
