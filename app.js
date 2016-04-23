/*global require*/
/*global __dirname*/
/*global console*/

var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    port = 5555
;

server.listen(port);

console.log('Server started and listening to port %d', port);

app.use(express.static(__dirname + '/dest'));

app.get('/', function AppRouteRoot(req, res) {
    res.sendFile(__dirname + '/index.html');
});
