/** @jsx React.DOM */
var React = require('react');

var InputComponent = require('./InputComponent');
var Store = require('../stores/Store.js');

class MainComponent extends React.Component{

  constructor(props){
    this.state =  {
      win: "lost damn!",
      text: []
    };
  }

  componentDidMount() {
    Store.addChangeListener(() => {
      this.setState({
        text: Store.getText()
      })
    });
  }

  render() {
    var texts = '';
    this.state.text.forEach((text) => {
      texts += text + " : ";
    });

    return (
      <div>
        <h1> YEAH BUDDY, I {this.state.win} </h1>
        <InputComponent />
        <p> {texts} </p>
      </div>
    );
  }

};

module.exports = MainComponent;
