'use strict';

const responseFunction = require('../../server').responseFunction;

exports.list_all_users = function(req, res) {
    req.sql.query("select * from users", (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.read_a_user = function(req, res) {
    req.sql.query("select * from users where id = ?", [req.params.userId],
    (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.create_a_user = function(req, res) {
    req.sql.query("insert into users (name, firstName, lastName, email, password, description) values (?, ?, ?, ?, ?, ?);",
    [req.body.name, req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.description],
    (err, data) => {
        if (err) {
            res.json(err);
        } else {
            req.sql.query("select * from users where id = ?",
            [data.insertId],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });
}

exports.update_a_user = function(req, res) {
    req.sql.query("update users set name=?, firstName=?, lastName=?, email=?, password=?, description=? where id = ?;",
    [req.body.name, req.body.firstName, req.body.lastName, req.body.email, req.body.password, req.body.description, req.params.userId],
    (err, data) => {
        if (err) {
            res.json(err);
        } else {
            req.sql.query("select * from users where id = ?",
            [req.params.userId],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });
}

exports.log_in = function(req, res) {
    req.sql.query("select id, name, firstName, lastName, email from users where name = ? and password = ?",
    [req.body.name, req.body.password], (err, data) => {
        responseFunction(res, err, data);
    });
}