var connect = require('connect'),
    dnode = require('dnode'),
    config = require('./config'),
    iface = require('./interface');
    
var server = connect.createServer();
server.use(connect.static(__dirname+'/static'));
dnode(function(client) {
    this.ready = function(ready) {
        ready(iface.IFaceLogin);
    };
}).listen(server);
server.listen(404);


