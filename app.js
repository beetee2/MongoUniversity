//var MongoClient = require("mongodb").MongoClient;
var express = require('express');

var app = express();

app.get('/', function(req, res){
	res.send("HelloWorld");	
});

app.get('*', function(req, res){
	res.send("Page not found", 404);	
});

app.listen(8080);
console.log("server started");


/*
MongoClient.connect('mongodb://localhost:27017/test', function(err, db){

	if(err) throw err;

	db.collection('things').findOne({}, function(err, doc){
		if(err) throw err;
		
		console.dir(doc);

		db.close();
	});

	//console.dir("called findOne");
});
*/