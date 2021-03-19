import React, { Component, useState } from 'react';
import { Button, Input, Alert, Collapse } from 'reactstrap'
import './LoginForm.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// 210311 일단 기본 틀은 잡음
// 210312 해야할 일 : 가운데 정렬 + Collapse 적용
// 210313 한 일 : alert-input 연동 + alert에 collapse 적용했으나 미완, LoginForm 함수형으로 변경
// 210314 할 일 : alert에 collapse 적용했으나 미완, 로그인 조건문, 로그인 세션(관련 문서 찾아서 그냥 넣읍시다.)

// Immutable.js : 복잡한 setState 쓰고 하는 불편함을 해소해줌
// redux, ContextAPI : 깊은 단위의 자식 컴포넌트가 Root 통해서 번거롭게 통신하ㅣ는 걸 막아줌 // 이 단위 프로젝트에서는 필요 없을 것으로 보임.
// 1. redux가 뭐하는 놈인지, 로그인 구현, db 연동
// 2. roslibjs 통합
// 3. 페이지 관리
// 4. 카드 컴포넌트 생성
// 5. 메인페이지
// css 꾸미는 건 나중에 하고 일단 기능 구현만 바짝 하자

const LoginForm = () =>{ // oncreate : 버튼 클릭될때 실행될 함수
  // onChange 내용 변경시 실행되는 함수
  // onKeyPress 키 입력시 사용되는 함수, 나중에 enter 눌렸을 시 oncreate 한 것과 동일한 작업을 위해 사용함.
    
  const [isOpen, setIsOpen] = useState(false); // 배열로 선언된 첫번째 인자는 state, 두번째는 그를 조작하는 함수
  const [input_phone, setInputPhone] = useState('');
  const [visit_purpose, setVisitPurpose] = useState('');
  const [alert_content, setAlertContent] = useState('');

  const toggle = () => setIsOpen(!isOpen);

  const handleChange = e => {
      setInputPhone(e.target.phone)
    
    console.log("data received" + '')
    if(true){
      setIsOpen(true);
      setAlertContent('Alert');
    }

    }

  const handleSelect = e =>{
    setVisitPurpose(e.target.visit_purpose)
  }




    return (
      <div className="form-signin">
        {/* 전화번호, 방문목적 input  */}
        <Collapse isOpen={true}>
        <Input type = "text" value={input_phone} onChange={handleChange} placeholder="PhoneNumber" required/>
        <Input type="select"  value={visit_purpose} onChange={handleSelect} name="visit_purpose"id="visit_purpose" className="form-select " placeholder="Visit Purpose" style={{ marginTop: 10 + 'px' }} >
          <option value='' >방문목적을 선택해주세요</option>
          <option value='elec'>전기 검침</option>
          <option value='tap'>수도 검침</option>
          <option value='inout'>단순출입</option>
          <option value='delivery'>택배</option>
        </Input>
        <Collapse isOpen={isOpen}>
          <Alert color="danger">{alert_content}</Alert>
        </Collapse>

        <Button color="info" className="create-button" onClick={toggle}>추가</Button>
        </Collapse>
        {/* 인증번호 input */}
        <Collapse isOpen={false}>
          <Input name="auth_code" type = "number" value={input_phone} onChange={handleChange} placeholder="PhoneNumber" required/>
          <Button color="info" className="create-button" onClick={toggle}>완료</Button>
        </Collapse>
      </div>
    );
  }



export default LoginForm;

