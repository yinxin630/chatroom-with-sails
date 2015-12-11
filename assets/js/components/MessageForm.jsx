/**
 * 消息容器组件
 * props {
 *     height: 组件高度,
 *     realWidth: 组件实际宽度,
 * }
 *
 * state {
 *     messages: 消息,
 * }
 *
 * 监听事件：
 * messages-update: 消息更新
 */

window.MessageForm = React.createClass({
    getOuterHeight: function(element) {
        if (element === undefined) {
            return 0;
        }
        var marginTop = element.style.marginTop || '0px';
        var marginBottom = element.style.marginBottom || '0px';
        return element.offsetHeight + parseInt(marginTop.slice(0, marginTop.length - 2)) +
            parseInt(marginBottom.slice(0, marginBottom.length - 2));
    },
    
    getInitialState: function() {
		return {
            messages: [],
		};
	},
    
    componentDidMount: function() {
        var messageEvent = PubSub.subscribe('messages-update', function(event, data) {
            this.setState({
                messages: data.messages,
            });
        }.bind(this));
	},
    
    componentDidUpdate: function() {
        var messageContainerDiv = this.refs.messageForm.getDOMNode()
        var maxLength = messageContainerDiv.scrollHeight - messageContainerDiv.clientHeight;
        if (messageContainerDiv.scrollTop >= maxLength - this.getOuterHeight(messageContainerDiv.children[messageContainerDiv.children.length - 1])) {
            messageContainerDiv.scrollTop = maxLength;
        }
    },
    
    render: function() {
        var messageFormStyle = {
            'height': this.props.height,
            'overflow': 'auto',
        };
        
        return (
            <div style={messageFormStyle} ref="messageForm">
                {
                    this.state.messages.map(function(message) {
                        if (message.type === 'message') {
                            return <Message avatar="images/head.png" nickname={message.nickName} time={message.time} message={message.msg} align={message.left ? 'left' : 'right'} maxWidth={this.props.realWidth}/>
                        }
                        else if (message.type === 'system') {
                            return <SystemMessage message={message.msg}/>
                        }
                    }.bind(this))
                }
            </div>
        );
    }
});