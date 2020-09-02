var ros = new ROSLIB.Ros();

// If there is an error on the backend, an 'error' emit will be emitted.
ros.on('error', function(error) {
console.log(error);
});

// Find out exactly when we made a connection.
ros.on('connection', function() {
console.log('Connection made!');
});

ros.on('close', function() {
console.log('Connection closed.');
});

// Create a connection to the rosbridge WebSocket server.
ros.connect('ws://localhost:9090');

// Publishing a Topic
// ------------------

var ac_data_subscriber = new ROSLIB.Topic({
ros : ros,
name : '/ac_msg',
messageType : 'cranberry_topic/AcData'
});

// Then we add a callback to be called every time a message is published on this topic.
ac_data_subscriber.subscribe(function(message) {
  console.log('Received message on ' + ac_data_subscriber.name + ': ' + message.temp + '  |  '+ message.humid);
  document.getElementById("temp").innerHTML = message.temp.toFixed(1) + "°C";
  document.getElementById("humid").innerHTML = message.humid.toFixed(1) + "%";
// If desired, we can unsubscribe from the topic as well.

// $('#lamp').hover(function(){
//  $(this).css("color","red")
//})
});