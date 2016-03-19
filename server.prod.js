/*eslint-disable */
var express = require('express');
var path = require('path');
var compression = require('compression');

var app = express();
app.set('port', process.env.PORT || 5001);

app.use(compression());
app.use(express.static('public'));
app.get('*',  function(req, res) {
  return res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
