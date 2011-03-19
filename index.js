var connect = require('connect'),
    dnode = require('dnode'),
    mongoose = require('mongoose'),
    config = require('./config'),
    models = require('./models'),
    Schema = mongoose.Schema;
    
var db = mongoose.connect(config.db);
mongoose.model('User', new Schema(models.User));
var User = mongoose.model('User');
var server = connect.createServer();
server.use(connect.static(__dirname+'/static'));

dnode(function(client) {
    this.ready = function(ready) {
        var interface = {
            login: function(params, callback) {
                
            },
            create: function(params, success, fail) {
                var errs = [];
                console.log(User.find({name:params.name}));
                User.find({name:params.name}, function(err, docs) {
                    if(docs.length > 0) {
                        errs.push({name:'name', message:'Your name was taken :('});
                        fail(errs);
                    } else {
                        User.find({email:params.email}, function(err, docs){
                            if(docs.length > 0) {
                                errs.push({name:'email', message:'Hey! That email is already registered!'});
                                fail(errs);
                            } else {
                                new User(params).save();
                                success();
                            }
                        });
                    }
                });
            }
        };
        ready(interface);
    };
    
}).listen(server);
server.listen(404);
