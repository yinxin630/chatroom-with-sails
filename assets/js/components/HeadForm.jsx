/**
 * 页面头部组件
 * props {
 *     height: 高度,
 * }
 *
 * state {
 *     nickName: 昵称,
 * }
 *
 * 触发事件：
 * setting-button-click: 设置按钮被点击,
 */

window.HeadForm = React.createClass({
	getInitialState: function() {
		return {
			nickName: '请更换一个萌萌哒的昵称',
		};
	},
    
	componentDidMount: function() {
		PubSub.subscribe('change-nickname', function(event, data) {
			this.setState({
				nickName: data.nickName,
			});
		}.bind(this));
	},
    
	handleSettingClick: function(event) {
		var rect = event.target.getBoundingClientRect();
		PubSub.publish('setting-button-click', {left: rect.right, top: rect.bottom});
	},
    
	render: function() {
		var pcHeadStyle = {
			'height': this.props.height,
			'background-color': 'black',
		};
		var pcHeadElementContainerStyle = {
			'height': this.props.height,
			'max-width': 1366 * 0.618,
			'margin': '0 auto',
		};
		var productInfoStyle = {
			'font-size': 30,
			'margin-left': 50,
			'color': 'snow',
		};
		var rightContainerStyle = {
			'margin-right': 50,
			'float': 'right',
			'padding-top': 15,
		};
		var userInfoStyle = {
			'font-size': 16,
			'color': 'snow',
			'margin-top': 20,
			'margin-right': 10,
		};
		var settingButtonStyle = {
			'width': 25,
			'height': 25,
		};
		
		return (
			<div>
				<div style={pcHeadStyle}>
					<div style={pcHeadElementContainerStyle}>
						<span style={productInfoStyle}>轻聊</span>
						<div style={rightContainerStyle}>
							<span style={userInfoStyle}>{this.state.nickName}</span>
							<img src="images/setting.png" style={settingButtonStyle} onClick={this.handleSettingClick}></img>
						</div>
					</div>
				</div>
			</div>
		);
	}
});