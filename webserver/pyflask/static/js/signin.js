var phone_number;
var required_auth;

//https://ddulgi.tistory.com/24
window.onload = function () {
    

    
    var post_info = function(personal_data){
                $.ajax({
            type:'POST',
            url: 'refer',
            data: JSON.stringify(personal_data),
            dataType:'JSON',
            contentType:"application/json",
            async:false,
            success: function(data){
                if(data.result2['code'] == 'invalid_number'){
                    alert("유효하지 않은 번호입니다. 다시 입력해주세요")
                }
                else if(data.result2['code'] == 'unauthorized'){
                    alert("사전 출입 승인이 되지 않은 번호입니다. 관리자에게 연락 바랍니다.")
                }
                else if(data.result2['code'] == 'none_purpose'){
                    alert("방문 목적을 선택해 주시기 바랍니다.")
                }
                else if(data.result2['code'] == 'wrong_purpose'){
                    alert("사전 승인된 방문 목적과 다릅니다. 올바른 방문 목적을 선택해 주세요.")
                }                
                else{
                    console.log('성공! 데이터 값:' + data.result2['code']+" ");
                    required_auth = data.result2['code'];
                    $('#col_base').collapse('hide');
                    $('#col_code').collapse('show');
                }

            },
            error: function(request, status, error){                        
                alert('내부 서버 오류 발생')
                //            alert(error);
            }});
    };
    
//    var send_data = function(){
//                            $.ajax({
//                type:'GET',
//                url: 'session',
//                data: JSON.stringify({'phone_number':phone_number}),
//                dataType:'JSON',
//                contentType:"application/json",
//                async:false,
////                success: function(){
////                    console.log(' send_data_성공')
////
////                },
////                    error: function(request, status, error){                        
////                console.log(' send_Data_error')
////        //            alert(error);
////            }
//            }
//           );
//    };
    
    
    var post_auth = function(auth_code){
        
//        console.log(phone_number);
//                    $.ajax({
//                type:'POST',
//                url: 'auth',
//                data: JSON.stringify({'mode':'auth','auth_code':auth_code, 'phone_number':phone_number}),
//                dataType:'JSON',
//                contentType:"application/json",
//                async:false,
//            }
//           );
    };
    

    
    $('#col_base').collapse('show');
    // 정보 서버에 전달
    $('#submit_reg').click(function(){
        var visit_purpose = $('#visit_purpose').val();
        var phone_number = $('#phone_number').val();

        var personal_data = {
            'mode':'refer',
            'visit_purpose':visit_purpose,
            'phone_number':phone_number
        }
        
        post_info(personal_data);    
    });  
    
    $('#check_in').click(function(){
    var auth_code = $('#code_field').val();

    if(required_auth == auth_code){
        console.log("클라이언트단 인증 성공")
//        post_auth(auth_code);
    }
    else{
        console.log(auth_code)
        alert("잘못된 인증번호입니다.")
    }
}); 
    
    
    
    
}
