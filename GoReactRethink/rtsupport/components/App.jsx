import React, {Component} from 'react';
import shortid from 'shortid';
import ChannelSection from './channels/ChannelSection.jsx'
import UserSection from './users/UserSection.jsx'
import MessageSection from './messages/MessageSection.jsx'

class App extends Component {
	constructor(props) {
		super(props);
		this.state= {
			channels:[],
			activeChannel: {}, // New!
			users:[],
			activeUser:{},
			messages:[],
			activeChannelMessages: []
		}
	}
	addChannel(name) {
		let {channels} = this.state;
		var shortid = require('shortid');
		channels.push({id: shortid.generate(), name})
		this.setState({channels});
		// TODO :send to server
	}
	addUser(userName) {
		let {users} = this.state;
		var shortid = require('shortid');
		users.push({id: shortid.generate(), userName})
		this.setState({users});
	}
	addMessage(message, userName, channel) {
		let {messages} = this.state;
		let {activeChannelMessages} = this.state;
		var shortid = require('shortid');
		messages.push({id: shortid.generate(), msg:message, user:userName, chn: channel, time: new Date().toString() })
		activeChannelMessages.push({id: shortid.generate(), msg:message, user:userName, chn: channel, time: new Date().toString() })
		this.setState({messages});
	}
	
	setChannel(activeChannel) {

		this.setState({activeChannel});
		// TODO: Get Channels Messages

		let {messages} = this.state;
		let {activeChannelMessages} = this.state;
		var i = 0;

		if (messages.length > 0) {
			activeChannelMessages=[];
			for (i=0;i<messages.length;i++) {

				if (messages[i].chn.name == activeChannel.name) {
					activeChannelMessages.push({id:messages[i].id, 
						msg: messages[i].msg, 
						user: messages[i].user, 
						chn: messages[i].chn,
						time:messages[i].time})
				}
			}
		}
		
		this.setState({activeChannelMessages})
		
		
	}
	setUserActive(activeUser) {
		this.setState({activeUser})
	}
	render() {
		return(
			<div className='app'>
				<div className = 'nav'>
					<ChannelSection 
						{...this.state}
						addChannel={this.addChannel.bind(this)}
						setChannel={this.setChannel.bind(this)}
					/>
					<UserSection 
						{...this.state}
						addUser = {this.addUser.bind(this)}
						setUserActive = {this.setUserActive.bind(this)}
					/>
				</div>
				<div className = 'messages-container'>
					<MessageSection 
						{...this.state}
						addMessage = {this.addMessage.bind(this)}
					/>
				</div>
			</div>
		)
	}
}

export default App