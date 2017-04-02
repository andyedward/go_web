import React,{Component} from 'react';
import Message from './Message.jsx'


class MessageList extends Component {
	render() {
		return(
			<ul>{this.props.activeChannelMessages.map(activeChannelMessage =>{
				return <Message 
					message= {activeChannelMessage} 
					key = {activeChannelMessage.id}
					{...this.props}
				/>

			})}
			</ul>
		)
	}
}

MessageList.propTypes ={
	messages: React.PropTypes.array.isRequired,
	activeChannel: React.PropTypes.object.isRequired,
	activeChannelMessages: React.PropTypes.array.isRequired
}

export default MessageList