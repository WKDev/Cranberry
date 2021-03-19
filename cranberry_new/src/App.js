import './App.css';
import SignInTemplate from './components/SignInTemplate'

import { Component } from 'react';
// import TodoItemList from './components/TodoItemList';
import { Container } from 'reactstrap';
class App extends Component{
  // id =3;

  // state={
  //   input:'',
  //   input_check:'',
  //   value:''
  // };

  // form 기능 구현하는데 필요한 기능들 
  // 1. text 내용 바뀌면 state 업데이트
  // 2. 버튼이 클릭되면 새로운 todo 생성 후 todos 업데이트
  // 3. 인풋에서 enter 눌르면 버튼을 클릭한 것과 동일한 작업하기
 // --> 컴포넌트에 메소드를 만들어 줘야 한다!!


  // // 메소드들 
  // handleChange =(e)=>{
  //   this.setState({
  //     input:e.target.value // input의 다음 바뀔 값
  //   })
  // }

  // handleCreate =() =>{
  //   const {input, todos} =this.state;
  //   this.setState({ // 인풋을 비우고 concat으로 배열에 추가하기.
  //     input: '',

  //     todos : todos.concat({ // 리액트에서는 concat을 사용해야함
  //       id: this.id++,
  //       text: input,
  //       checked: false
  //     })
  //   });
  // }
  // handleKeyPress =(e)=>{
  //   // 눌려진 키가 enter면 handleCreate 호출
  //   if(e.key === 'enter'){
  //     this.handleCreate();
  //   }
  // }

  // handleToggle = (id) =>{
  //   const {todos} = this.state;

  //   // 파라미터로 받은 id를 가지고 몇 번째 아이템인지 찾기
  //   const index = todos.findIndex(todo=> todo.id === id);
  //   const selected = todos[index];// 선택한 객체
  //   const nextTodos =[...todos]; // 배열 복사

  //   // 기존 값들을 복사하고, checked 값 덮어쓰기
  //   // 배열 값을 직접 수정하는 건 절대 안된다.
  //   //let array = [ { value: 1 }, { value: 2 } ];
  //   // let nextArray = array;
  //   // nextArray[0].value = 10;
  //   // console.log(array === nextArray) // true
  //   nextTodos[index]= {
  //     ...selected,
  //     checked : !selected.checked
  //   };

  //   this.setState({
  //     todos: nextTodos
  //   });
  // }

  // handleRemove =(id)=>{
  //   const {todos} = this.state;

  //   this.setState({
  //     todos:todos.filter(todo => todo.id!== id)
  //   });
  // }



  render(){
    // const {input, todos} = this.state;
    // const { // 비구조화 할당 , 매번 this 붙일 일 없음
    //   handleChange,
    //   handleCreate,
    //   handleKeyPress
    // } = this;

    return(
      <Container className="themed-container">
        <SignInTemplate> </SignInTemplate>
      </Container>
    )
  }
}
export default App;
