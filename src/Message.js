
import React, { Component } from 'react';

class Message extends Component {
	render() {
			
		let sent = this.props.messageUser === this.props.connectionUser;
		let message = this.props.message;
		return ( <div className={"message" + (sent?" message-sent":" message-received")} >
				<div><p>{message}</p></div>
				<div><span>{this.props.messageUser}</span><span> {this.props.time.toLocaleString()}</span></div>
			</div>)
	}
}

export default Message;
