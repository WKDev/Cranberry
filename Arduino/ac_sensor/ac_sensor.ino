/*
   rosserial Publisher Example
   Prints "hello world!"
   This intend to connect to a Wifi Access Point
   and a rosserial socket server.
   You can launch the rosserial socket server with
   roslaunch rosserial_server socket.launch
   The default port is 11411

*/
// DHT Section
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#define DHTTYPE    DHT22     // DHT 22 (AM2302)
#define DHTPIN D2
#define RELAY_PIN D7
DHT_Unified dht(DHTPIN, DHTTYPE);

float temp;
float humid;

#include <ESP8266WiFi.h>
#include <ros.h>
#include <cranberry_topic/AcData.h> //arduino dosen'tsupport float64
#include <cranberry_topic/CommBoiler.h> //arduino dosen'tsupport float64


unsigned int long startTime=0;
long int relayState = 0;
unsigned int long elaspedSec=0;

unsigned int long protectTimeCode = 0;
int protector = 0;
bool initProtect = true;

////////////WIFI/////////////////
const char* ssid     = "IoT_System";
const char* password = "nodemcu01";
IPAddress server(192, 168, 0, 19); //input physical ip of which ros is running
const uint16_t serverPort = 11411;


//////////////ROS////////////////
ros::NodeHandle nh;
using cranberry_topic::CommBoiler;
void callback(const cranberry_topic::CommBoiler::Request &req, cranberry_topic::CommBoiler::Response &res){
  
  if(req.Request == 0){
    Serial.println("req is 0");
    relayState = (long int)req.Request;
    digitalWrite(RELAY_PIN, LOW);
    res.Response = (int)relayState;}

  if(req.Request == 1){
    startTime = millis();
    Serial.println("req is 1");
    relayState = (long int)req.Request;
    digitalWrite(RELAY_PIN, HIGH);
    res.Response = (int)relayState;}
  
  
  
  if(req.Request > 1){
    startTime = millis();
    Serial.println("req is more than 1");
    relayState = (long int)req.Request;
    digitalWrite(RELAY_PIN, HIGH);
    res.Response = relayState;}
  

  Serial.print("Req:");
  Serial.print(req.Request);
  Serial.print("Res:");
  Serial.println(relayState);

  
}

cranberry_topic::AcData ac_sensor_msg;
ros::Publisher pub_ac("ac_msg", &ac_sensor_msg);
ros::ServiceServer<cranberry_topic::CommBoiler::Request, cranberry_topic::CommBoiler::Response> srvServer("comm_boiler", &callback);

void setup()
{
  pinMode(2, OUTPUT);
  pinMode(16, OUTPUT);
  digitalWrite(2, HIGH);
  digitalWrite(16, HIGH);
  pinMode(RELAY_PIN, OUTPUT);
  ///////////DHT Section START///////////////
  dht.begin();
  sensor_t sensor;
  //import sensor_data
  //  dht.temperature().getSensor(&sensor);
  //  // Print humidity sensor details.
  //  dht.humidity().getSensor(&sensor);
  ///////////DHT Section END///////////////

  // Use ESP8266 serial to monitor the process
  Serial.begin(9600);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  // Connect the ESP8266 the the wifi AP
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // Set the connection to rosserial socket server
  nh.getHardware()->setConnection(server, serverPort);
  nh.initNode();

  // Another way to get IP
  Serial.print("IP = ");
  Serial.println(nh.getHardware()->getLocalIP());

  // Start to be polite
  nh.advertise(pub_ac);
  nh.advertiseService(srvServer);
}

void loop()
{
//  digitalWrite(D0, HIGH);
//  digitalWrite(D3, HIGH);
//
//  digitalWrite(LED_BUILTIN, HIGH);

  // A section counts time and turn off 
  
  elaspedSec = (millis() - startTime)/1000;

  if((relayState >=1)&& protector == 0){
//      if(blinkParameter == 0){
//        digitalWrite(D2, HIGH);
//        blinkParameter = 1;
//      }
//      else{
//        digitalWrite(D2, LOW);
//        blinkParameter = 0;
//      }
      
    //Serial.println((millis() - startTime));
    if(elaspedSec > 3600*relayState){
      Serial.println("time over. stop control");
      relayState = 0;
      digitalWrite(RELAY_PIN, LOW);
      Serial.println("relayState = " + relayState);
    }	
    else{
      Serial.print("Boiler Working... | ");
      Serial.print(elaspedSec); //subtraction has to reach 3600 *1000
      //(millis() - startTime)/60000 means elasped time since the command delivered(scale : min)
      Serial.print("/");
      Serial.print(3600*relayState);
      Serial.println("sec has done.");
    }
    
  }
  
  /////////////////// DHT Section START ////////////////
  delay(2000); //DHT MINIMUM_DELAY
  sensors_event_t event; //get TEMP Event
  dht.temperature().getEvent(&event);
    if (isnan(event.temperature)) {
      Serial.println(F("Error reading temperature!"));
    }
    else {   
      temp = event.temperature;
    }
  
    dht.humidity().getEvent(&event); // Get HUMID Event
    if (isnan(event.relative_humidity)) {
      Serial.println(F("Error reading humidity!"));
    }
    else {
      humid = event.relative_humidity;
    }
  ///////////DHT Section END///////////////

  if (nh.connected()) {
//    Serial.print("Connected : sending :"); Serial.println(temp);
    // Say hello
    ac_sensor_msg.temp = temp; // remove numbers below decimal point 2
    ac_sensor_msg.humid = humid;
    pub_ac.publish( &ac_sensor_msg );
  } else {
    Serial.println("Not Connected");
  }
  nh.spinOnce();
  // Loop exproximativly at 1Hz

  if(temp > 30.0){
    protector = 1;
    Serial.println("too high temp. protects overheat. timecode : " + protectTimeCode);
    delay(500);
    
    if(initProtect){ // to stop too much repeatition of relay);
      protectTimeCode = millis();
      digitalWrite(RELAY_PIN, LOW);
      delay(500);
      digitalWrite(RELAY_PIN, HIGH);
      delay(500);
      digitalWrite(RELAY_PIN, LOW);
      delay(500);
      digitalWrite(RELAY_PIN, HIGH);
      delay(500);
      digitalWrite(RELAY_PIN, LOW);
      delay(500);
      digitalWrite(RELAY_PIN, HIGH);
      delay(500);
      digitalWrite(RELAY_PIN, LOW);
      delay(500);   
      initProtect = false; 
      }
    else{
          digitalWrite(RELAY_PIN, LOW);
          Serial.println("High Temp Protecting...");
      }
      Serial.print((millis() - protectTimeCode)/1000);
      Serial.println("sec since protection starts");
    }
  else if(((millis() - protectTimeCode)/1000 > 10) && (temp < 30.0) && (protectTimeCode != 0)){
      Serial.println("protection finished. follows previous command.");
      protectTimeCode = 0;
      initProtect = true;
      protector = 0;
      if(relayState >=1){
        digitalWrite(RELAY_PIN, HIGH);
      }
    }
}
