var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/course", function (err, db){
	if(err) throw err;

    function callback(err, docs){
        if(err) throw err;
        console.dir(docs);
    }

    var query  = { };
    var projection = {title: 1, domain:1, _id:0};
    var sort = {domain:1}
    var cursor = db.collection('technology').find(query, projection);

    cursor.sort(sort);
    cursor.skip(0);
    cursor.limit(5);

    cursor.toArray(callback);
});


