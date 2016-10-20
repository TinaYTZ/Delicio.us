var express=require('express');
var app = express();
var server= require('http').createServer(app);
var io=require('socket.io').listen(server);
users=[];
connections=[];

server.listen(process.env.PORT || 3000);
console.log('server running...');
app.use(express.static('./'));
app.get('/', function(req,res){
    res.sendFile(__dirname+'/public/index.html'); 
});

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('connected: %s sockets connected', connections.length);

    //discounnect
    socket.on('disconnect', function(data){
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
    })

    function updateUsernames(){
        io.sockets.emit('get users',users);
    }



});


/*
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


var bodyParser = require('body-parser');
var morgan = require('morgan');
var multer= require('multer');
var storage=multer.diskStorage({
        destination: function(req,file,cb){
            cb(null, './public/images/');
        },
        filename:function (req,file,cb){
            cb(null,Date.now()+file.originalname);
        }             
    });
var upload=multer({storage:storage});





var express=require('express');
var app = express();
var server= require('http').createServer(app);
var sio= require('socket.io');


server.listen(process.env.PORT || 3000, function(){
  console.log('listening on port :3000');
});

var io=sio.listen(server);

var bodyParser = require('body-parser'),
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
    upload=multer({storage:storage});

users=[];
connections=[];

//socket.io

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('connected: %s sockets connected', connections.length);

    //discounnect
    socket.on('disconnect', function(data){
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
    });

    function updateUsernames(){
        io.sockets.emit('get users',users);
    }



});



app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(express.static('./'));



// create application/x-www-form-urlencoded parser 

// Retrieve
var MongoClient = require('mongodb').MongoClient;


app.get('/', function(req, res) {   
    // Connect to the db
   /* MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
    else{console.log(err);}
    db.createCollection('images', {strict:true}, function(err, collection) {});    
    var collection = db.collection('images');
    var stream = collection.find({'id':1}).stream();
    stream.on("data", function(item) {
        //console.log(item);
        });
    stream.on("end", function() {});


});
    res.sendFile(__dirname + '/public/index.html');
});


app.post('/',upload.any(),function(req,res,next){
    console.log(req.files);
    res.send(req.files);
});




app.get('/index.html', function(req, res) {
    res.send('<html><head></head><body>djfhdjskfjdhskfjdjsfjsdjfdsjj</body></html>');
});

app.get('/hello', function(req, res) {
    res.send('hello world');
});

app.get('/goodbye', function(req, res) {
    res.send('goodbye');
});
*/