/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions/Actions.js');

var InputComponent = React.createClass({


  render: function() {
    return (
      <div>
        <textarea placeholder="Input here" />
        <button onClick={this._onclick} >Text </button>
      </div>
    );
  },

  _onclick: function() {
    Actions.testAction("yeah");
  }

});

module.exports = InputComponent;
