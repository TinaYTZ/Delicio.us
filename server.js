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

//mongo DB
// Connect to the db
 // var MongoClient = mongodb.MongoClient;
 // MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
 //    if(!err) {
 //        console.log("We are connected");
 //    }
 //    else{console.log(err);}
 //    //db.createCollection('images', {strict:true}, function(err, collection) {});        
 //    var collection = db.collection('images');
 //    var stream = collection.find({'id':1}).stream();
 //    stream.on("data", function(item) {
 //        console.log(item);
 //        });
 //    stream.on("end", function() {});

 
  
     var MongoClient = mongodb.MongoClient;
     MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
    else{console.log(err);}
    //db.createCollection('images', {strict:true}, function(err, collection) {});        
    var collection = db.collection('images');
    var stream = collection.find({'id':1}).stream();
    stream.on("data", function(item) {
        console.log(item);
        });
    stream.on("end", function() {});
//mongodb insert
   //  collection.remove( );
   //  //Create some images l
   //  var img1 = {type: 'food', path:'/public/images/pizza1.jpg'};
   //  var img2 = {type: 'food', path:'/public/images/DearFood.jpg'};
   //  var img3 = {type: 'food', path:'/public/images/mexifod.jpg'};
   //  var img4 = {type: 'food', path:'/public/images/88762487_junk_food.jpg'};
   //  var img5 = {type: 'food', path:'/public/images/pexels-photo-119637-medium.jpeg'};
   //  var img6 = {type: 'food', path:'/public/images/pexels-photo-132694-medium.jpeg'};
   //  var img7 = {type: 'food', path:'/public/images/carrot-kale-walnuts-tomatoes-medium.jpg'};
   //  var img8 = {type: 'food', path:'/public/images/pexels-photo-139374-medium.jpeg'};
   //  var img9 = {type: 'food', path:'/public/images/cooking-ingredient-cuisine-kitchen-medium.jpg'};
   //  var img10 = {type: 'food', path:'/public/images/pexels-photo-179912-medium.jpeg'};
   //  var img11 = {type: 'food', path:'/public/images/food-chicken-meat-outdoors-medium.jpg'};
   //  var img12 = {type: 'food', path:'/public/images/pexels-photo-24859-medium.jpg'};
   //  var img13 = {type: 'food', path:'/public/images/food-dinner-lemon-rice-medium.jpg'};
   //  var img14 = {type: 'food', path:'/public/images/pexels-photo-27599-medium.jpg'};
   //  var img15 = {type: 'food', path:'/public/images/food-healthy-man-person-medium.jpeg'};
   //  var img16 = {type: 'food', path:'/public/images/pexels-photo-41123-medium.jpeg'};

   //  var img17 = {type: 'food', path:'/public/images/food-healthy-vegetables-potatoes-medium.jpg'};
   //  var img18 = {type: 'food', path:'/public/images/pexels-photo-59100-medium.jpeg'};
   //  var img19 = {type: 'food', path:'/public/images/food-kitchen-cutting-board-cooking-medium.jpg'};
   //  var img20 = {type: 'food', path:'/public/images/pexels-photo-62097-medium.jpeg'};
   //  var img21 = {type: 'food', path:'/public/images/food-pot-kitchen-cooking-medium.jpg'};
   //  var img22 = {type: 'food', path:'/public/images/pexels-photo-63943-medium.jpeg'};
   //  var img23 = {type: 'food', path:'/public/images/food-salad-healthy-lunch-medium.jpg'};
   //  var img24 = {type: 'food', path:'/public/images/pexels-photo-70497-medium.jpeg'};
   //  var img25 = {type: 'food', path:'/public/images/food-salad-healthy-vegetables-medium(1).jpg'};
   //  var img26 = {type: 'food', path:'/public/images/pexels-photo-76093-medium.jpeg'};
   //  var img27 = {type: 'food', path:'/public/images/food-salad-healthy-vegetables-medium.jpg'};
   //  var img28 = {type: 'food', path:'/public/images/pexels-photo-medium.jpg'};
   //  var img29 = {type: 'food', path:'/public/images/food-salad-restaurant-person-medium.jpg'};
   //  var img30 = {type: 'food', path:'/public/images/healthfitness.jpg'};
   //  var img31 = {type: 'food', path:'/public/images/salmon-dish-food-meal-46239-medium.jpeg'};
   //  var img32 = {type: 'food', path:'/public/images/potatoes-french-mourning-funny-162971-medium.jpeg'};
   //  var img33 = {type: 'food', path:'/public/images/muffin-medium.jpg '};
   //  var img34 = {type: 'food', path:'/public/images/tacos.jpeg'};
   //  var img35 = {type: 'food', path:'/public/images/vegetables-vegetable-basket-harvest-garden-medium.jpg'};
   //  var img36 = {type: 'food', path:'/public/images/pexels-photo-104987-medium.jpeg '};


   // // Insert some users
   // collection.insert([img1, img2, img3,img4,img5,img6,img7,img8,img9,img10,
   //                    img11, img12, img13,img14,img15,img16,img17,img18,img19,img20,
   //                    img21, img22, img23,img24,img25,img26,img27,img28,img29,img30,
   //                    img31, img32, img33,img34,img35,img36], function (err, result) {
   //    if (err) {
   //      console.log(err);
   //    } else {
   //      console.log('Inserted %d documents into the "images" collection. The documents inserted with "_id" are:', result.length, result);
   //   }

   //  }); 

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
 


  
      // //Close connection
      // db.close();
   });

 
 // Insert some users
  // var findfood=function(){
  //    collection.find({type: 'food'}).toArray(function (err, result) {
  //     if (err) {
  //       console.log(err);
  //     } else if (result.length) {
  //       console.log('Found:', result);
  //       return result;
  //     } else {
  //       console.log('No document(s) found with defined "find" criteria!');
  //     }
  // });
  
      // //Close connection
      // db.close();
   // };

    


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
}
    
});




app.post('/', upload.any(),function(req,res,next){
    console.log(req.files);
    res.json(req.files);
});

// app.post('/upload', upload.single('file'),function(req,res,next){
//     //console.log("data", req.);
//     var data = req.body;
//      //upload.any();
//     console.log(data);//[0]['path']);
//     //res.send(req.files);
// });


// app.post( "/upload",function(req,res){

//     var upload = multer({ storage : storage}).any(req.file);

//     upload(req,res,function(err) {
//         if(err) {
//             console.log(err);
//             return res.end("Error uploading file.");
//         }
//         res.end("File has been uploaded");

//     });
// });








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