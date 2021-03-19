var toastElList = [].slice.call(document.querySelectorAll('.toast'))
var toastList = toastElList.map(function (toastEl) {
  return new bootstrap.Toast(toastEl, option)
})

var ros = new ROSLIB.Ros();

//ros.connect('ws://0.0.0.0:9090');
ros.connect('ws://roswebsocket.iptime.org:9090');
// If there is an error on the backend, an 'error' emit will be emitted.
ros.on('error', function (error) {
  console.log(error);
        $('#error_toast').toast("show");

});

// Find out exactly when we made a connection.
ros.on('connection', function () {
  console.log('Connection made!');
    
    $('#connected_toast').toast("show");
    
    update_ac();
});

ros.on('close', function () {
  console.log('Connection closed.');
    $('#closed_toast').toast("show");

});

var iLightClient = new ROSLIB.Service({
  ros: ros,
  name: '/comm_light',
  serviceType: 'cbt/CommLight'
});


var iBoilerClient = new ROSLIB.Service({
  ros:ros,
  name:'/comm_boiler',
  serviceType: 'cbt/CommLight'
  });

var state = 0;
var boiler_state = 0;

window.onload = function () {
    // 기본 데이터 조회
//        $.ajax({
//                type:'POST',
//                url: 'refer/base_data',
//                data: JSON.stringify({'test':'test'}),
//                dataType:'JSON',
//                contentType:"application/json",
//                async:false,
//                success: function(data){
//                    console.log(' send_data_성공')
//                    console.log(data.result2['code'])
//                    
//                    var valid_timestamp = data.result2['code']
//                    console.log(valid_timestamp)
//                    var valid_time = new Date(valid_timestamp)
//                    console.log(valid_time.toString())
//                    
//
//                },
//                    error: function(request, status, error){                        
//                console.log(' send_Data_error')
//                    alert(error);
//            }
//            }
//           );
//    

    
  //import_state();
  update_ac();
  import_boiler_state();
  
  //control_boiler
  $("switch1").onclick = function(){
  if(document.getElementById("switch1").checked){
    console.log("on");
  update_boiler(1);
  }
  else{
      console.log("off");
  update_boiler(0);
  }
  }
  
  //control_light
  document.getElementById("light1").onclick = function () { update_light("light1"); }
  document.getElementById("light2").onclick = function () { update_light("light2"); }
  //document.getElementById("light_03").onclick = function () { update_light("light_03"); }
  //document.getElementById("light_04").onclick = function () { update_light("light_04"); }
  


}

function import_boiler_state(){
	var import_boiler = new ROSLIB.ServiceRequest({
	    Request : 9999
 });
  
  iBoilerClient.callService(import_boiler, function (result){
  	  console.log(result.Response);
    if(result.Response == 1){
        document.getElementById("switch1").checked = true;
        console.log("boiler turned on before open the page.");
        }
    else{
	document.getElementById("switch1").checked = false;
	console.log("boiler turned off before open the page.");
    }
  });
}

function update_boiler(state){
  var toggle_boiler = new ROSLIB.ServiceRequest({
    Request : state
  });
  
  iBoilerClient.callService(toggle_boiler, function (result){
    console.log("turning on/off boiler");
  });
  

}
function update_ac(){
  var ac_data_subscriber = new ROSLIB.Topic({
    ros: ros,
    name: '/ac_msg',
    messageType: 'cbt/AcData'
  });

  // Then we add a callback to be called every time a message is published on this topic.
  ac_data_subscriber.subscribe(function (message) {
     console.log('Received message on ' + ac_data_subscriber.name + ': ' + message.temp + '  |  ' + message.humid);
    $("#temp_data").val(message.temp.toFixed(1) + "°C");
    $("#humid_data").val(message.humid.toFixed(1) + "%");
  });
}

function update_light(light_id) {
  // changes state of light data
  if (document.getElementById(light_id).innerHTML == 0) { state = 1; document.getElementById(light_id).innerHTML = 1; }
  else if (document.getElementById(light_id).innerHTML == 1) { state = 0; document.getElementById(light_id).innerHTML = 0; }

  //converts String data 'light_id' to numeric data.
  var light_num = Number(light_id.split('_')[1]);

  //creates Ros service request contains target and state.
  var toggle_light = new ROSLIB.ServiceRequest({
    target: light_num,
    state: state
  });
  //calls light service.
  iLightClient.callService(toggle_light, function (result) {
    console.log("result : " + toggle_light.target + ':' + result.result)
    //if the response of service is 1, update css style.
    if (result.result == 1) {
      document.getElementById(light_id).style.backgroundColor = "#FFE600";
      document.getElementById(light_id).style["boxShadow"] = "0 0 12px 4px rgba(187, 137, 0, 0.5)";
      // document.getElementById(light_id).style.width= "25px";
      // document.getElementById(light_id).style.hight= "25px";
    }
    else if (result.result == 0) {
      document.getElementById(light_id).style.backgroundColor = "#808080";
      document.getElementById(light_id).style["boxShadow"] = "0 0 6px 3px rgba(0, 0, 0, 0.5)";;

    }
    else {
      document.getElementById(light_id).style.backgroundColor = "#ff0000";
      document.getElementById(light_id).style["boxShadow"] = "0 0 6px 3px rgba(0, 0, 0, 0.5)";;
    }
  })

}