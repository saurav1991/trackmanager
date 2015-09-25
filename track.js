'use strict';

var Time = require('./time');
var Event = require('./event');
var Session = require('./session');

function Track(id) {
	this.id = "Track " + id;
	this.preLunchSession = new Session(true)
	this.postLunchSession = new Session();
};

/**
 * Adds an event to either the preLunch or postLunch session. Updates the event's start time accordingly
 * @param {Object}  event      [Event to add]
 * @param {Boolean} isPreLunch [Whether to add to preLunch or postLunch session]
 */
Track.prototype.addEvent = function (event, isPreLunch) {
	var self = this;
	if (isPreLunch) {
		event.startTime = new Time(self.preLunchSession.sessionTime.hr, self.preLunchSession.sessionTime.min);
		self.preLunchSession.addEvent(event);
	} else {
		event.startTime = new Time(self.postLunchSession.sessionTime.hr, self.postLunchSession.sessionTime.min);
		self.postLunchSession.addEvent(event);
	}
};

/**
 * Adds the terminal networking event after the last event.
 * If last event ended before 4:00 pm add it at 4 else add it after the last event ended
 */
Track.prototype.addNetworkingEvent = function () {
	var self = this;
	var networkingEvent = new Event("Networking Event");
	if (self.postLunchSession.sessionTime.hr < 4) {
		networkingEvent.startTime = new Time(4, 0);
	} else {
		networkingEvent.startTime = new Time(self.postLunchSession.sessionTime.hr, self.postLunchSession.sessionTime.min);
	}
	self.addEvent(networkingEvent, false);
};

Track.prototype.toString = function () {
	var self = this;
	var lunchEventString = "12:00PM Lunch\n";
	return self.id + "\n" + self.preLunchSession.toString(true) + lunchEventString + self.postLunchSession.toString();
};

module.exports = Track;