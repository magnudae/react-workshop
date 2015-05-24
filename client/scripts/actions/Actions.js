var Flux = require('../flux/Flux.js');

var Actions = Flux.createActions({
  testAction: function(text) {
    return {
      actionType: 'TEST_ACTION',
      text: text
    }
  }
});

module.exports = Actions;
