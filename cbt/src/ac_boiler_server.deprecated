#include "ros/ros.h" // ROS 기본 헤더파일
#include "cranberry_topic/CommBoiler.h" // MsgTutorial 메시지 파일 헤더 (빌드 후 자동 생성됨)
#include<cstdlib>
// 메시지 콜백 함수로써, 밑에서 설정한 ros_tutorial_msg라는 이름의 토픽
// 메시지를 수신하였을 때 동작하는 함수이다
// 입력 메시지로는 ros_tutorials_topic 패키지의 MsgTutorial 메시지를 받도록 되어있다

int main(int argc, char **argv) // 노드 메인 함수
{
	ros::init(argc,argv,"boiler_client"); // node name
	ros::NodeHandle nh;

	ros::ServiceClient srvClient = 
	nh.serviceClient<cranberry_topic::CommBoiler>("comm_boiler"); // service name
	
	cranberry_topic::CommBoiler srv;

	srv.request.Request = atoll(argv[1]);

	if(srvClient.call(srv)){
		ROS_INFO("req %ld accepted.",(long int)srv.request.Request);
		ROS_INFO("response: %ld",(long int)srv.response.Response);
	}
	else{
		ROS_ERROR("Failed to call service comm_boiler");
		return 1;
	}

	return 0;   
}
