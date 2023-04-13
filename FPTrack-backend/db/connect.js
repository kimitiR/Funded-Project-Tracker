//Set up mongoose connection
var mongoose = require('mongoose');

var mongoDB = 'mongodb+srv://raphaelkimiti:Dzx4mm7JCffHugm1@cluster0.xyqgpco.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
