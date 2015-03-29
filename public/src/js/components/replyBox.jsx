var MessageActions = require('../actions/messages');
var MessagesStore = require('../stores/messages');

function getInitialString () {
  return {
    value: ''
  };
}

var ReplyBox = React.createClass({
  getInitialState: function () {
    return getInitialString()
  },
  updateValue    : function () {
    this.setState({
      value: e.target.value
    });
  },
  handleKeyDown: function (e) {
    if (e.keyCode === 13) {
      MessageActions.sendMessage(MessagesStore.getOpenChatUserID(), this.state.value);

      this.setState(getInitialString());
    }
  },
  render         : function () {
    return (
        <div className="reply-box">
          <input className="reply-box__input"
                 placeholder="Type message to reply.."
                 value={this.state.value}
                 onChange={this.updateValue}/>
          <span className="reply-box__tip">
            Press <span className="reply-box__tip__button">Enter</span> to send
          </span>
        </div>
    );
  }
});

module.exports = ReplyBox;