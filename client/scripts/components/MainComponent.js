/** @jsx React.DOM */
var React = require('react');

var InputComponent = require('./InputComponent');

class MainComponent extends React.Component{

  constructor(props){
    this.state =  {
      win: "lost damn!",
      text: []
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <h1> YEAH BUDDY, I {this.state.win} </h1>
        <InputComponent />
      </div>
    );
  }

};

module.exports = MainComponent;
