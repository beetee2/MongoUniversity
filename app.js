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

app.route('/courses')
    .get(function(req, res, next){

        /*
        * var query = {'grade': 100};
         function callback(err, doc) {
         if(err) throw err;

         console.dir(doc);

         Db.close();
         }
         Db.collection('grades').find(query, callback);
         Db.collection('grades').find(query).toArray(callback);*/
        /*
         Db.collection('grades').findOne(query, function(err, docs){
         if(err) throw err;

         console.log(docs)
         //res.status(200).json(docs);
         Db.close();
         });
         * */

        /*
        * Db.collection('grades').find(query).toArray(function(err, docs){
        * if(err) throw err;
         console.log(docs);
         Db.close();
         });*/

        /*
        * var cursor = Db.collection('grades').find(query);
         cursor.each(function(err, doc){
         if(err) throw err;
         if(doc == null) return Db.close();

         console.dir(doc);
         });
        * */
     })
    .post(function(req, res, next){
        //var id = req.params.id;
        var user = req.body.user;
        Db.collection('users').insert(user, function(err, doc){
            console.log(doc);
        });
        res.send(200);
    })
    .put(function(req, res, next){
        //upsert
        var user = req.params.user;
        Db.collection('users').save(user, function(err, doc){
            console.log(doc);
        });
        res.send(200);
    })
    .delete(function(req, res, next) {
        //upsert
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

var url = "mongodb://localhost:27017/course";
MongoClient.connect(url, function (err, db){
	if(err) throw err;

    Db = db;

	app.listen(8080);
	console.log('Express server started on port 8080');
});


