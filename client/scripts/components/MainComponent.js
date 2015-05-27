/** @jsx React.DOM */
var React = require('react');

var InputComponent = require('./InputComponent');
var Store = require('../stores/Store.js');

var MainComponent = React.createClass({

  getInitialState: function () {
    return {
      win: "lost damn!",
      texts: Store.getTexts()
    };
  },

  componentDidMount: function () {
    var self = this;

    Store.addChangeListener(function () {
        self.setState({
          text: Store.getTexts()
        })
      }
    );
  },

  render: function () {
    var $paragraphs = this.state.texts.map(function (text, index) {
      return (
        <p key={index}>{text}</p>
      );
    });

    return (
      <div>
        <h1> YEAH BUDDY, I {this.state.win} </h1>

        <InputComponent />

        {$paragraphs}
      </div>
    );
  }

});

module.exports = MainComponent;
