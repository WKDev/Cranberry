import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import MyName from './MyName';
import Counter from './Counter';

class App extends Component {
  render() {
    return (
      <div>
        <MyName name="리액트"/>
        <input type = 'text'></input>
        {/* const - 바뀌지 않을 값, let 바뀔 수 있는 값(var와 비슷하지만 scope가 다름) */}
        {/* 삼항연산자 나올 수 있음 === 조건 쓰고 ?true, : false */}
        {/* and연산자 --> () === () &&{} true일 때만 실행하고 싶은 경우 */}
        {/* style은 const로 미리 정의한 다음 정의한 변수 이름을 {}로 감싸서 호출 */}
        {/* {class 가 아니라 class name 써야 함} */}
        <Counter></Counter>

      </div>
    );
  }
}

export default App;
