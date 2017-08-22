import React, { Component } from 'react';

class Tab extends Component {
	constructor(props){
		super(props);
	}
	render() {
			return (<div className={"tab"+(this.props.selectedTab === this.props.tab ? " selected-tab":"")} onClick={this.props.selectTab}><span>{this.props.tab.channel}</span> <span>{this.props.tab.user}  </span><i onClick={this.props.tab.closeTab} className="fa fa-times" aria-hidden="true"></i></div>)
		}
}

export default Tab;
