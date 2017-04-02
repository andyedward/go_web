import React,{Component} from 'react';

class Message extends Component {

	render() {
		return(
			<li>
				<div><strong>{this.props.message.user}</strong>&nbsp;{this.props.message.time}</div> 
				{this.props.message.msg} 
			</li>
		)
	}
}

Message.propTypes = {
	message: React.PropTypes.object.isRequired,
	activeChannel: React.PropTypes.object.isRequired
}

export default Message