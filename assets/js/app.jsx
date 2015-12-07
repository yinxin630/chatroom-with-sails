var PHONE_SCREEN_WIDTH = 480;
var PAD_SCREEN_WIDTH = 960;
var MIDDLE_PC_SCREEN_WIDTH = 1366;

var Header = AMUIReact.Header;
var Image = AMUIReact.Image;
var ButtonToolbar = AMUIReact.ButtonToolbar;
var ButtonGroup = AMUIReact.ButtonGroup;
var Button = AMUIReact.Button;

window.onbeforeunload = function() {
	io.socket.delete('/session');
    return null;
};

var SystemMessage = React.createClass({
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
var Message = React.createClass({
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

//设置项组件
var SettingForm = React.createClass({
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

//表情选择组件
var ExpressionSelectForm = React.createClass({
	getDefaultProps: function() {
		return {
			show: false,
		};
	},
	//处理表情选择事件
	handleClick: function(event) {
		var expressionId = 0;
		if (event.nativeEvent.target.toString() == '[object HTMLImageElement]') {
			expressionId = event.target.id;
		}
		else {
			expressionId = event.target.children[0].id;
		}
		PubSub.publishSync('expression-click', {id: expressionId});
	},
	render: function() {
		var expressionContainerStyle = {
			'width': 511,
			'height': 256,
			'background-color': 'rgba(102,102,102,0.8)',
			'position': 'absolute',
			'left': this.props.left,
			'bottom': this.props.bottom,
		};
		if (this.props.show) {
			expressionContainerStyle['display'] = 'block';
		}
		else {
			expressionContainerStyle['display'] = 'none';
		}
		
		var tdStyle = {
			'width': 50,
			'height': 50,
			'border-collapse': 'collapse',
			'border': 'solid 1px #e3e3e3',
		};
		var imgStyle = {
			'width': 30,
			'height': 30,
			'margin': 10,
		};
		
		return (
			<div style={expressionContainerStyle}>
				<table>
					<tr>
						<td style={tdStyle} onClick={this.handleClick}><img id={1} style={imgStyle} src="images/expression/1.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={2} style={imgStyle} src="images/expression/2.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={3} style={imgStyle} src="images/expression/3.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={4} style={imgStyle} src="images/expression/4.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={5} style={imgStyle} src="images/expression/5.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={6} style={imgStyle} src="images/expression/6.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={7} style={imgStyle} src="images/expression/7.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={8} style={imgStyle} src="images/expression/8.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={9} style={imgStyle} src="images/expression/9.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={10} style={imgStyle} src="images/expression/10.png"></img></td>
					</tr>
					<tr>
						<td style={tdStyle} onClick={this.handleClick}><img id={11} style={imgStyle} src="images/expression/11.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={12} style={imgStyle} src="images/expression/12.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={13} style={imgStyle} src="images/expression/13.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={14} style={imgStyle} src="images/expression/14.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={15} style={imgStyle} src="images/expression/15.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={16} style={imgStyle} src="images/expression/16.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={17} style={imgStyle} src="images/expression/17.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={18} style={imgStyle} src="images/expression/18.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={19} style={imgStyle} src="images/expression/19.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={20} style={imgStyle} src="images/expression/20.png"></img></td>
					</tr>
					<tr>
						<td style={tdStyle} onClick={this.handleClick}><img id={21} style={imgStyle} src="images/expression/21.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={22} style={imgStyle} src="images/expression/22.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={23} style={imgStyle} src="images/expression/23.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={24} style={imgStyle} src="images/expression/24.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={25} style={imgStyle} src="images/expression/25.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={26} style={imgStyle} src="images/expression/26.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={27} style={imgStyle} src="images/expression/27.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={28} style={imgStyle} src="images/expression/28.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={29} style={imgStyle} src="images/expression/29.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={30} style={imgStyle} src="images/expression/30.png"></img></td>
					</tr>
					<tr>
						<td style={tdStyle} onClick={this.handleClick}><img id={31} style={imgStyle} src="images/expression/31.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={32} style={imgStyle} src="images/expression/32.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={33} style={imgStyle} src="images/expression/33.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={34} style={imgStyle} src="images/expression/34.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={35} style={imgStyle} src="images/expression/35.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={36} style={imgStyle} src="images/expression/36.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={37} style={imgStyle} src="images/expression/37.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={38} style={imgStyle} src="images/expression/38.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={39} style={imgStyle} src="images/expression/39.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={40} style={imgStyle} src="images/expression/40.png"></img></td>
					</tr>
					<tr>
						<td style={tdStyle} onClick={this.handleClick}><img id={41} style={imgStyle} src="images/expression/41.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={42} style={imgStyle} src="images/expression/42.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={43} style={imgStyle} src="images/expression/43.png"></img></td>
						<td style={tdStyle} onClick={this.handleClick}><img id={44} style={imgStyle} src="images/expression/44.png"></img></td>
						<td style={tdStyle}></td>
						<td style={tdStyle}></td>
						<td style={tdStyle}></td>
						<td style={tdStyle}></td>
						<td style={tdStyle}></td>
						<td style={tdStyle}></td>
					</tr>
				</table>
			</div>
		);
	}
});
var ToolbarForm = React.createClass({
	handleExpressionClick: function(event) {
		PubSub.publishSync('expression-button-click', {});
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
var InputForm = React.createClass({
	insertAtCursor: function(myValue) {
		var myField = document.getElementById(this.refs.textarea.props.id);
		//IE support
		if (document.selection) {
			myField.focus();
			sel = document.selection.createRange();
			sel.text = myValue;
			sel.select();
		}
		//MOZILLA/NETSCAPE support
		else if (myField.selectionStart || myField.selectionStart == '0') {
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;
			// save scrollTop before insert
			var restoreTop = myField.scrollTop;
			myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(endPos, myField.value.length);
			if (restoreTop > 0) {
				// restore previous scrollTop
				myField.scrollTop = restoreTop;
			}
			myField.focus();
			myField.selectionStart = startPos + myValue.length;
			myField.selectionEnd = startPos + myValue.length;
		} else {
			myField.value += myValue;
			myField.focus();
		}
	},
	componentDidMount: function() {
		PubSub.subscribe('expression-click', function(event, data) {
			this.insertAtCursor('#(' + data.id + ')');
		}.bind(this));
	},
	render: function() {
		var textareaContainerStyle = {
			'width': this.props.width,
			'height': this.props.height,
		};
		var textareaStyle = {
			'width': this.props.width,
			'height': this.props.height,
			'background-color': 'rgba(0,0,0,0.5)',
			'border-bottom-left-radius': 10,
    		'border-bottom-right-radius': 10,
			'color': 'snow',
			'padding': 10,
			'font-size': 14,
		};
		var buttonContainerStyle = {
			'width': 250,
			'position': 'relative',
    		'left': this.props.width - 250, //减去width
    		'bottom': 35,
		};
		var buttonStyle = {
			'background-color': '#8a5555',
    		'color': 'snow',
    		'padding': '3px 10px',
    		'border': 0,
    		'border-radius': 5,
			'margin-right': 10,
		};
		return (
			<div style={textareaContainerStyle}>
				<textarea id="textarea" style={textareaStyle} placeholder="请输入消息" ref="textarea"></textarea>
				<div style={buttonContainerStyle}>
					<button style={buttonStyle}>发送 Enter</button>
					<button style={buttonStyle}>换行 Shift+Enter</button>
				</div>
			</div>
		);
	}
});
var HeadForm = React.createClass({
	getInitialState: function() {
		return {
			nickname: '',
		};
	},
	componentDidMount: function() {
		PubSub.subscribe('change-nickname', function(event, data) {
			this.setState({
				nickname: data.nickname,
			});
		}.bind(this));
	},
	handleSettingClick: function(event) {
		var rect = event.target.getBoundingClientRect();
		PubSub.publishSync('setting-button-click', {left: rect.right, top: rect.bottom});
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
							<span style={userInfoStyle}>{this.state.nickname}</span>
							<img src="images/setting.png" style={settingButtonStyle} onClick={this.handleSettingClick}></img>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

var BodyForm = React.createClass({
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

var MainForm = React.createClass({
	getDefaultProps: function() {
		return {

		};
	},
	
	getInitialState: function() {
		return {
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight
			}
		};
	},
	
	handleViewPortResize: function() {
		this.setState({
			viewport: {
				width: window.innerWidth,
				height: window.innerHeight
			}
		});
	},
	
	componentDidMount: function() {
		window.addEventListener('resize', this.handleViewPortResize);
		
		io.socket.on('connect', function connectServer() {
			io.socket.post('/session', { nickName: this.refs.nickname.props.value }, function (resData, jwres) {
				PubSub.publishSync('change-nickname', {nickname: resData.nickName});
			}.bind(this))
		}.bind(this));
	},
	
	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleViewPortResize);
	},
	
	render: function() {
		var mainFormStyle = {
			'width': this.state.viewport.width,
			'height': this.state.viewport.height,
		};
		var headFormHeight = 50;
		return (
			<div style={mainFormStyle}>
				<HeadForm width={this.state.viewport.width} height={headFormHeight}/>
				<BodyForm width={this.state.viewport.width} height = {this.state.viewport.height - headFormHeight}/>
				<input type="hidden" ref="nickname" value=""/>
			</div>
		);
	}
});

React.render(<MainForm />, document.getElementById('main'));