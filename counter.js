const EventEmitter = require('events');
const {ChannelInfo,queueStats} = require('./classes');

const myEmitter = new EventEmitter();
let queue = [];
let completed = [];
let points = 10000;
myEmitter.on('schedule', (event) => {
  queue.push(event);
  myEmitter.emit('request');
});


myEmitter.on('request', () => {
  if (points>=queue[0].getPoints()){
    let event = queue.shift();
    points = points - event.getPoints();
    completed.push(event);
    for (let sideEffect of event.getSideEffects()) {
      myEmitter.emit('schedule',sideEffect);
    }
  }else {
    console.log("scheduled");
    console.log(queue.length);
    console.log(queueStats(queue));
    console.log("completed");
    console.log(completed.length);
    console.log(queueStats(completed));
    console.log("points");
    console.log(points);
    process.exit(0);
  }

});


for (var i = 0; i < 1000; i++) {
  myEmitter.emit('schedule',new ChannelInfo());
}
