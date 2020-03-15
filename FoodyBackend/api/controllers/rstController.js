'use strict';

const responseFunction = require('../../server').responseFunction;

exports.list_all_rst = function(req, res) {
    req.sql.query("select * from restaurants", (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.read_a_rst = function(req, res) {
    req.sql.query("select * from restaurants where id = ?", [req.params.rstId],
    (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.create_a_rst = function(req, res) {
    req.sql.query("insert into restaurants (name, email, password) values (?, ?, ?);",
    [req.body.name, req.body.email, req.body.password],
    (err, data) => {
        if (err) {
            res.json(err);
        } else {
            req.sql.query("select * from restaurants where id = ?",
            [data.insertId],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });
}

exports.update_a_rst = function(req, res) {
    req.sql.query("update restaurants set name = ?, description = ?, imagePath=? where id = ?;",
    [req.body.name, req.body.description, req.body.imagePath, req.params.rstId],
    (err, data) => {
        if (err) {
            res.json(err);
        } else {
            req.sql.query("select * from restaurants where id = ?",
            [req.params.rstId],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });
}

exports.log_in = function(req, res) { 
    req.sql.query("select id, name, email from restaurants where name = ? and password = ?", 
    [req.body.name, req.body.password],
    (err, data) => {
        responseFunction(res, err, data);
    });
      
}