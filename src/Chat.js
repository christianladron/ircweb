import React, { Component } from 'react';
import Message from './Message.js';

class Chat extends Component {
	constructor(props){
		super(props);
		this.state = {newMessage:"",user:"",pwd:"k",channel:""};
	this.createMessage = this.createMessage.bind(this);
	this.write = this.write.bind(this);
	this.pushMessage = this.pushMessage.bind(this);
	this.login = this.login.bind(this);
	}
	write(e){
		if(e.target.value!=="\n") this.setState({newMessage:e.target.value});
	}
	pushMessage(e){
		e.stopPropagation();
		if(this.state.newMessage !== "" && ((e.type==="keypress" && e.charCode===13 && e.shiftKey === false) || e.type==="click")){
		this.props.pushMessage({user:this.props.chat.user,channel:this.props.chat.channel,message:this.state.newMessage,time:new Date()});
		this.setState({newMessage:""});
		}
	}
	createMessage(o){
		return <Message messageUser={o.user} time={o.time} key={o.user+o.time} connectionUser={this.props.chat.user} message={o.message}/>;
	}
	login(){
		let user = this.state.user;
		let channel = this.state.channel;
		let pwd = this.state.pwd;
		if (user !== "" && channel !== "" && pwd !== "" && user !== "admin") this.props.login({user,channel});
	}
	render() {
		let messages = this.props.messages.map(this.createMessage);
		let newMessage = this.state.newMessage;
		if(this.props.chat.user !=="" && this.props.chat.channel !==""){
		return ( <div className="chat-container" style={{"display":(this.props.selectedTab===this.props.chat)?"block":"none"}}>
				<div className="chat-text">
				{messages}
				</div>
				<div className="chat-write">
					<textarea  onKeyPress={this.pushMessage} onChange={this.write} value={newMessage}></textarea>
					<div className="send-message" onClick={this.pushMessage}><p>Send</p></div>
				</div>
			</div>)
		}else{
			return <form onKeyPress={(e)=>{if(e.charCode === 13) this.login()}} className="chat-login" style={{"display":(this.props.selectedTab===this.props.chat)?"block":"none"}}>
				<div><label htmlFor="channel">Channel</label><input value={this.state.channel} onChange={(e)=>{this.setState({channel:e.target.value})}} id="channel" type="text"/></div>
				<div><label htmlFor="user">Username</label><input value={this.state.user} onChange={(e)=>{this.setState({user:e.target.value})}} id="user" type="text"/></div>
				{/*<div><label htmlFor="pwd">Password</label><input value={this.state.pwd} onChange={(e)=>{this.setState({pwd:e.target.value})}} id="pwd" type="password"/></div>*/}
				<div><input type="button" onClick={this.login} value="login" id="login" /></div>
				</form>
		}
	}
}

export default Chat;
