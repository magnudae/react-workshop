/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions/Actions.js');

var InputComponent = React.createClass({

  render: function() {
    return (
      <div>
        <textarea placeholder="Input here" />
        <button onClick={this._onClick}>Text</button>
      </div>
    );
  },

  _onClick: function() {
    Actions.testAction("yeah");
  }

});

module.exports = InputComponent;
