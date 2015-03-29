var Dispatcher   = require('../dispatchers/app');
var EventEmitter = require('events').EventEmitter;
var assign       = require('object-assign');
var UserStore    = require('./user');

var messages = {
  2: {
    user      : {
      profilePicture: 'https://avatars3.githubusercontent.com/u/3725821?v=3&s=140',
      id            : 2,
      name          : 'Seyi',
      status        : 'online'
    },
    lastAccess: {
      recipient  : 1424469794050,
      currentUser: 1424469794080
    },
    messages  : [
      {
        contents : 'Init code push',
        from     : 2,
        timestamp: 1424469793023
      },
      {
        contents : 'Hey, what\'s up?',
        from     : 1,
        timestamp: 1424469794000
      }
    ]
  }
};

var openChatID = parseInt(Object.keys(messages)[0], 10);

var messagesStore = assign({}, EventEmitter.prototype, {
  addChangeListener   : function (callback) {
    this.on('change', callback);
  },
  removeChangeListener: function (callback) {
    this.off('change', callback);
  },
  getOpenChatUserID   : function () {
    return openChatID;
  },
  getChatByUserID     : function (id) {
    return messages[id];
  },
  getAll              : function () {
    return messages;
  }
});

messagesStore.dispatchToken = Dispatcher.register(function (payload) {
  var actions = {
    updateOpenChatID: function (payload) {
      openChatID = payload.action.userID;

      messagesStore.emit('change');
    },
    sendMessage     : function (payload) {
      var userID = payload.action.userID;

      messages[userID].messages.push({
        contents  : payload.ection.message,
        timestamp : payload.action.timestamp,
        from      : UserStore.user.id,
        lastAccess: {
          currentUser: +new Date()
        }
      });

      messagesStore.emit('change');
    }
  };

  actions[payload.action.type] && actions[payload.action.type](payload);
});
