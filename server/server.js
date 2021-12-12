const express = require("express");
//export for testing
const app = exports.app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require('cookie-session');

const db = require("../helper/db.js");
const { hash, compare } = require("../helper/bc.js");


// const { requireLoggedIn, requireNotSigned } = require("../middleware/authorization.js");
const { authRouter } = require("./routers/auth-router.js");

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));


//The express.json() function is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.
app.use(express.json());


//Makes the body elements from the post request readble
app.use(express.urlencoded({
    extended: false
}));

const COOKIE_SECRET = process.env.COOKIE_SECRET || require("../.secrets.json").COOKIE_SECRET;

//Enables session cookies
app.use(cookieSession({
    secret: COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    // Security protect against Cross- site request forgeries(CSRF):
    sameSite: true
}));

//Security protects against clickjacking/ website being loaded as an iframe
app.use((req, res, next) => {
    res.setHeader("x-frame-options", "deny");
    next();
});


//Get information about the routes while developing
app.use((req, res, next) => {
    console.log(`${req.method}|${req.url}`);
    next();
});

app.use(authRouter);
// ---------------------------------End Middleware-------------------------





app.get('/user/id.json', function (req, res) {
    res.json({
        userId: req.session.userId
    });
});


//last possible route . sends allways back index.html


app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
