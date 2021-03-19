//  동적인 데이터를 다룰 때는 state 사용

import React, { Component } from 'react';

class Counter extends Component {
    state = {
        number:0
    }

    constructor(props){
        super(props);
        console.log('constructor');
    }

    componentWillMount(){
        console.log('componentWilllMount(dep)');
    }

    componentDidMount(){
        console.log('componentDidMount');

    }
    shouldComponentUpdate(nextProps, nextState){
        // 5의 배수라면 리렌더링 하지 않음
        console.log('shouldCompolnentUpdate');
        if(nextState.number %5 === 0) return false;
        return true;

    }

    componentWillUpdate(nextProps, nextState){
        console.log('componentWillUpdate');
    }

    componentDidUpdate(prevProps, prevState){
        console.log('componentDidUpdate');
    }

    componentDidCatch(error, info){
        this.setState({
            error:true
        });
    }

    handleIncrease =()=>{
        const {number} = this.state;
        this.setState({
            number: number +1
        })
    }

    handleDecrease =()=>{

        this.setState(
            ({number})=>({
            number:number -1
        })
        );
    }

    render() {

        if(this.state.error) return(<h1>에러 발생</h1>);
        return(
            <div>
                <h1>카운터</h1>
                <div>값 : {this.state.number}</div>
                { this.state.number === 4 && <Problematic /> }
                <button onClick={this.handleIncrease}>+</button>
                <button onClick={this.handleDecrease}>-</button>
            </div>
        )
    }
}

const Problematic = () => {
    throw (new Error('버그가 나타났다!'));
    return (
      <div>
        
      </div>
    );
  };
  
export default Counter;