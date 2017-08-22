import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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
		let tabs = this.state.connections.map((o)=>{
			let closeTab = ()=>{
				this.setState({connections:this.state.connections.filter((b)=>{return b!==o;})});
			}
			let selectTab = ()=>{
				this.setState({selectedTab:o});
			}
			return (<div className={"tab"+(this.state.selectedTab === o ? " selected-tab":"")} onClick={selectTab}><span>{o.channel}</span> <span>{o.user}  </span><i onClick={closeTab} className="fa fa-times" aria-hidden="true"></i></div>)
		});
		return (
			<div className="App">
			<header>
			{tabs}
			<div id="addTab" onClick={()=>{this.setState({connections:this.state.connections.concat({user:"",channel:""})})}}><i className="fa fa-plus" aria-hidden="true"></i></div>
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
