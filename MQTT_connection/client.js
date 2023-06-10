// client.js

const mqtt = require('mqtt');
const client  = mqtt.connect('mqtt://20.24.98.15:1883');

client.on('connect', function () {
  console.log('Connected to MQTT broker');
  // client.subscribe('restroom/current');
});

// client.on('message', function (topic, message) {
//   console.log('Received message:', message.toString());
//  });

client.on('error', function (error) {
  console.error('Error:', error);
});


const msg = {
    toilet_id:3,
    avail_num:2,
    people_num:5,
    cub_status:[[3,true],[5,true],[1,false]] // report times, if available
}

// Publish a message every 5 seconds
setInterval(function () {
  client.publish('restroom/current', JSON.stringify(msg));
}, 5000);

