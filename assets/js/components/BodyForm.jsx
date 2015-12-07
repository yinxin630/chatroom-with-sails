window.BodyForm = React.createClass({
    getOuterHeight: function(element) {
        if (element === undefined) {
            return 0;
        }
        var marginTop = element.style.marginTop || '0px';
        var marginBottom = element.style.marginBottom || '0px';
        return element.offsetHeight + parseInt(marginTop.slice(0, marginTop.length - 2)) +
            parseInt(marginBottom.slice(0, marginBottom.length - 2));
    },
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
            messages: [],
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
        
        var messageEvent = PubSub.subscribe('message', function(event, data) {
            this.setState({
                messages: data.messages,
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
    componentDidUpdate: function() {
        var messageContainerDiv = this.refs.messageForm.getDOMNode()
        var maxLength = messageContainerDiv.scrollHeight - messageContainerDiv.clientHeight;
        if (messageContainerDiv.scrollTop >= maxLength - this.getOuterHeight(messageContainerDiv.children[messageContainerDiv.children.length - 1])) {
            messageContainerDiv.scrollTop = maxLength;
        }
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
					<div style={messageFormStyle} ref="messageForm">
                        {
                            this.state.messages.map(function(message) {
                                if (message.type === 'message') {
                                    return <Message avatar="images/head.png" nickname={message.nickName} time={message.time} message={message.msg} align={message.left ? 'left' : 'right'} width={realMessageFormWidth}/>
                                }
                                else if (message.type === 'system') {
                                    return <SystemMessage message={message.msg}/>
                                }
                            })
                        }
					</div>
					<div style={toolbarFormStyle}>
						<ToolbarForm height={this.props.toolbarFormHeight}></ToolbarForm>
					</div>
					<InputForm width={realMessageFormWidth} height={this.props.inputFormHeight}></InputForm>
					<ExpressionSelectForm left={(this.props.width - realMessageFormWidth) / 2} bottom={this.props.toolbarFormHeight + this.props.inputFormHeight} show={this.state.showExpressionForm}/>
					<SettingForm top={this.state.settingFormTop} left={this.state.settingFormLeft} show={this.state.showSettingForm}></SettingForm>
				</div>
			</div>
		);
	}
});