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
				width: document.body.clientWidth,
				height: document.body.clientHeight
			}
		});
	},
	
	componentDidMount: function() {
		window.addEventListener('resize', this.handleViewPortResize);
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
			</div>
		);
	}
});