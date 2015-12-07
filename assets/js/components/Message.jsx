var Image = AMUIReact.Image;

window.Message = React.createClass({
    //消息过滤相关函数
    filterBlankSymbol: function(msg) {
        msg = msg.replace(/\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u0085\u2029)/g, '<br>');
        msg = msg.replace(/  /g, '&nbsp');
        msg = msg.replace(/\t/g, '&nbsp&nbsp');
        return msg;
    },

    filterUrl: function(msg) {
        var strRegex = /(https?:\/\/)([A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\'\" ])*)/g;
        var re = new RegExp(strRegex);
        msg = msg.replace(re, function (a, b, c) {
            return '<a href="http://' + c + '" target="_blank">' + a + '</a>';
        });
        return msg;
    },

    filterExpression: function(msg) {
        var strRegex = /#\([0-9]+?\)/g;
        var re = new RegExp(strRegex);
        msg = msg.replace(re, function (a, b, c) {
            return '<img src="../images/expression/' + a.slice(2, a.length - 1) + '.png" style="width:30px;vertical-align: text-bottom;" onerror="this.style.display=\'none\'"></img>';
        });
        return msg;
    },
    
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
					<span dangerouslySetInnerHTML={{__html: this.filterExpression(this.filterUrl(this.filterBlankSymbol(this.props.message)))}}></span>
				</div>
			</div>
		);
	}
});