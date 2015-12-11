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
	componentWillUnmount: function() {
		
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