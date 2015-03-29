var Dispatcher = require('../dispatchers/app');

var messageActions = {
  changeOpenChat: function (newUserID) {
    Dispatcher.handleViewAction({
      type  : 'updateOpenChatID',
      userId: newUserID
    });
  },
  sendMessage   : function (openChatUserID, message) {
    Dispatcher.handleViewAction(({
      type     : 'sendMessage',
      userID   : openChatUserID,
      message  : message,
      timestamp: +new Date()
    }))
  }
};

module.exports = messageActions;