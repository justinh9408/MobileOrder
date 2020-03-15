'use strict';

const responseFunction = require('../../server').responseFunction;

exports.read_a_mi = function(req, res) {
    req.sql.query("select * from menuItems where id = ? and isDeleted = 0",
    [req.params.miId], (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.delete_a_mi = function(req, res) {
    req.sql.query("update menuItems set isDeleted = 1 where id = ?",
    [req.params.miId], (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.create_a_mi = function(req, res) {
    req.sql.query("insert into menuItems (catID, name, description, imagePath, price) values (?, ?, ?, ?, ?);",
    [req.body.catID, req.body.name, req.body.description, req.body.imagePath, req.body.price], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            req.sql.query("select * from menuItems where id = ?",
            [data.insertId],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });

}

exports.update_a_mi = function(req, res) {
    req.sql.query("update menuItems set catID=?, name=?, description=?, imagePath=?, price=? where id = ?;",
    [req.body.catID, req.body.name, req.body.description, req.body.imagePath, req.body.price, req.params.miId],
    (err, data) => {
        if (err) {
            res.json(err);
        } else {
            req.sql.query("select * from menuItems where id = ?",
            [req.params.miId],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });
}

exports.list_all_cats_with_item = function(req, res) {
    req.sql.query("select i.* from menuCategories c left join menuItems i on c.id = i.catID where c.rstId = ? and i.isDeleted = 0 and c.isDeleted = 0",
    [req.params.rstId], (err, data) => {
        responseFunction(res, err, data);
    });
}