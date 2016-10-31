
// Server-side code
/* jshint node: true, curly: true, eqeqeq: true, forin: true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: single, undef: true, unused: true, strict: true, trailing: true */

'use strict';
var express=require('express');
var app = express();
var server= require('http').createServer(app);
var io=require('socket.io').listen(server);
var multer= require('multer'),
    storage=multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, './public/images/');
        },
        filename:function (req,file,cb){
            cb(null,Date.now()+file.originalname);
        }             
    });

var upload=multer({storage:storage});
var mongodb = require('mongodb');

var MongoClient = mongodb.MongoClient;
var id;

var db, collection;

var users=[];
var connections=[];
var images=[];
var cfood=[];
var kfood=[];
var jfood=[];

MongoClient.connect('mongodb://localhost:27017/exampleDb', function(err, database){
            if(!err) {
                console.log('We are connected');
                db=database;
                collection = db.collection('images');
                collection.find({}).toArray(function (err, result) {
                if (err) {
                console.log(err);
                } else if (result.length) {
                console.log('Found:', result);
                images= result;
                } else {
                console.log('No document(s) found with defined "find" criteria!');
                }
                });
            }
            else{console.log(err);} 
});






server.listen(process.env.PORT || 3000);
console.log('server running...');
app.use(express.static('./'));
app.get('/', function(req,res){
    res.sendFile(__dirname+'/public/index.html'); 
});

  
    var MongoClient = mongodb.MongoClient;
    MongoClient.connect('mongodb://localhost:27017/exampleDb', function(err, db) {
    if(!err) {
        console.log('We are connected');
    }
    else{console.log(err);}
   // db.createCollection('images', {strict:true}, function(err, collection) {});    


 


  
    
   });
app.get('/allPic',  function(req,res){
    //res.sendFile(__dirname+'/public/index.html');

     collection.find({}).toArray(function (err, result) {
                if (err) {
                console.log(err);
                } else if (result.length) {
                console.log('Found:', result);
                images= result;
                res.json(images);
                } else {
                console.log('No document(s) found with defined "find" criteria!');
                }
                });
});
   

app.get('/ChinesePic',  function(req,res){
    //res.sendFile(__dirname+'/public/index.html');

     collection.find({'type':'Chinese'}).toArray(function (err, result) {
                if (err) {
                console.log(err);
                } else if (result.length) {
                console.log('Found:', result);
                cfood= result;
                res.json(cfood);
                } else {
                console.log('No document(s) found with defined "find" criteria!');
                }
                });    
});
   
app.get('/JapanesePic',  function(req,res){
    //res.sendFile(__dirname+'/public/index.html');

     collection.find({'type':'Japanese'}).toArray(function (err, result) {
                if (err) {
                console.log(err);
                } else if (result.length) {
                console.log('Found:', result);
                jfood= result;
                res.json(jfood);
                } else {
                console.log('No document(s) found with defined "find" criteria!');
                }
                });
});

app.get('/koreanPic',  function(req,res){
    //res.sendFile(__dirname+'/public/index.html');

     collection.find({'type':'Korean'}).toArray(function (err, result) {
                if (err) {
                console.log(err);
                } else if (result.length) {
                console.log('Found:', result);
                kfood= result;
                res.json(kfood);
                } else {
                console.log('No document(s) found with defined "find" criteria!');
                }
                });
});

 
io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('connected: %s sockets connected', connections.length);

    function updateUsernames(){
        io.sockets.emit('get users',users);
    }

   function updateImage(){
    socket.emit('images', images);

    app.post('/', upload.any(), function(req){
        console.log(req.files);
        var path = req.files[0].path;
        console.log('path:', path);
        io.emit('new image', path);
       // res.json(req.files);
    });


}
    //discounnect
    socket.on('disconnect', function(){
        //if(! socket.username)return;
        users.splice(users.indexOf(socket.username),1);
        connections.splice(connections.indexOf(socket),1);
        console.log('Disconnected: %s sockets',connections.length) ;

    });
   

    //new user
    socket.on('new user',function(data,callback){
        callback(true);
        socket.username= data;
        users.push(socket.username);
        updateUsernames();
        updateImage();

    });


   // io.sockets.emit('images',images);

    
});



