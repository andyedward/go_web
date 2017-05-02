import React, { Component } from 'react';
import shortid from 'shortid';
import ChannelSection from './channels/ChannelSection.jsx'
import UserSection from './users/UserSection.jsx'
import MessageSection from './messages/MessageSection.jsx'
import Socket from './socket.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state= {
			channels:[],
			activeChannel: {}, // New!
			users:[],
			activeUser:{},
			messages:[],
			activeChannelMessages: [],
			connected: false
		}
	}
	componentDidMount() {
		let socket = this.socket = new Socket();
		socket.on('connect', this.onConnect.bind(this));
		socket.on('disconnect', this.onDisconnect.bind(this));
		socket.on('channel add', this.onAddChannel.bind(this));
		socket.on('user add', this.onAddUser.bind(this));
		socket.on('user edit', this.onEditUser.bind(this));
		socket.on('user remove', this.onRemoveUser.bind(this));
		socket.on('message add', this.onMessageAdd.bind(this));
	}
	onMessageAdd(message) {
		let {messages} = this.state;
		messages.push({message});
		this.setState({messages});
	}
	onRemoveUser(removeUser) {
		let {users} = this.state;
		users = users.filter(user => {
			return user.id !== removeUser.id;
		});
		this.setState({users});
	}
	onAddUser(user) {
		let {users} = this.state;
		users.push(user);
		this.setState({users});
	}
	onEditUser(editUser) {
		let {users} = this.state;
		users = users.map(user =>{
			if(editUser.id === user.id) {
				return editUser;
			}
			return user;
		});
		this.setState({users});

	}
	onConnect() {
		this.setState({connected:true});
		this.socket.emit('channel subscribe');
		this.socket.emit('user subscribe');
	}
	onDisconnect() {
		this.setState({connected:false});
	}	
	onAddChannel(channel) {
		let {channels} = this.state;
		var shortid = require('shortid');

		channels.push({id: channel.id, name: channel.name});
		this.setState({channels})
	}
	addChannel(name) {
		this.socket.emit('channel add',{name})
	}
	addUser(userName) {
		let {users} = this.state;
		var shortid = require('shortid');
		users.push({id: shortid.generate(), userName})
		this.setState({users});
	}
	addMessage(message, userName, channel) {
		/*let {messages} = this.state;
		let {activeChannelMessages} = this.state;
		var shortid = require('shortid');
		messages.push({id: shortid.generate(), msg:message, user:userName, chn: channel, time: new Date().toString() })
		activeChannelMessages.push({id: shortid.generate(), msg:message, user:userName, chn: channel, time: new Date().toString() })
		this.setState({messages});*/

		let {activeChannel} = this.state;
		this.socket.emit('message add',
		{
			channelId: activeChannel.id, body
		});
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
		this.socket.emit('message unsubscribe');
		this.setState({messages:[]});
		this.socket.emit('messages subscribe', {
			channelId:activeChannel.id
		});
		
	}
	setUserActive(activeUser) {
		this.setState({activeUser})
	}
	setUserName(name) {
		this.socket.emit('user edit', {name});
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