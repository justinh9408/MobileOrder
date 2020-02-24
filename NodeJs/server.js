
// const express = require('@feathersjs/express');
// const feathers = require('@feathersjs/feathers');
const cors = require('cors');
var express = require('express');
const multer = require('multer');
const app = express();

var port = process.env.PORT || 3000;
var  bodyParser = require('body-parser');

var tediousExpress = require('express4-tedious');

var connection =
{
    authentication: {
        options: {
            userName: 'yellowfish', // update me
            password: 'Haojie......' // update me
        },
        type: 'default'
    },
    server: 'littleyellowfish.database.windows.net', // update me
    options:
    {
        database: 'littleYellowFish', //update me
        encrypt: true
    }
};

exports.UPLOAD_PATH = 'uploads';

// Multer Settings for file upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + req.params.id)
    }
})
exports.upload = multer({ storage: storage });
// multer({ dest: 'uploads/' });
// multer({ storage: storage })

// app.use(cors);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log(req.query)
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Pass to next layer of middleware
    next();
});

app.use(function (req, res, next) {
  req.sql = tediousExpress(connection);
  next();
});


var api_config = require('./api/index.js');
api_config(app);


var http = require('http').Server(app);
var server = app.listen(port);
var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    socket.join('room1');   

    console.log('user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('add-message', (data) => {
        console.log("add-message： " + data.items[0].name + " " + data.type)
        io.emit('message', {type:'new-message', items: data.items});  
    });
});





console.log('todo list RESTful API server started on: ' + port);