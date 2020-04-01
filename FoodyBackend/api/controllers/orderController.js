'use strict';

const responseFunction = require('../../server').responseFunction;

exports.create_a_order = function(req, res) {
    req.sql.query("insert into orders (rstID, userID) values (?, ?);",
    [req.body.rstId, req.body.userId], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            let itemValueArr = [[]];
            const items = req.body.items;
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                const itemValue = [data.insertId, item.id, item.amount];
                itemValueArr[0].push(itemValue);
            }
            req.sql.query("insert into orderItems (orderID, menuItemID, amount) values ?",
            itemValueArr, (err2, data2) => {
                if (err2) {
                    res.json(err2);
                } else {
                    req.sql.query("select * from orders where id = ?",
                    [data.insertId],
                    (err3, data3) => {
                        responseFunction(res, err3, data3);
                    })
                }
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