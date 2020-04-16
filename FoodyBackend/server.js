
// const express = require('@feathersjs/express');
// const feathers = require('@feathersjs/feathers');
const cors = require('cors');
var express = require('express');
const multer = require('multer');
const app = express();

var port = process.env.PORT || 3000;
var  bodyParser = require('body-parser');

const sql = require("./db/db.js");

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
  req.sql = sql;
  next();
});

exports.responseFunction = function(res, err, data) {
    if (err) {
        res.json(err);
    } else {
        res.json(data);
    }
}


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

    socket.on('submitOrder', (data) => {
        // build a event name based on the rst id submitted from the customer 
        let orderEvent = 'receiveOrder-' + data.rstId;
        console.log("Order submitted! Event name: " + orderEvent);
        // emit to the specific rst owner with the coresponding rstId
        io.emit(orderEvent, data);  
        socket.emit("addOrder",data);
    });

    socket.on('changeOrderStatus', (data) => {
        let event = 'orderStatusUpdate-' + data.userId;
        console.log("Order status update! Event name: " + event);
        io.emit(event, data);  
    });

});





console.log('todo list RESTful API server started on: ' + port);