console.log('Monkey Says: Hello There. Lets build a Express API. Im hungry.');

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

// Get all goals
app.get('/goals', function(req, res){
	db.find({}).sort({
		updatedAt: -1
	}).exec(function(err, goals){
		if(err) res.send(err);
		res.json(goals);
	});
});

// Get a Post via ID
app.get('/goals/:id', function(req, res){
	var goalId = req.params.id;
	db.findOne({
		_id: goalId,
	}, {}, function(err, goal){
		if(err) res.send(err);
		res.json(goal);
	});
	

});

// Add a Goal via POST
app.post('/goals', function(req, res){
	var goal = {
		description : req.body.description,
	};
	db.insert(goal, function(err, newGoal){
		if(err) console.log(err);
		var str = JSON.stringify(req.body);
		console.log('This is Req.Body: '+str);
		res.json(goal);
	});
});

// Delete a Post
app.delete('/goals/:id', function(req, res){
	var goalId = req.params.id;
	db.remove({
		_id: goalId
	}, {}, function(err, goal){
		if(err) console.log(err);
		res.sendStatus(200);
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

