import React,{Component} from 'react';
import MessageList from './MessageList.jsx'
import MessageForm from './MessageForm.jsx'


class MessageSection extends Component {
	render() {
		return(
			<div className = 'messages-container panel panel-primary'>
				<div className='panel-heading'>
					<strong>{this.props.activeChannel.name}</strong>
				</div>
				<div className='panel-body messages'>
					<MessageList {...this.props}/>
					<MessageForm {...this.props}/>
				</div>
			</div>
		)
	}
}

MessageSection.propTypes ={
	messages: React.PropTypes.array.isRequired,
	addMessage: React.PropTypes.func.isRequired,
	activeChannel: React.PropTypes.object.isRequired,
	activeChannelMessages: React.PropTypes.array.isRequired
}

export default MessageSection