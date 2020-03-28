'use strict';

const responseFunction = require('../../server').responseFunction;

exports.create_a_order = function(req, res) {
    req.sql.query("insert into orders (rstID, userID) values (?, ?);",
    [req.body.rstID, req.body.userID], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            // req.sql.query("insert into orderItems (orderID, menuItemID, amount) values ?",
            // [[[1, 1, 1], [1, 1, 1]]])
            req.sql.query("select * from orders where id = ?",
            [data.insertId],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });

}

exports.list_all_orders_by_rst = function(req, res) {
    req.sql.query("select * from orders where rstID = ?",
    [req.params.rstId], (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.list_all_orders_by_user = function(req, res) {
    req.sql.query("select * from orders where userID = ?",
    [req.params.userId], (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.list_all_order_items_by_rst = function(req, res) {
    req.sql.query("select i.*, m.name, m.price from orders o left join orderItems i on o.id = i.orderID left join menuItems m on i.menuItemID = m.id where o.rstId = ? and i.isDeleted = 0",
    [req.params.rstId], (err, data) => {
        responseFunction(res, err, data);
    });
}

exports.list_all_order_items_by_user = function(req, res) {
    req.sql.query("select i.*, m.name, m.price from orders o left join orderItems i on o.id = i.orderID left join menuItems m on i.menuItemID = m.id where o.userID = ? and i.isDeleted = 0",
    [req.params.userId], (err, data) => {
        responseFunction(res, err, data);
    });
}