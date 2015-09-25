'use strict';

var Time = function (hr, min) {
	this.hr = hr;
	this.min = min;
};

/**
 * Gets the string representation for hr or min value
 * @param  {[Number} val [hr or min value]
 */
function getString(val) {
	return Math.floor(val / 10) === 0
				? "0" + val
				: val;
}

Time.prototype.toString = function (beforeNoon) {
	var self = this;

	return getString(self.hr) + ":" + getString(self.min) + (beforeNoon ? "AM" : "PM");
};

/**
 * Get new time after adding duration of an event in mins
 * @param {Number} duration [Duration of event to be added]
 */
Time.prototype.add = function (duration) {
	var self = this;
	self.min += duration;
	if (self.min >= 60) {
		self.hr += 1;
		self.min = self.min - 60;
	}
};

module.exports = Time;