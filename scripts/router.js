/** @jsx React.DOM */
var director = require('director');
var React = require('react');

var woopApp = function(channel = 'all') {
  ChannelActions.change(channel);
  React.render(
  <h1> dette funkær</h1>
  );
};


var routes = {
  '': woopApp
};


var router = new director.Router(routes).configure(config);

module.exports = router;
