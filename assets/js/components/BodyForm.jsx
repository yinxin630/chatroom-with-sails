window.BodyForm = React.createClass({
	getDefaultProps: function() {
		return {
			toolbarFormHeight: 30,
			inputFormHeight: 80,
		};
	},
	getInitialState: function() {
		return {
			showExpressionForm: false,
			showSettingForm: false,
		};
	},
	componentDidMount: function() {
		var expressionButtonClickEvent = PubSub.subscribe('expression-button-click', function(event, data) {
			this.setState({
				showExpressionForm: !this.state.showExpressionForm,
			});
		}.bind(this));
		
		var settingButtonClickEvent = PubSub.subscribe('setting-button-click', function(event, data) {
			this.setState({
				showSettingForm: !this.state.showSettingForm,
				settingFormLeft: data.left,
				settingFormTop: data.top,
			});
		}.bind(this));
	},
	componentWillUnmount: function() {
		
	},
	render: function() {
		var bodyStyle = {
			'width': this.props.width,
			'height': this.props.height,
			'background-image': 'url("images/react-background.png")',
		};
		var chatFormStyle = {
			'max-width': 1366 * 0.618,
			'height': this.props.height,
			'margin': '0px auto',
			'background-color': 'rgba(0,0,0,0.5)',
			'border-bottom-left-radius': 10,
    		'border-bottom-right-radius': 10,
		};
		var messageFormStyle = {
			'height': this.props.height - this.props.toolbarFormHeight - this.props.inputFormHeight,
			'overflow': 'auto',
		};
		var toolbarFormStyle = {
			'height': this.props.toolbarFormHeight,
			'background-color': 'rgba(153,153,153,0.5)',
		};
		var realMessageFormWidth = (this.props.width < chatFormStyle['max-width'] ? this.props.width : chatFormStyle['max-width']);
		
		return (
			<div style={bodyStyle}>
				<div style={chatFormStyle}>
					<div style={messageFormStyle}>
						<Message avatar="images/head.png" nickname="碎碎酱" time="11:11:11" message="大家好，我是新人。" align="left" width={realMessageFormWidth}></Message>
						<Message avatar="images/head.png" nickname="管理员" time="11:11:11" message="你好，欢迎你。" align="right" width={realMessageFormWidth}></Message>
						<SystemMessage message="12:12:12 碎碎酱进入房间"></SystemMessage>
						<Message avatar="images/head.png" nickname="碎碎酱" time="11:11:11" message="大家好，我是新人。" align="left" width={realMessageFormWidth}></Message>
						<Message avatar="images/head.png" nickname="管理员" time="11:11:11" message="你好，欢迎你。" align="right" width={realMessageFormWidth}></Message>
						<Message avatar="images/head.png" nickname="碎碎酱" time="11:11:11" message="大家好，我是新人。" align="left" width={realMessageFormWidth}></Message>
						<Message avatar="images/head.png" nickname="管理员" time="11:11:11" message="你好，欢迎你。" align="right" width={realMessageFormWidth}></Message>
					</div>
					<div style={toolbarFormStyle}>
						<ToolbarForm height={this.props.toolbarFormHeight}></ToolbarForm>
					</div>
					<InputForm width={realMessageFormWidth} height={this.props.inputFormHeight}></InputForm>
					<ExpressionSelectForm left={(this.props.width - realMessageFormWidth) / 2} bottom={this.props.toolbarFormHeight + this.props.inputFormHeight} show={this.state.showExpressionForm}></ExpressionSelectForm>
					<SettingForm top={this.state.settingFormTop} left={this.state.settingFormLeft} show={this.state.showSettingForm}></SettingForm>
				</div>
			</div>
		);
	}
});