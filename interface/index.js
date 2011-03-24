var db = require('../db'),
    fs = require('fs');

var IFaceJixel = {
    get: function(success, fail) {
        fs.readFile('../templates/default.js', function(err, data) {
           if(err) fail(err);
           else success(data);
        });
    }
}
var IFaceDevelop = {
    woo: function(){}
}
var IFaceLogin = {
    login: function(params, success, fail) {
        var errs = [];
        db.User.find(params, function(err, docs) {
            if(docs.length == 1) {
                success(IFaceDevelop);
            } else {
                fail({message: 'Invalid Login'});
            }
        });
    },
    create: function(params, success, fail) {
        var errs = [];
        db.User.find({name:params.name}, function(err, docs) {
            if(docs.length > 0) {
                errs.push({name:'name', message:'Your name was taken :('});
                fail(errs);
            } else {
                db.User.find({email:params.email}, function(err, docs){
                    if(docs.length > 0) {
                        errs.push({name:'email', message:'Hey! That email is already registered!'});
                        fail(errs);
                    } else {
                        new db.User(params).save();
                        success();
                    }
                });
            }
        });
    }
};

module.exports = {
    IFaceLogin: IFaceLogin,
    IFaceDevelop: IFaceDevelop
}