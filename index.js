'use strict';
var fs = require('fs');
var Event = require('./event');
var Track = require('./track');
var timePerTrack = 420;

var eventData = fs.readFileSync(process.argv[2]).toString().split('\n');

/**
 * Extract the event title and duration from data read from file
 * and create an aray of event objects
 */
var events = eventData.map(function createEvent(eventStr) {
	eventStr = eventStr.split(' ');
	var duration = eventStr.pop();
	duration = duration === 'lightning'
						? 5
						: Number(duration.substring(0, duration.indexOf('min')));
	var title = eventStr.join(' ');
	return new Event(title, duration);
});

//Sort the array of event objects in descending order of event durations
events = events.sort(function (x, y) {
	return y.duration - x.duration;
});

//Calculate the total time for all events
var totalEventsTime = events.reduce(function (totalTime, event) {
	return totalTime + event.duration;
}, 0);

//This represents the minimum no. of tracks required for the optimal case for accomodating all events
var minTracksRequired = Math.ceil(totalEventsTime / timePerTrack);

var tracks = [];
var i;
for (i = 0; i < minTracksRequired; i++) {
	tracks.push(new Track(i + 1));
}

events.forEach(function (event) {

	//Filter tracks to get track which can accomodate the event either in pre lunch or post lunch
	var availableTracks = tracks.filter(function (track) {
		return (track.preLunchSession.timeRemaining >= event.duration || track.postLunchSession.timeRemaining >= event.duration);
	});
	
	//Select the track which is the most populated based on the number of events in the track
	var selectedTrack = availableTracks.sort(function (trackA, trackB) {
		return (trackB.preLunchSession.events.length + trackB.postLunchSession.events.length) - 
				(trackA.preLunchSession.events.length + trackA.postLunchSession.events.length);
	}).shift();

	//Determine session (preLunch / postLunch) in which event can be added to
	var isPreLunch = selectedTrack.preLunchSession.timeRemaining >= event.duration
								? true
								: false;

	selectedTrack.addEvent(event, isPreLunch);
});

//Add the terminal networking event for each track
tracks.forEach(function (track) {
	track.addNetworkingEvent();
});

tracks.forEach(function (track) {
	console.log(track.toString());
});