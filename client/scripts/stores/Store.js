var Flux = require('../flux/Flux.js');

var _text = [];

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
  }
}, function(payload){
  if(payload.actionType === "TEST_ACTION") {
    _text.push(payload.text);
   Store.emitChange();
  }
});

module.exports = Store;
