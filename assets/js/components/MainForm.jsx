window.MainForm = React.createClass({
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