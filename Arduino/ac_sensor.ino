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
DHT_Unified dht(DHTPIN, DHTTYPE);

float temp;
float humid;

#include <ESP8266WiFi.h>
#include <ros.h>
#include <cranberry_topic/AcData.h> //arduino dosen'tsupport float64

const char* ssid     = "IoT_System";
const char* password = "nodemcu01";
IPAddress server(192, 168, 0, 5); //input physical ip of which ros is running
const uint16_t serverPort = 11411;

ros::NodeHandle nh;
cranberry_topic::AcData ac_sensor_msg;
ros::Publisher pub_ac("ac_msg", &ac_sensor_msg);

// Be polite and say hello
char hello[13] = "hello world!";

void setup()
{
  ///////////DHT Section START///////////////
  dht.begin();
  sensor_t sensor;
  //import sensor_data
  //  dht.temperature().getSensor(&sensor);
  //  // Print humidity sensor details.
  //  dht.humidity().getSensor(&sensor);
  ///////////DHT Section END///////////////


  // Use ESP8266 serial to monitor the process
  Serial.begin(115200);
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
}

void loop()
{
  ///////////DHT Section START///////////////
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
    Serial.print("Connected : sending :"); Serial.println(temp);
    // Say hello
    ac_sensor_msg.temp = temp; // remove numbers below decimal point 2
    ac_sensor_msg.humid = humid;
    pub_ac.publish( &ac_sensor_msg );
  } else {
    Serial.println("Not Connected");
  }
  nh.spinOnce();
  // Loop exproximativly at 1Hz
}
