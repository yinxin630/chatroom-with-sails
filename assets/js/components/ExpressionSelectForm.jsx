//表情选择组件
window.ExpressionSelectForm = React.createClass({
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