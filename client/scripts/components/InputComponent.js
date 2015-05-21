/** @jsx React.DOM */
var React = require('react');
var xhr = require('../util/xhr.js');


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
      </div>
    );
  }

});

module.exports = InputComponent;
