/*eslint-disable */
var express = require('express');

var app = express();
app.set('port', process.env.PORT);

app.get('*', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
