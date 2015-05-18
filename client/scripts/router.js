/** @jsx React.DOM */
var director = require('director');
var React = require('react');
var MainComponent = require('./components/MainComponent');

var main = function() {
  React.render(
    <MainComponent />,
    document.body
  );
};


var routes = {
  '': main
};

var config = {
  notfound: main
};

var router = new director.Router(routes).configure(config);

module.exports = router;
