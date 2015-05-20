/** @jsx React.DOM */
var React = require('react');

var InputComponent = require('./InputComponent');
var xhr = require('../util/xhr.js');


class MainComponent extends React.Component{

  constructor(props){
    this.state =  {
      win: "lost damn!",
      done: false
    };
  }

  render() {
    if(!this.state.done) {
      xhr.get('http://localhost:3000/winning ')
        .then((res) => {
          this.setState({
            win: res.win,
            done: true
          });
        });
    }
   return (
     <div>
       <h1> YEAH BUDDY, I {this.state.win} </h1>
       <InputComponent />
     </div>
   );
  }

};

module.exports = MainComponent;
