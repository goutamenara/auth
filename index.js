const express = require('express')
const app = express()
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config')
const port = 3000
const passport = require('passport')

const sqlite3 = require('sqlite3')
// create database and table
let db = new sqlite3.Database(config.sqlite.path, (err) => { 
    if (err) { 
        console.log('Error when creating the database', err) 
    }
    else{
        db.run("CREATE TABLE IF NOT EXISTS Users(id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT, token TEXT createdAt DATETIME, updatedAt DATETIME)");
    }
})

app.use(helmet());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/json" }) );
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(passport.initialize())
app.use(require('./routes'));



var server = app.listen(port, () => {
	console.log('Listening on port ' + server.address().port);
});
