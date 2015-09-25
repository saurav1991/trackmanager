# trackmanager

The application reads a file with event data in the format

<Event title> <Event duration in min>

and generates a schedule with multiple tracks containing events as per the constrainsts described in the problem.

The algorithm used creates the schedule by calculating the optimal number of tracks required. It then populates events in the track by sorting them in descending order by duration and adds them to the most populated track in which it can fit.

The number of events in the track decides its population.

#Usage

```sh
node index.js <filename>
```
The file data.txt contains the sample list of events.

#Sample Input

Writing Fast Tests Against Enterprise Rails 60min

Overdoing it in Python 45min

Lua for the Masses 30min

Ruby Errors from Mismatched Gem Versions 45min

Common Ruby Errors 45min

Rails for Python Developers lightning

Communicating Over Distance 60min

Accounting-Driven Development 45min

Woah 30min

Sit Down and Write 30min

Pair Programming vs Noise 45min
Rails Magic 60min

Ruby on Rails: Why We Should Move On 60min

Clojure Ate Scala (on my project) 45min

Programming in the Boondocks of Seattle 30min

Ruby vs. Clojure for Back-End Development 30min

Ruby on Rails Legacy App Maintenance 60min

A World Without HackerNews 30min

User Interface CSS in Rails Apps 30min

#Sample Output
```sh
Track 1
09:00AM Writing Fast Tests Against Enterprise Rails 60min
10:00AM Ruby on Rails Legacy App Maintenance 60min
11:00AM Ruby on Rails: Why We Should Move On 60min
12:00PM Lunch
01:00PM Communicating Over Distance 60min
02:00PM Rails Magic 60min
03:00PM Ruby Errors from Mismatched Gem Versions 45min
03:45PM Pair Programming vs Noise 45min
04:30PM Lua for the Masses 30min
05:00PM Networking Event 

Track 2
09:00AM Accounting-Driven Development 45min
09:45AM Common Ruby Errors 45min
10:30AM Clojure Ate Scala (on my project) 45min
11:15AM Overdoing it in Python 45min
12:00PM Lunch
01:00PM Woah 30min
01:30PM A World Without HackerNews 30min
02:00PM Programming in the Boondocks of Seattle 30min
02:30PM Ruby vs. Clojure for Back-End Development 30min
03:00PM User Interface CSS in Rails Apps 30min
03:30PM Sit Down and Write 30min
04:00PM Rails for Python Developers 5min
04:05PM Networking Event 
```
