cmake_minimum_required(VERSION 2.8.3)
project(cranberry_topic)
## 캐킨 빌드를 할 때 요구되는 구성요소 패키지이다.
## 의존성 패키지로 message_generation, std_msgs, roscpp이며 이 패키지들이 존재하지 않으면 빌드 도중에 에러가 난다.
find_package(catkin REQUIRED COMPONENTS message_generation std_msgs rospy roscpp)

## 메시지 선언: MsgTutorial.msg
add_message_files(FILES AcData.msg)

add_service_files(FILES CommBoiler.srv CommLight.srv)
## 의존하는 메시지를 설정하는 옵션이다.
## std_msgs가 설치되어 있지 않다면 빌드 도중에 에러가 난다.
generate_messages(DEPENDENCIES std_msgs)
## 캐킨 패키지 옵션으로 라이브러리, 캐킨 빌드 의존성, 시스템 의존 패키지를 기술한다.
catkin_package(
LIBRARIES cranberry_topic
CATKIN_DEPENDS std_msgs roscpp rospy message_runtime
)

## 인클루드 디렉터리를 설정한다.
include_directories(${catkin_INCLUDE_DIRS})


## topic_publisher 노드에 대한 빌드 옵션이다.
## 실행 파일, 타깃 링크 라이브러리, 추가 의존성 등을 설정한다.
add_executable(ac_boiler_server src/ac_boiler_server.cpp)
add_dependencies(ac_boiler_server ${${PROJECT_NAME}_EXPORTED_TARGETS}
${catkin_EXPORTED_TARGETS})
target_link_libraries(ac_boiler_server ${catkin_LIBRARIES})

add_executable(ac_data_publisher src/ac_data_publisher.cpp)
add_dependencies(ac_data_publisher ${${PROJECT_NAME}_EXPORTED_TARGETS}
${catkin_EXPORTED_TARGETS})
target_link_libraries(ac_data_publisher ${catkin_LIBRARIES})

## topic_subscriber 노드에 대한 빌드 옵션이다.
add_executable(ac_data_subscriber src/ac_data_subscriber.cpp)
add_dependencies(ac_data_subscriber ${${PROJECT_NAME}_EXPORTED_TARGETS}
${catkin_EXPORTED_TARGETS})
target_link_libraries(ac_data_subscriber ${catkin_LIBRARIES})

## topic_subscriber 노드에 대한 빌드 옵션이다.
add_executable(comm_light_server src/comm_light_server.cpp)
add_dependencies(comm_light_server ${${PROJECT_NAME}_EXPORTED_TARGETS}
${catkin_EXPORTED_TARGETS})
target_link_libraries(comm_light_server ${catkin_LIBRARIES})

