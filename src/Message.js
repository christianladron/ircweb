
import React, { Component } from 'react';

class Message extends Component {
	render() {
			
		let sent = this.props.messageUser === this.props.connectionUser;
		let isAdmin = this.props.messageUser === "admin";
		let messageClass = "message " + (isAdmin ? "message-admin" : (sent?"message-sent":"message-received"));
		let message = this.props.message;
		return ( <div className={messageClass} >
				<div><p>{message}</p></div>
				<div><span>{this.props.messageUser}</span><span> {this.props.time.toLocaleString()}</span></div>
			</div>)
	}
}

export default Message;
