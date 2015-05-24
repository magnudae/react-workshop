/** @jsx React.DOM */
var React = require('react');
var Actions = require('../actions/Actions.js');

var InputComponent = React.createClass({

  getInitialState: function(){
    return  {
      placeholder: "Input here"
    };
  },

  render: function() {
    return (
      <div>
        <textarea placeholder={this.state.placeholder} />
        <button onClick={this._onclick} >Text </button>
      </div>
    );
  },

  _onclick: function() {
    Actions.testAction("yeah");
  }

});

module.exports = InputComponent;
