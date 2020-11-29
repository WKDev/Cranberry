// var ros = new ROSLIB.Ros();

// // If there is an error on the backend, an 'error' emit will be emitted.
// ros.on('error', function(error) {
// console.log(error);
// });

// // Find out exactly when we made a connection.
// ros.on('connection', function() {
// console.log('Connection made!');
// });

// ros.on('close', function() {
// console.log('Connection closed.');
// });

// // Create a connection to the rosbridge WebSocket server.
// ros.connect('ws://localhost:9090');

// // Publishing a Topic
// // ------------------

// var ac_data_subscriber = new ROSLIB.Topic({
// ros : ros,
// name : '/ac_msg',
// messageType : 'cranberry_topic/AcData'
// });

// // Then we add a callback to be called every time a message is published on this topic.
// ac_data_subscriber.subscribe(function(message) {
//   console.log('Received message on ' + ac_data_subscriber.name + ': ' + message.temp + '  |  '+ message.humid);
//   document.getElementById("temp").innerHTML = message.temp.toFixed(1) + "°C";
//   document.getElementById("humid").innerHTML = message.humid.toFixed(1) + "%";
// // If desired, we can unsubscribe from the topic as well.

// // $('#lamp').hover(function(){
// //  $(this).css("color","red")
// //})
// });

var ros = new ROSLIB.Ros();

// Create a connection to the rosbridge WebSocket server.
ros.connect('ws://192.168.0.16:9090');


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

// import light_data when window is loaded.
var iLightClient = new ROSLIB.Service({
  ros : ros,
  name : '/ilight_srv',
  serviceType : 'light_service/LightState'
});

var request = new ROSLIB.ServiceRequest({
  target : 0,
  state : 0});

var var_state_light = 0;

function init_light(result,light_id, target_num){
  if(result.response[target_num-1] == 1){
    document.getElementById(light_id).style.backgroundColor= "#FFE600";
    document.getElementById(light_id).style["boxShadow"]= "0 0 12px 4px rgba(187, 137, 0, 0.5)";
    // document.getElementById(light_id).style.width= "25px";
    // document.getElementById(light_id).style.hight= "25px";
  }
  else if(result.response[target_num-1] == 0){
    document.getElementById(light_id).style.backgroundColor= "#505050";
    document.getElementById(light_id).style["boxShadow"]= "0 0 6px 3px rgba(0, 0, 0, 0.5)";
    // document.getElementById(light_id).style.width= "20px";
    // document.getElementById(light_id).style.hight= "20px";  
  }
}

window.onload = function(){
  iLightClient.callService(request, function(result) {
    console.log('init_data ' + iLightClient.name + ': ' + result.response);
    init_light(result,"lvlight",1);
    init_light(result,"klight",2);
    init_light(result,"prlight",3);
    init_light(result,"brlight",4);
  });

  var lv = document.getElementById("lvlight");
  var kl = document.getElementById("klight");
  var pr = document.getElementById("prlight");
  var br = document.getElementById("brlight");

  lv.onclick = function(){
    update_light_data("lvlight",1);
  }
  
  kl.onclick = function(){
    update_light_data("klight",2);
  }
  
  pr.onclick = function(){
    update_light_data("prlight",3);
  }

  br.onclick = function(){
    update_light_data("brlight",4);
  }
};

 function update_light_data(light_id, target_num){
    if(document.getElementById(light_id).innerHTML == 0){
      var_state_light = 1;
      document.getElementById(light_id).innerHTML = 1;
    }
    else if(document.getElementById(light_id).innerHTML == 1){
      var_state_light = 0;
      document.getElementById(light_id).innerHTML = 0;
    }
    console.log('state is set to :' + var_state_light);
    

    var light_on = new ROSLIB.ServiceRequest({
      target : target_num,
      state : var_state_light
    });

    iLightClient.callService(light_on, function(result){
      iLightClient.callService(request, function(result) { // parsed updated light_data
        console.log('Result for service call on ' + iLightClient.name + ': ' + result.response);
        if(result.response[target_num-1] == 1){
          document.getElementById(light_id).style.backgroundColor= "#FFE600";
          document.getElementById(light_id).style["boxShadow"]= "0 0 12px 4px rgba(187, 137, 0, 0.5)";
          // document.getElementById(light_id).style.width= "25px";
          // document.getElementById(light_id).style.hight= "25px";
        }
        else if(result.response[target_num-1] == 0){
          document.getElementById(light_id).style.backgroundColor= "#505050";
          document.getElementById(light_id).style["boxShadow"]= "0 0 6px 3px rgba(0, 0, 0, 0.5)";
          // document.getElementById(light_id).style.width= "20px";
          // document.getElementById(light_id).style.hight= "20px";  
        }
      });
    }); // set light
    
}

var AcDataSubscriber = new ROSLIB.Topic({
ros : ros,
name : '/ac_msg',
messageType : 'cranberry_topic/AcData'
});

// Then we add a callback to be called every time a message is published on this topic.
AcDataSubscriber.subscribe(function(message) {
  // console.log('Received message on ' + AcDataSubscriber.name + ': ' + message.temp + '  |  '+ message.humid);
  document.getElementById("temp").innerHTML = message.temp.toFixed(1) + "°C";
  document.getElementById("humid").innerHTML = message.humid.toFixed(1) + "%";
})