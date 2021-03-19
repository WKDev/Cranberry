import React, { Component } from 'react';
import { Button, button, Input, input ,Collapse } from 'reactstrap'
import './LoginForm.css'

const LoginForm =({value, phone, purpose, onChange, onCreate, onKeyPress})=>{
  // oncreate : 버튼 클릭될때 실행될 함수
  // onChange 내용 변경시 실행되는 함수
  // onKeyPress 키 입력시 사용되는 함수, 나중에 enter 눌렸을 시 oncreate 한 것과 동일한 작업을 위해 사용함.
  return(
    <div className="form">
      <input value ={value} onChange = {onChange} onKeyPress={onKeyPress} />
      <div className="create-button" onClick={onCreate}>추가</div>
    </div>
  )
}

export default LoginForm;