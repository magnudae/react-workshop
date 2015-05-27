/** @jsx React.DOM */
var React = require('react');


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
      </div>
    );
  }

};

module.exports = MainComponent;
