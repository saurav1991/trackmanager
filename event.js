'use strict';
var Time = require('./time');

var Event = function (title, duration) {
	this.title = title;
	this.duration = duration;
	this.startTime = new Time();
};

module.exports = Event;