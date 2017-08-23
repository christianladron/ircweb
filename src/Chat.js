import React, { Component } from 'react';
import Message from './Message.js';

class Chat extends Component {
	constructor(props){
		super(props);
		this.state = {newMessage:""};
	this.createMessage = this.createMessage.bind(this);
	this.write = this.write.bind(this);
	this.pushMessage = this.pushMessage.bind(this);
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
	render() {
		let messages = this.props.messages.map(this.createMessage);
		let newMessage = this.state.newMessage;
		return ( <div className="chat-container" style={{"display":(this.props.selectedTab===this.props.chat)?"block":"none"}}>
				<div className="chat-text">
				{messages}
				</div>
				<div className="chat-write">
					<textarea  onKeyPress={this.pushMessage} onChange={this.write} value={newMessage}></textarea>
					<div className="send-message" onClick={this.pushMessage}><p>Send</p></div>
				</div>
			</div>)
	}
}

export default Chat;
