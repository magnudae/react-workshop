var Flux = require('../flux/Flux.js');

/*
 * The store
 */
var _texts = [];


var Store = Flux.createStore({
    emitChange: function () {
      this.emit("CHANGE_EVENT");
    },

    addChangeListener: function (callback) {
      this.on("CHANGE_EVENT", callback);
    },

    removeChangeListener: function (callback) {
      this.removeListener("CHANGE_EVENT", callback);
    },

    getTexts: function () {
      return _texts;
    }
  },

  function (payload) {
    if(payload.actionType === "TEST_ACTION") {
      _texts.push(payload.text);

      Store.emitChange();
    }
  }
);

module.exports = Store;
