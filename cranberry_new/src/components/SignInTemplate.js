import React, { Component } from 'react';
import './SignInTemplate.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginForm from './LoginForm';
import {database} from '../firebase';
import logo_a from './assets/cranberry-logo.png';


class SignInTemplate extends Component {
    // 파라미터로 (props)={} 해야 하는데, form, children 형태로 작성.(비구조화 할당)
    // 이 컴포넌트는 두 가지의 props를 받음
    // children은 컴포넌트 사용 시 태그 사이에 들어감
    //  form은 인풋과 버튼이 있는 컴포넌트 렌더링 시 사용


    render() {
        const { children } = this.props;

        return (
            <main className="form-signin">
                <section className="form-wrapper">
                    <img className="mb-4" src={logo_a} alt="logo" width="72" height="72" />
                    <div className="title">Cranberry</div>
                    <LoginForm />
                </section>
            </main>

        )
    }
}


export default SignInTemplate;