//设置项组件
window.SettingForm = React.createClass({
	render: function() {
		var settingContainerStyle = {
			'background-color': 'rgba(102,102,102,0.8)',
			'width': 250,
    		'padding': 10,
			'border-radius': 10,
			'position': 'absolute',
			'left': this.props.left - 250, //减去width
			'top': this.props.top + 10,
		};
		if (this.props.show) {
			settingContainerStyle['display'] = 'block';
		}
		else {
			settingContainerStyle['display'] = 'none';
		}
		var labelStyle = {
			'color': 'snow',
		};
		var inputTextStyle = {
			'border-radius': 8,
    		'height': 25,
    		'padding': 0,
    		'border-width': 0,
		};
		var buttonContainerStyle = {
			'width': 158,
    		'margin': '10px auto 5px auto',
		};
		var buttonStyle = {
			'padding': '2px 10px',
    		'border-width': 0,
    		'border-radius': 8,
			'margin-right': 20,
		};
		
		return (
			<div style={settingContainerStyle}>
				<label style={labelStyle}>昵称：</label> <input style={inputTextStyle} type="text" maxLength="16"></input> <br/>
				<div style={buttonContainerStyle}>
					<button style={buttonStyle}>确 定</button> <button style={buttonStyle}>取 消</button>
				</div>
			</div>
		);
	}
});