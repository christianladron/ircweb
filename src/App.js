import React, { Component } from 'react';
import './App.css';
import Tab from './Tab.js';
import Chat from './Chat.js';
import socketio from 'socket.io-client';
function parseTime(m){
	m.time = new Date(m.time);
	return m;
}
class App extends Component {
	constructor(props){
		super(props);
		let io = socketio("localhost:4567");
		window.io = io;
		io.onconnect(function(){console.log(arguments);});
		let initialConnection = {user:"",channel:""};
		this.state = {io:io,messages:[],servConnections:[],connections:[ initialConnection],selectedTab:initialConnection};
		this.pushMessage = this.pushMessage.bind(this);
		this.updateServConns = this.updateServConns.bind(this);
		io.on("print",
			(mes)=>{console.log(mes);
		});
		io.on("messages",
			(mes)=>{this.setState({ messages:mes.map(parseTime) })
		});
		io.on("connections",(conns)=>{
			console.log(conns);
			this.setState({servConnections:conns});
		});
		this.login = this.login.bind(this);
	}
	pushMessage(mes){
		//this.setState({messages:this.state.messages.concat(mes)});
		this.state.io.emit("pushMessage",mes)
	}
	updateServConns(conns){
		this.state.io.emit("connections",conns);
	}
	login(creds){
		let index = this.state.connections.map((o)=>{return JSON.stringify(o)}).indexOf(JSON.stringify(creds));
		if(index === -1 ) {
			let newConns = this.state.connections.slice(0,-1).concat(creds);
			this.updateServConns(newConns);
			this.setState({selectedTab:creds,connections:newConns});
			this.pushMessage({user:"admin",channel:creds.channel,message:(creds.user+" joined the channel"),time:new Date()});
		}
		else  this.setState({selectedTab:this.state.connections[index]});
	}
	render() {
		let cons = this.state.connections;
		let tabs = this.state.connections.map((o)=>{
			return (<Tab key={JSON.stringify(o)} app={this} pushMessage={this.pushMessage} updateServConns={this.updateServConns} tab={o} selectedTab={this.state.selectedTab} />)
		});
		let chats = this.state.connections.map((o)=>{
			let messages=this.state.messages.filter((b)=>{
				return o.channel===b.channel;
			});
			let users = this.state.servConnections.filter((b)=>{
				return b.channel === o.channel
			}).map((b)=>{
				return b.user;
			});
			return (<Chat users={users} key={JSON.stringify(o)} pushMessage={this.pushMessage} messages={messages} app={this}  chat={o} selectedTab={this.state.selectedTab} login={this.login}/>)
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
