var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var port = 3000;

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "trialFinal" });

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);

});

// Root get route.
app.get("/", function(req, res) {

        res.render("index");

});

app.get("/login", function(req, res) {

    connection.query("SELECT * FROM userInfo;", function(err, data) {
        if (err) {
            throw err;
        }
        console.log('data', data);

        res.render("login", { userInfo: data });
    });
});

/*
// Post route -> back to home
app.post("/", function(req, res) {

    connection.query("INSERT INTO wishes (wish) VALUES (?)", [req.body.wish], function(err, result) {
        if (err) {
            throw err;
        }

        res.redirect("/");
    });

});
*/
app.listen(port);