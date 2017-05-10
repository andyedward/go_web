import React, {Component} from 'react';

class User extends Component {
	onClick(e) {
		const userName = this.props.user;
		this.props.setUserActive(userName)
	}
	render() {
		const {user, activeUser} = this.props;
		const active = user===activeUser ? 'active' :'';
		return(
			<li className = {active}>
				<a onClick={this.onClick.bind(this)}>
					{this.props.user.name} {this.props.user.id}
				</a>
			</li>
		)
	}
}

User.propTypes = {
	user: React.PropTypes.object.isRequired,
	setUserActive: React.PropTypes.func.isRequired,
	activeUser: React.PropTypes.object.isRequired
}
export default User