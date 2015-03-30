var MongoClient = require("mongodb").MongoClient;

console.log('not started')

MongoClient.connect('mongodb://localhost:27017/test', function(err, db){
	console.log('connected');

	if(err) throw err;

	db.collection('things').findOne({}, function(err, doc){
		if(err) throw err;
		
		console.dir(doc);

		db.close();
	});

	console.dir("called findOne");
});

