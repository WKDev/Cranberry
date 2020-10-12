#include <ESP8266WiFi.h>
#include <ros.h>
#include <cranberry_topic/CommLight.h>

#define LIGHT_CODE 1 // LIGHT_CODE는 임의 지정
#define DHT_PIN D2
#define IR_PIN D3
#define RELAY1_PIN D4
#define RELAY2_PIN D5
#define MOTION_PIN D6

////////////WIFI/////////////////
const char* ssid     = "SSID";
const char* password = "Password";
IPAddress server(192, 168, 0, 122); //ROS가 실제로 작동하는 PC의 외부 ip주소
const uint16_t serverPort = 11411; // ROS와 연결되는 포트 주소. 


//////////////ROS////////////////
ros::NodeHandle nh;
using cranberry_topic::CommLight;

// /comm_light 서버 콜백함수
void callback(const cranberry_topic::CommLight::Request &req, cranberry_topic::CommLight::Response &res){ 
  if(req.target == LIGHT_CODE){
    Serial.print("req is ");
	Serial.println(req.target);
	relayState = (long int)req.state;
    digitalWrite(RELAY1_PIN, relayState);
    res.result = relayState;
	
	Serial.print("Req:");
    Serial.print(req.Request);
    Serial.print("Res:");
    Serial.println(relayState);
	}
}

ros::ServiceServer<cranberry_topic::CommLight::target, cranberry_topic::CommLight::state> commLightServer("comm_light", &callback);

void setup()
{
  //pinmode 설정
  pinMode(RELAY1_PIN, OUTPUT);

  // 시리얼 모니터 셋업
  Serial.begin(115200);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  // wifi AP와 NodeMCU 연결
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // rosserial 소켓 서버와 연결 시도
  nh.getHardware()->setConnection(server, serverPort);
  nh.initNode();

  // ip 얻어서 출력
  Serial.print("IP = ");
  Serial.println(nh.getHardware()->getLocalIP());

  nh.advertiseService(commLightServer);
}

void loop()
{
  if (nh.connected()) {
    Serial.print("Connected.");

  } else {
    Serial.println("Not Connected");
  }
  nh.spinOnce();
  delay(10); //100Hz 주기
}
