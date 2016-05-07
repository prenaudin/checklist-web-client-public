/*eslint-disable */
var express = require('express');
var proxy = require('express-http-proxy');
var path = require('path');
var compression = require('compression');

var app = express();
app.set('port', process.env.PORT || 5001);

app.use(compression());
app.use(express.static('public'));

// Proxy API requests
var API_ENDPOINT = 'https://checklist-web-api.herokuapp.com';
app.use('/api', proxy(API_ENDPOINT, {
  forwardPath: function(req, res) {
    return '/api' + require('url').parse(req.url).path;
  }
}));
app.use('/public', proxy(API_ENDPOINT, {
  forwardPath: function(req, res) {
    return '/public' + require('url').parse(req.url).path;
  }
}));

app.get('*',  function(req, res) {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
