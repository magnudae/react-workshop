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
        <textarea placeholder={this.state.placeholder} />
      </div>
    );
  }

});

module.exports = InputComponent;
