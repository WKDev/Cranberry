#include "ros/ros.h" // ROS 기본 헤더파일
#include "cranberry_topic/CommLight.h" // MsgTutorial 메시지 파일 헤더 (빌드 후 자동 생성됨)
#include<cstdlib>
// 메시지 콜백 함수로써, 밑에서 설정한 ros_tutorial_msg라는 이름의 토픽
// 메시지를 수신하였을 때 동작하는 함수이다
// 입력 메시지로는 ros_tutorials_topic 패키지의 MsgTutorial 메시지를 받도록 되어있다

int light[4] = {0,};
bool lightCallback(cranberry_topic::CommLight::Request &req, cranberry_topic::CommLight::Response &res){
    ROS_INFO("target : %d", req.target);
    ROS_INFO("state : %d", req.state);
    light[req.target -1] = req.state;
    res.result = light[req.target -1];
    return true;
}

int main(int argc, char **argv) // 노드 메인 함수
{
	ros::init(argc,argv,"comm_light"); // node name
	ros::NodeHandle nh;

    ros::ServiceServer service = nh.advertiseService("comm_light", lightCallback);
    ROS_INFO("Ready to Send Callback : CommLightServer.");

    ros::spin();

	return 0;   
}
