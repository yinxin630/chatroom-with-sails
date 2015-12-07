window.InputForm = React.createClass({
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
    		'left': this.props.width - 250 - 10, //减去width
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