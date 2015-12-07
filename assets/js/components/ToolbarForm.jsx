window.ToolbarForm = React.createClass({
	handleExpressionClick: function(event) {
		PubSub.publish('expression-button-click', {});
	},
	render: function() {
		var groupStyle = {
			'height': this.props.height,
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