console.log('Monkey Says: Hello There. Lets build a Express API.Nath é incrível namorada ');

// Server JS - Express APP
// Used to create a small goals app

// Setup and Configuration
var express = require('express'),
	app = express(),
	port = Number(process.env.port || 8080);

// Setup Body-Parser

var bodyParser = require('body-parser');
app.use(bodyParser.json());

// To parse form data:
app.use(bodyParser.urlencoded({
  extended: true
}));

// Database

var Datastore = require('nedb');
var db = new Datastore({
	filename: 'goals.db',
	autoload: true,
	timestampData: true
});

// CRUD and API Operations

app.get('/goals', function(req, res){
	db.find({}).sort({
		updatedAt: -1
	}).exec(function(err, goals){
		if(err) res.send(err);
		res.json(goals);
	});
});

// Routes

app.get('/', function(req, res){
	res.send('Monkey Reponds: This is your index. Monkey is sad. Really sad. Not that good right? </br> Yep. Not that good. ');
});

// Start the Server

app.listen(port, function(){
	console.log('Monkey is Listening on '+port);
});

