/** @jsx React.DOM */
var React = require('react');
var Store = require('../stores/Store');
var Actions = require('../actions/Actions');

var MainComponent = React.createClass({

  getInitialState: function() {
    return {
      todos: []
    };
  },

  componentDidMount:function() {
    Store.addChangeListener(function() {
      this.setState({
        todos: Store.getTodos()
      });
    }.bind(this))
  },

  _onClick: function() {
    Actions.addTodo("Gå hjem");
  },

  render: function() {
    var imageUrl = "http://bit.ly/1LLyRHM";
    var $todosList = this.state.todos.map(function(todo) {
      return <li>{todo}</li>
    });
    return (
      <div>
      {$todosList}
        <button onClick={this._onClick}>add todo </button>
      </div>
    );
  }

});

module.exports = MainComponent;
