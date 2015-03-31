var express = require('express'),
	app = express(),
	cons = require('consolidate'),
    Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;



app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');




app.get('/', function(req, res){

	Db.collection('things').findOne({}, function(err, doc){
		if(err) throw err;

		//console.dir(doc);
		res.render('hello',  doc );
	});
    
});

app.get('*', function(req, res){
    res.send('Page Not Found', 404);
});

var url = "mongodb://localhost:27017/test";
MongoClient.connect(url, function (err, db){
	
	if(err) throw err;

    Db = db;

	app.listen(8080);
	console.log('Express server started on port 8080');
});


