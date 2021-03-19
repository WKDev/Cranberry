var required_auth;

window.onload = function () {
    // 정보 서버에 전달
    $('#submit_reg').click(function(){
        var visit_purpose = $('#visit-purpose').val();
        var phone_number = $('#phone-number').val();
        var prcsed = phone_number.replace('\-/g','');
        
        var personal_data = {
            'mode':'refer',
            'visit_purpose':visit_purpose,
            'phone_number':prcsed
        }
        
    $.ajax({
        type:'POST',
        url: 'refer',
        data: JSON.stringify(personal_data),
        dataType:'JSON',
        contentType:"application/json",
        success: function(data){
            if(data.result2['code'] == 'invalid_number'){
                alert("유효하지 않은 번호입니다. 다시 입력해주세요")
            }
            else if(data.result2['code'] == 'unauthorized'){
                alert("사전 출입 승인이 되지 않은 번호입니다. 관리자에게 연락 바랍니다.")
            }
            else{
                console.log('성공! 데이터 값:' + data.result2['code']+" ");
                required_auth = data.result2['code'];
                $('#submit_reg').fadeOut(500);
                $('#info_group').fadeOut(500);
                $('#auth_group').fadeIn(500);
            }

        },
            error: function(request, status, error){                        
            alert('내부 서버 오류 발생')
//            alert(error);
        }});
        
    });  
    
//    인증번호 조회 단계
     $('#check_in').click(function(){
        var auth_code = $('#auth_code').val();
         
        if(required_auth == auth_code){
            console.log("클라이언트단 인증 성공")
            

            $.ajax({
                type:'POST',
                url: 'auth',
                data: {'mode':'auth','auth_code':auth_code},
                dataType:'JSON',
                contentType:"application/json",
                success: function(data){
                    console.log('서버 인증 성공!');
                    auth_code = data.result2['code'];
                },
                    error: function(request, status, error){                        
                console.log('내부 서버 오류 발생')
        //            alert(error);
            });
      
        }
        else{
            alert("잘못된 인증번호입니다.")
        }
    });  
    
}
   