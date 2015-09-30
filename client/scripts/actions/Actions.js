var Flux = require('../flux/Flux.js');

var Actions = Flux.createActions({
  testAction: function(text) {
    return {
      actionType: 'TEST_ACTION',
      text: text
    }
  },

  addTodo: function(todo) {
    return {
      actionType: "ADD_TODO",
      todo: todo
    };
  }
});

module.exports = Actions;
