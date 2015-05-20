/** @jsx React.DOM */
var React = require('react');
var xhr = require('../util/xhr.js');


var MainComponent = React.createClass({

  getInitialState: function(){
    return {
      win: "lost damn!",
      done: false
    };
  },

  render: function() {
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
     </div>
   );
  }

});

module.exports = MainComponent;
