// 체크 값이 활성화 되어 있으면 우측에 체크 마크를 보여주고, 마우스가 위에 있을 때는 좌측에 엑스 마크를 보여줌

import React, {Component} from 'react';
import './TodoItem.css';

class TodoItem extends Component{
    shouldComponentUpdate(nextProps, nextState){
        // 원래 하나의 todoItem 컴포넌트만 업데이트하면 될 걸 모든 컴포넌트를 리렌더링함.
        // 이를 막기 위해 또 조건 추가해줌.
        return this.props.checked !== nextProps.checked;
    }
    render(){
        // 5개의 props를 전달받음
        const {text, checked, id, onToggle, onRemove} = this.props;

        return(
            <div className="todo-item" onClick={()=>onToggle(id)}>
                {/* stop propagation을 안하면 onRemove-->onToggle 진행됨. */}
                {/* stop propagation :: 이벤트의 확산을 멈춰줌.  */}
                {/* onToggle과 onRemove 는 id 를 파라미터로 넣으면 해당 id 를 가진
                 데이터를 업데이트합니다. 파라미터를 넣어줘야 하기 때문에, 이 과정에서
                  우리는 onClick={() => onToggle(id)} 와 같은 형식으로 작성을 했는데요,
                  ick={onToggle{id}} 와 같은 형식으로 하고 싶다면.. 
                  절대 안됩니다!! 리액트가 초심자가 한번 쯤 할 수 있는 실수입니다.
                   이렇게 하면 해당 함수가 렌더링 될 때 호출이 됩니다. 
                   해당 함수가 호출되면 데이터가 변경 될 것이고,
                    데이터가 변경되면 또 리렌더링이 되겠죠? 그러면 또 이 함수가 호출되고..
                     무한 반복입니다. */}
                <div className="remove" onClick={(e)=>{e.stopPropagation();onRemove(id)}}>&times;</div>
                {/* 이렇게 함으로서 css 클래스를 유동적으로 설정할 수 있다. 이를 템플릿 리터럴이라 한다. */}
                <div className="{'todo-text ${checked ? 'checked' : ''}">
                    <div>{text}</div>
                </div>
                    { checked &&(<div className="check-mark">*</div>)}
            </div>                                                                                                                                                                                 
        )
    }
}

export default TodoItem;
