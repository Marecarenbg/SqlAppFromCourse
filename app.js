var express = require('express');
var mysql  = require("mysql");
var bodyParser = require("body-parser");

var app    = express();


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));


var connection = mysql.createConnection ({
    host: "Localhost",
    user: "marecare",
    database: "join_us"
});


app.get("/", function(req, res){
        //find count of users in db
        var q = "SELECT COUNT(*) AS count FROM users";
     connection.query(q, function(err, results){
        if (err) throw err;
       var count = results[0].count;
           //respond with that count
    // res.send("Wee have " + count + " users in our db");
        res.render("home",{data: count});
     });
});

app.post('/register', function(req,res){
 var person = {email: req.body.email};
 connection.query('INSERT INTO users SET ?', person, function(err, result) {
 console.log(err);
 console.log(result);
 res.redirect("/");
 });
});

app.get("/joke", function(req, res){

    var joke = "fucking joke???";
    res.send(joke);
});

app.get("/random_number", function (req, res){
   var num = Math.floor(Math.random()* 10);
    res.send("Your lucku number is " + num);
});

app.listen(8080, function(){
    console.log("server running on 8080!");
});