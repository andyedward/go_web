import React,{Component} from 'react';


class MessageForm extends Component {
	onSubmit(e) {
		e.preventDefault();
		const node = this.refs.message;
		const message = node.value;
		const activeUser = this.props.activeUser
		const activeChn= this.props.activeChannel
		//this.props.addMessage(message,activeUser.userName, activeChn);
		this.props.addMessage(message);
		node.value='';
	}
	render() {
		let input;
		if (this.props.activeChannel.id !==undefined ) {
			input = (
				<input 
				    className='form-control'
					type="text"
					placeholder="Add Message"
					ref="message" 
				/>
			)
		}
		return(
			<form onSubmit={this.onSubmit.bind(this)}>
				<div className='form-group'>
					{input}
				</div>
			</form>
		)
	}
}

MessageForm.propTypes ={
	addMessage: React.PropTypes.func.isRequired,
	activeUser: React.PropTypes.object.isRequired,
	activeChannel: React.PropTypes.object.isRequired,
}

export default MessageForm