import React, {Component} from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return this.props.todos !==nextProps.todos;
        // 기본 값이 언제나 true로, 값 변동이 있을 때마다 리렌더링 됨,
        // 이를 막기 위해 todo 값이 바뀔 때만 true를 반환하도록 렌더링한다.
    }

    render(){
        const {todos, onToggle, onRemove} = this.props;
        // todos : 객체들이 들어있는 배열
        //onToggle: 체크박스를 키고 끄는 함수
        // onRemove : 아이템을 삭제시키는 함수

        const numbers =[1,2,3,4,5];
        const squared = numbers.map(number=>number*number); // map : 배열 안에 원소를 모두 제곱한다.
        console.log(numbers);

        const todoList = todos.map(
            ({id, text, checked})=>(
                <TodoItem
                id={id}
                text={text}
                checked={checked}
                onToggle={onToggle}
                onRemove={onRemove}
                key={id}
                />
            )
        )
        return(
            <div>
                {/* 배열 설정해둔거 추가하기 */}
                {todoList}  
            </div>
        );
    }
}

export default TodoItemList;