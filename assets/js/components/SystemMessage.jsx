/**
 * 系统消息展示组件
 * props {
 *     message: 消息内容,
 * }
 */

window.SystemMessage = React.createClass({
	render: function() {
		var messageContainerStyle = {
			'text-align': 'center',
			'color': 'darkseagreen',
			'margin-top': 5,
			'margin-bottom': 5,
		};
		return (
			<div style={messageContainerStyle}>
				<span>一一一一一 {this.props.message} 一一一一一</span>
			</div>
		);
	}
});