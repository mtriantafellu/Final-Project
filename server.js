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



// Start google OAuth
function handleClientLoad() {
    // Loads the client library and the auth2 library together for efficiency.
    // Loading the auth2 library is optional here since `gapi.client.init` function will load
    // it if not already loaded. Loading it upfront can save one network request.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // Initialize the client with API key and People API, and initialize OAuth with an
    // OAuth 2.0 client ID and scopes (space delimited string) to request access.
    gapi.client.init({
        apiKey: '796891676929-g4e698mi71q6p1vos9usb3dj39u7n9jj.apps.googleusercontent.com',
        discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
        clientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
        scope: 'profile'
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function updateSigninStatus(isSignedIn) {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
        makeApiCall();
    }
}

function handleSignInClick(event) {
    // Ideally the button should only show up after gapi.client.init finishes, so that this
    // handler won't be called before OAuth is initialized.
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function makeApiCall() {
    // Make an API call to the People API, and print the user's given name.
    gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.names'
    }).then(function(response) {
        console.log('Hello, ' + response.result.names[0].givenName);
    }, function(reason) {
        console.log('Error: ' + reason.result.error.message);
    });
}
//End google OAuth


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

        res.redirect("/login");
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