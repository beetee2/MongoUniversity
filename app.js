var express = require('express'),
	app = express(),
	cons = require('consolidate'),
    Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    bodyParser = require('body-parser');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//app.set(app.router);

function errorHandler(err, req, res, next){
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	
	res.render(error_template, {error: err});
}

app.use(errorHandler);

/*
 app.route('/:name')
 .get(function(req, res){

 var name = req.params.name;
 var GetVar1 = req.query.getVar1;
 var GetVar2 = req.query.getVar2;
 res.render('hello', {name: name, getVar1: GetVar1, getVar2: GetVar2});
 });
*/
app.route('/fruits')
    .get(function(req,res, next){
        res.render("fruitPicker", {fruits: ["apple","orange","banana","peach"]});
    })
    .post(function(req, res, next){
        var favorite = req.body.fruit;
        if(favorite == undefined)
            next(Error('Please choose a fruit'));
        res.send("Your favorite fruit is: " + favorite);
    });

/*
app.get('/', function(req, res){

	Db.collection('things').findOne({}, function(err, doc){
		if(err) throw err;

		//console.dir(doc);
		res.render('hello',  doc );
	});
    
});
*/

app.get('*', function(req, res){
    res.status(404).send('Page Not Found');
});

var url = "mongodb://localhost:27017/test";

MongoClient.connect(url, function (err, db){
	if(err) throw err;

    Db = db;

	app.listen(8080);
	console.log('Express server started on port 8080');
});


