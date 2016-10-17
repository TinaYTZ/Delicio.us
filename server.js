/*jslint maxlen: 130 */
'use strict';
var express = require('express'),
    http = require('http'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    multer= require('multer'),
    storage=multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, './public/images/');
        },
        filename:function (req,file,cb){
            cb(null,Date.now()+file.originalname);
        }             
    }),
    upload=multer({storage:storage}),
    app;

app = express();
app.use(morgan('dev'));
app.use(bodyParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('./'));

http.createServer(app).listen(3000);


// create application/x-www-form-urlencoded parser 

// Retrieve
var MongoClient = require('mongodb').MongoClient;


app.get('/', function(req, res) {   
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
    else{console.log(err);}
    db.createCollection('images', {strict:true}, function(err, collection) {});    
    var collection = db.collection('images');
    var stream = collection.find({'id':1}).stream();
    stream.on("data", function(item) {
        console.log(item);
        });
    stream.on("end", function() {});


});
    res.sendFile(__dirname + '/public/index.html');
   // res.json({'a':1,'b':2});
});
app.post('/',upload.any(),function(req,res,next){
    console.log(req.files);
    res.send(req.files);
});


/*app.post('/sum', function(req, res) {

    console.log(req.body);
    var string = req.body.numbers;
    var nums = string.split(' ').map(Number);
    console.log('request', string, nums);

    var result = sum(nums);
    console.log(result);
    res.send('sum:' + result);
});


*/

app.get('/index.html', function(req, res) {
    res.send('<html><head></head><body>djfhdjskfjdhskfjdjsfjsdjfdsjj</body></html>');
});

app.get('/hello', function(req, res) {
    res.send('hello world');
});

app.get('/goodbye', function(req, res) {
    res.send('goodbye');
});