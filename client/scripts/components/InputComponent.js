/** @jsx React.DOM */
var React = require('react');

var InputComponent = React.createClass({


  render: function() {
    return (
      <div>
        <textarea placeholder="Input here" />
      </div>
    );
  }

});

module.exports = InputComponent;
