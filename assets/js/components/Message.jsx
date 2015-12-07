var Image = AMUIReact.Image;

window.Message = React.createClass({
	getDefaultProps: function() {
		return {
			align: 'left',
		};
	},
	
	render: function() {
		var messageStyle = {
			'margin-left': 20,
			'margin-right': 20,
			'padding-top': '0px',
			'overflow': 'hidden',
		};
		var avatarContainerStyle = {
			'float': this.props.align,
			'margin': 10,
		};
		var avatarStyle = {
			'width': 40,
			'height': 40,
		};
		var messageInfoContainerStyle = {
			'margin-left': 60,
			'color': 'snow',
			'text-align': this.props.align,
		};
		var timeStyle = {
			'margin-left': '10px',
    		'font-size': '14px',
		};
		var messageContentContainerStyle = {
			'margin': '0px 0px 0px auto',
			'background-color': 'rgba(230,230,230,0.8)',
			'word-brea': 'normal',
   	 		'word-wrap': 'break-word',
			'padding': '0px 10px',
			'border-radius': '10px',
			'display': 'inline-block',
			'float': this.props.align,
			'max-width': this.props.width - (messageStyle['margin-left'] + avatarContainerStyle['margin'] * 2 + avatarStyle['width']) * 2,
		};
		
		return (
			<div style={messageStyle}>
				<div style={avatarContainerStyle}>
					<Image src={this.props.avatar} style={avatarStyle} circle></Image>
				</div>
				<div style={messageInfoContainerStyle}>
					<span>{this.props.nickname}</span>
					<span style={timeStyle}>{this.props.time}</span>
				</div>
				<div style={messageContentContainerStyle}>
					<span>{this.props.message}</span>
				</div>
			</div>
		);
	}
});