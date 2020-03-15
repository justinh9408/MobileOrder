'use strict';

const responseFunction = require('../../server').responseFunction;

exports.list_all_cats = function(req, res) {
    req.sql.query("select * from menuCategories where rstId = ? and isDeleted=0",
    [req.query.rstId],
    (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.read_a_cat = function(req, res) {
    req.sql.query("select * from menuCategories where id = ?", [req.params.catId],
    (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.delete_a_cat = function(req, res) {
    req.sql.query("update menuCategories set isDeleted = 1 where id = " + req.params.catId
    +"; update menuItems set isDeleted = 1 where catID = " + req.params.catId)
    .into(res);
    req.sql.query("update menuCategories set isDeleted = 1 where id = ?; update menuItems set isDeleted = 1 where catID = ?;",
    [req.params.catId, req.params.catId], (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.create_a_cat = function(req, res) {
    req.sql.query("insert into menuCategories (rstID, name, description) values (?, ?, ?)",
    [req.body.rstID, req.body.name, req.body.description], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            req.sql.query("select * from menuCategories where id = ?",
            [data.insertId],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });
}

exports.update_a_cat = function(req, res) {
    req.sql.query("update menuCategories set rstID = ?, name = ?, description = ? where id = ?;",
    [req.body.rstID, req.body.name, req.body.description, req.params.catId],
    (err, data) => {
        if (err) {
            res.json(err);
        } else {
            req.sql.query("select * from menuCategories where id = ?",
            [req.params.catId],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });
}