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
	res.render('error_template', {error: err});
}


app.use(errorHandler);

app.get('/', function(req, res){
    return res.render('hello');

});

app.route('/users')
    .get(function(req, res, next){
        var users = [];
        Db.collection('users').findOne(function(err, docs){

            res.status(200).json(docs);
        });


    })

    /*
    * .getById(function(req,res, next){
     var user = null;
     Db.collection('users').findOne({}, function(err, doc){
     user = doc;
     });
     res.json(200, { user: user});
     })*/
    .post(function(req, res, next){
        //var id = req.params.id;
        var user = req.body.user;
        Db.collection('users').insert(user, function(err, doc){
            console.log(doc);
        });
        res.send(200);
    })
    .put(function(req, res, next){
        var user = req.params.user;
        Db.collection('users').save(user, function(err, doc){
            console.log(doc);
        });
        res.send(200);
    })
    .delete(function(req, res, next) {
        var id = req.params.id;
        Db.collection('users').findOne({_id: id}, function (err, user) {
            console.log(user);
            Db.Collection('users').delete(user, function (err, res) {
                console.log(res)
            });
        })
        res.send(200);
    })


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


