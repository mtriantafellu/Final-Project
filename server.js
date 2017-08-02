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
    database: "finalProject_db" });

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


app.get("/tracker", function(req, res) {

    connection.query("SELECT * FROM userInfo;", function(err, data) {
        if (err) {
            throw err;
        }
        console.log('data', data);

        res.render("tracker", { userInfo: data });
    });
});

app.post("/login", function(req, res) {
    connection.query("INSERT INTO userInfo (loginEmail, loginPassword) VALUES (?, ?)", [
        req.body.loginEmail, req.body.loginPassword
    ], function(err, result) {
        if (err) {
            throw err;
        }

        res.redirect("/tracker");
    });
});

app.delete("/:id", function(req, res) {
    connection.query("DELETE FROM userInfo WHERE id = ?", [req.params.id], function(err, result) {
        if (err) {
            throw err;
        }
        res.redirect("/tracker");
    });
});

// Show the user the individual quote and the form to update the quote.
app.get(":id", function(req, res) {
    connection.query("SELECT * FROM userInfo WHERE id = ?", [req.params.id], function(err, data) {
        if (err) {
            throw err;
        }

        console.log(data);
        res.render("single-quote", data[0]);
    });
});

// Update a quote by an id and then redirect to the root route.
app.put("/:id", function(req, res) {
    connection.query("UPDATE userInfo SET userEmail = ?, userPassword = ? WHERE id = ?", [
        req.body.loginEmail, req.body.loginPassword, req.params.id
    ], function(err, result) {
        if (err) {
            throw err;
        }

        res.redirect("/tracker");
    });
});

app.listen(port);