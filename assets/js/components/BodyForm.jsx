/**
 * 页面主体容器组件
 * props {
 *     toolbarFormHeight: 工具栏高度,
 *     inputFormHeight: 输入框高度,
 *     width: 宽度,
 *     height: 高度,
 *     settingFormLeft: 设置窗体位置(x),
 *     settingFormTop: 设置窗体位置(y),
 * }
 *
 * state {
 *     showExpressionForm: 是否显示表情选择窗体,
 *     showSettingForm: 是否显示设置窗体,
 * }
 *
 * 监听事件：
 * expression-button-click: 选择表情按钮被点击,
 * setting-button-click: 设置按钮被点击,
 * close-setting-form: 关闭设置按钮被点击,
 * expression-click: 表情被点击,
 */

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
        
        var closeSettingFormEvent = PubSub.subscribe('close-setting-form', function(event, data) {
            this.setState({
                showSettingForm: false,
            });
        }.bind(this));
        
        var expressionClickEvent = PubSub.subscribe('expression-click', function(event, data) {
			this.setState({
                showExpressionForm: false,
            });
		}.bind(this));
	},
	componentWillUnmount: function() {
		
	},
    
	render: function() {
		var bodyStyle = {
			'width': this.props.width,
			'height': this.props.height,
			'background-image': 'url("images/background-1.jpg")',
            'background-size': this.props.width + 'px ' + this.props.height + 'px',
		};
		var chatFormStyle = {
			'max-width': 1366 * 0.618,
			'height': this.props.height,
			'margin': '0px auto',
			'background-color': 'rgba(0,0,0,0.5)',
			'border-bottom-left-radius': 10,
    		'border-bottom-right-radius': 10,
		};

		var realMessageFormWidth = (this.props.width < chatFormStyle['max-width'] ? this.props.width : chatFormStyle['max-width']);
		
		return (
			<div style={bodyStyle}>
				<div style={chatFormStyle}>
					<MessageForm height={this.props.height - this.props.toolbarFormHeight - this.props.inputFormHeight} realWidth={realMessageFormWidth}/>
					<ToolbarForm height={this.props.toolbarFormHeight}/>
					<InputForm width={realMessageFormWidth} height={this.props.inputFormHeight} rightmargin={(this.props.width - realMessageFormWidth) / 2}></InputForm>
					<ExpressionSelectForm left={(this.props.width - realMessageFormWidth) / 2} bottom={this.props.toolbarFormHeight + this.props.inputFormHeight} show={this.state.showExpressionForm}/>
					<SettingForm top={this.state.settingFormTop} left={this.state.settingFormLeft} show={this.state.showSettingForm}></SettingForm>
				</div>
			</div>
		);
	}
});