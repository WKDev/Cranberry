#include "ros/ros.h" // ROS 기본 헤더파일
#include "cbt/AcData.h"// MsgTutorial 메시지 파일 헤더(빌드 후 자동 생성됨)
#include "cstdlib"
int main(int argc, char **argv) // 노드 메인 함수
{
ros::init(argc, argv, "ac_pub"); // 노드명 초기화
ros::NodeHandle nh; 

// 퍼블리셔 선언, ros_tutorials_topic 패키지의 MsgTutorial 메시지 파일을 이용한
// 퍼블리셔 ros_tutorial_pub 를 작성한다. 토픽명은 "ros_tutorial_msg" 이며,
// 퍼블리셔 큐(queue) 사이즈를 100개로 설정한다는 것이다
ros::Publisher ac_temp_pub = nh.advertise<cbt::AcData>("ac_msg", 0.1);
// 루프 주기를 설정한다. "10" 이라는 것은 10Hz를 말하는 것으로 0.1초 간격으로 반복된다
ros::Rate loop_rate(2);
// MsgTutorial 메시지 파일 형식으로 msg 라는 메시지를 선언
cbt::AcData ad;
// 메시지에 사용될 변수 선언
ROS_INFO("ac_data_publisher is publishing ac_data...\n Ctrl+C to terminate."); // stamp.sec 메시지를 표시한다

while (ros::ok())
{
ad.temp = 25.0 + rand()%3*0.8; // 현재 시간을 msg의 하위 stamp 메시지에 담는다
ad.humid = 50.0 + rand()%15*0.8; // count라는 변수 값을 msg의 하위 data 메시지에 담는다
// ROS_INFO("send temp = %f", ad.temp); // stamp.sec 메시지를 표시한다
// ROS_INFO("send humid = %f", ad.humid); // stamp.nsec 메시지를 표시한다
ac_temp_pub.publish(ad); // 메시지를 발행한다
loop_rate.sleep(); // 위에서 정한 루프 주기에 따라 슬립에 들어간다
}
return 0;
}