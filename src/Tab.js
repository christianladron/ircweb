import React, { Component } from 'react';

class Tab extends Component {
	constructor(props){
		super(props);
		this.closeTab = this.closeTab.bind(this);
		this.selectTab = this.selectTab.bind(this);
	}
	closeTab(e){
		e.stopPropagation();
		let app = this.props.app
		if(app.state.selectedTab === this.props.tab){
			let length = app.state.connections.length;
			let index = app.state.connections.indexOf(this.props.tab);
			if(length === 1){
				app.setState({selectedTab:null})
			}else if(index === 0){
				app.setState({selectedTab:app.state.connections[1]})
			}else {
				app.setState({selectedTab:app.state.connections[index-1]})
			}
		}
		app.setState({messages:app.state.messages.concat({user:"admin",channel:this.props.tab.channel,message:(this.props.tab.user+" left the channel"),time:new Date()}),connections:app.state.connections.filter((b)=>{return b!==this.props.tab;})});
	}
	selectTab(){
		this.props.app.setState({selectedTab:this.props.tab});
	}
	render() {
		return (<div className={"tab"+(this.props.selectedTab === this.props.tab ? " selected-tab":"")} onClick={this.selectTab}><span>{this.props.tab.channel || "Disconnected"}</span> <span>{this.props.tab.user}  </span><i onClick={this.closeTab} className="fa fa-times" aria-hidden="true"></i></div>)
	}
}

export default Tab;
