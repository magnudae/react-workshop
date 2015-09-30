var Flux = require('../flux/Flux.js');

var _text = [];
var _todoList = [];

var Store = Flux.createStore({

  emitChange: function() {
    this.emit("CHANGE_EVENT");
  },

  addChangeListener: function(callback) {
    this.on("CHANGE_EVENT", callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener("CHANGE_EVENT", callback);
  },

  getText: function(){
    return _text;
  },
  getTodos: function() {
    return _todoList;
  }
}, function(payload){
  if(payload.actionType === "TEST_ACTION") {
    _text.push(payload.text);
   Store.emitChange();
  }
  else if( payload.actionType === "ADD_TODO") {
    _todoList.push(payload.todo);
    Store.emitChange();
  }
});

module.exports = Store;
