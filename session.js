'use strict';
var Time = require('./time');

/**
 * Constructor initialises session values based on whether it is preLunch or postLunch
 * Max available time is 180 min for morning sessions and 240 min for afterNoon sessions
 * Start time of morning session is 9:00 AM and afternoon session is 1:00 PM
 */
var Session = function (isPreLunch) {
	this.events = [];
	this.timeRemaining = isPreLunch ? 180 : 240;
	//Current time in the session
	this.sessionTime = isPreLunch ? new Time(9, 0) : new Time(1, 0);
};

/**
 * Update the current time for the sesson with event duration and also the time remaining
 * @param  {Number} duration [Event duration]
 * @return {[type]}          [description]
 */
Session.prototype.updateSessionTime = function (duration) {
	var self = this;
	if (duration) {
		self.timeRemaining -= duration;
		self.sessionTime.add(duration);
	}
};

/**
 * Adds the event to the session and updates the session time
 */
Session.prototype.addEvent = function (event) {
	var self = this;
	self.events.push(event);
	self.updateSessionTime(event.duration);
};

Session.prototype.toString = function (beforeNoon) {
	var self = this;
	var sessionString = "";
	self.events.forEach(function (event) {
		sessionString += event.startTime.toString(beforeNoon) + " " + event.title + " " + 
							(event.duration ? (event.duration + "min") : "") + "\n";
	});
	return sessionString;
};

module.exports = Session;