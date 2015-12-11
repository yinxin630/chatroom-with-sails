/**
 * 工具栏组件
 * props {
 *     height: 组件高度,
 * }
 *
 * 触发事件：
 * expression-button-click: 选择表情按钮被点击
 */
 
window.ToolbarForm = React.createClass({
	handleExpressionClick: function(event) {
		PubSub.publish('expression-button-click', {});
	},
	render: function() {
		var groupStyle = {
			'height': this.props.height,
			'background-color': 'rgba(153,153,153,0.5)',
		};
		var buttonStyle = {
			'width': this.props.height,
			'height': this.props.height,
			'background-color': 'rgba(0,0,0,0)',
			'border-width': 0,
			'padding': 0,
		};
		return (
			<div style={groupStyle}>
				<button style={buttonStyle} onClick={this.handleExpressionClick}><img src="images/toolbar-expression.png"></img></button>
			</div>
		);
	}
});