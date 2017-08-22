import React, { Component } from 'react';
import './App.css';
import Tab from './Tab.js';

class App extends Component {
	constructor(props){
		super(props);
		this.state = {messages:[{channel:"chat 1",user:"Christian",message:"Hola mundo",time:new Date()}],connections:[
			{user:"Christian",channel:"chat 1"},
			{user:"Roberto",channel:"chat 2"},
			{user:"Christian",channel:"chat 2"},
			{user:"Roberto",channel:"chat 3"},
			{user:"Christian",channel:"chat 4"}
		]};
	}
	render() {
		let cons = this.state.connections;
		let tabs = this.state.connections.map((o)=>{
			return (<Tab key={JSON.stringify(o)} app={this}  tab={o} selectedTab={this.state.selectedTab} />)
		});
		return (
			<div className="App">
			<header>
			{tabs}
			<div id="addTab" onClick={()=>{
				if(cons.length === 0 || (cons[cons.length - 1].channel !== ""))
				this.setState({connections:this.state.connections.concat({user:"",channel:""})})
			}}><i className="fa fa-plus" aria-hidden="true"></i></div>
			<div style={{float:"unset"}}></div>
			</header>
			<div className="chat">
			<div className="chat-text"></div>
			<div className="chat-write"></div>
			</div>
			</div>
		);
	}
}

export default App;
