var morgan = require('morgan');
var bodyParser = require('body-parser');
var compression = require('compression');
var express = require('express');
var cookieParser = require('cookie-parser');
var hbs = require('hbs');

var app = express();


app.set('json spaces', 2);

app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', hbs.__express);

app.use(compression());
app.use(express.static('./'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Set express routes
 */

app.get('/', function(req, res) {
  console.log("I am here");
  res.render('index', {
    bodyHtml: "Yippi the Metis application is up and running"
  })
});

app.get('/winning', function(req, res) {
  console.log("asdasd");
  res.send( {
    win: "Yippi the React Workshop application is up and running"
  })
});

module.exports = app;