/** @jsx React.DOM */
var director = require('director');
var React = require('react');
var MainComponent = require('components/MainComponent');

var woopApp = function(channel = 'all') {
  ChannelActions.change(channel);
  React.render(
  <MainComponent />
  );
};


var routes = {
  '': woopApp
};


var router = new director.Router(routes).configure(config);

module.exports = router;
