var db = require('../db');

var IFaceJixel = {

    
}
var IFaceDevelop = {
    
}
var IFaceLogin = {
    login: function(params, success, fail) {
        var errs = [];
        db.User.find(params, function(err, docs) {
            if(docs.length == 1) {
                success();
            } else {
                errs.push({name:'name', message: 'Invalid Login'});
                fail(errs);
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