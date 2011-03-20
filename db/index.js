var mongoose = require('mongoose'),
    config = require('../config'),
    models = require('./models')
    Schema = mongoose.Schema;
    
    
var db = mongoose.connect(config.db);
mongoose.model('User', new Schema(models.User));

module.exports = {
    User: mongoose.model('User')
}
