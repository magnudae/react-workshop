/** @jsx React.DOM */
var React = require('react');
var xhr = require('../util/xhr.js');


var MainComponent = React.createClass({

  getInitialState: function(){
    return {
      win: "lost damn!"
    };
  },

  render: function() {
   xhr.get('http://localhost:3000/winning')
    .then(function(res) {
       console.log(res);
       this.setState({
         win: "WINNING"
       });
     });
   return (
     <div>
       <h1> YEAH BUDDY, I {this.state.win} </h1>
     </div>
   );
  }

});

module.exports = MainComponent;
