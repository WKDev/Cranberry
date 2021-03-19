import React, { Component } from 'react';

// class MyName extends Component {
//     // defaultProps는 파라미터를 안넣었을 때 정해주는 기본값
//     static defaultProps = {
//         name :'기본이름'
//     }
//   render() {
//     return (
//       <div>
//         안녕하세요! 제 이름은 <b>{this.props.name}</b> 입니다.
//         {/* props가 이 컴포넌트의 class 이름이 됨 */}
//       </div>
//     );
//   }
// }

// // 받아와서 보여주기만 하는 컴포넌트는 함수형으로 작성도 가능

const MyName = ({name})=>{
    return(
        <div>
            안녕하세요! 제 이름은 {name}입니다.
        </div>
    )
}

export default MyName;