import React, { Component } from 'react';
import './App.css';
import Tab from './Tab.js';
import Chat from './Chat.js';

class App extends Component {
	constructor(props){
		super(props);
		let initialConnection = {user:"",channel:""};
		this.state = {messages:[],connections:[ initialConnection],selectedTab:initialConnection};
		this.pushMessage = this.pushMessage.bind(this);
		this.login = this.login.bind(this);
	}
	pushMessage(mes){
		this.setState({messages:this.state.messages.concat(mes)});
	}
	login(creds){
		let index = this.state.connections.map((o)=>{return JSON.stringify(o)}).indexOf(JSON.stringify(creds));
		if(index === -1 ) this.setState({messages:this.state.messages.concat({user:"admin",channel:creds.channel,message:(creds.user+" joined the channel"),time:new Date()}),selectedTab:creds,connections:this.state.connections.slice(0,-1).concat(creds)});
		else  this.setState({selectedTab:this.state.connections[index]});
	}
	render() {
		let cons = this.state.connections;
		let tabs = this.state.connections.map((o)=>{
			return (<Tab key={JSON.stringify(o)} app={this}  tab={o} selectedTab={this.state.selectedTab} />)
		});
		let chats = this.state.connections.map((o)=>{
			let messages=this.state.messages.filter((b)=>{
				return o.channel===b.channel;
			});
			return (<Chat key={JSON.stringify(o)} pushMessage={this.pushMessage} messages={messages} app={this}  chat={o} selectedTab={this.state.selectedTab} login={this.login}/>)
		});
		return (
			<div className="App">
			<header>
			{tabs}
			<div id="addTab" onClick={()=>{
				if(cons.length === 0 || (cons[cons.length - 1].channel !== "")){
					let newConnection = {user:"",channel:""};
					this.setState({connections:this.state.connections.concat(newConnection),selectedTab:newConnection})
				}
			}}><i className="fa fa-plus" aria-hidden="true"></i></div>
			<div style={{float:"unset"}}></div>
			</header>
			<div className="chat">
			{chats}

			</div>
			</div>
		);
	}
}

export default App;
