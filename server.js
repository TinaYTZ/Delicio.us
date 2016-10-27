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




users=[];
connections=[];
images=[];


server.listen(process.env.PORT || 3000);
console.log('server running...');
app.use(express.static('./'));
app.get('/', function(req,res){
    res.sendFile(__dirname+'/public/index.html'); 
});

  
    var MongoClient = mongodb.MongoClient;
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
    else{console.log(err);}
   // db.createCollection('images', {strict:true}, function(err, collection) {});    

    var collection = db.collection('images');
     collection.find({type: 'food'}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
        images= result;
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }

  });
 


  
    
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
        updateImage();

    });


   // io.sockets.emit('images',images);

    function updateUsernames(){
        io.sockets.emit('get users',users);
    }

   function updateImage(){
    socket.emit('images', images);

    app.post('/', upload.any(), function(req,res,next){
        console.log(req.files);
        var path = req.files[0].path;
        console.log('path:', path);
        io.emit('new image', path);
       // res.json(req.files);
    });


}
    
});



