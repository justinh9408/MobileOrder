'use strict';
const fs = require('fs');
const path = require('path');
const UPLOAD_PATH = require('../../server').UPLOAD_PATH;

const responseFunction = require('../../server').responseFunction

exports.save_menu_item_image = function(req, res) {
    req.sql.query("update menuItems set imagePath=? where id = ?;",
    ['/menuitemimage/' + req.params.id, req.params.id],
    (err, data) => {
        if (err) {
            res.json(err);
        } else {
            req.sql.query("select * from menuItems where id = ?",
            [req.params.id],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });
}

exports.get_menu_item_image = function(req, res) {
    res.setHeader('Content-Type', 'image/jpeg');
    fs.createReadStream(path.join(UPLOAD_PATH, 'menuItemImage-' + req.params.id)).pipe(res)
    .on('error', function (error) {
        res.status(404)
            .send('Not found');});
}

exports.save_rst_image = function(req, res) {
    req.sql.query("update restaurants set imagePath=? where id = ?;",
    ['/rstimage/' + req.params.id, req.params.id],
    (err, data) => {
        if (err) {
            res.json(err);
        } else {
            req.sql.query("select * from restaurants where id = ?",
            [req.params.id],
            (err2, data2) => {
                responseFunction(res, err2, data2);
            })
        }
    });
}

exports.get_rst_image = function(req, res) {
    res.setHeader('Content-Type', 'image/jpeg');
    fs.createReadStream(path.join(UPLOAD_PATH, 'rstImage-' + req.params.id)).pipe(res)
    .on('error', function (error) {
        res.status(404)
            .send('Not found');});
}

exports.get_logo = function(req, res) {
    res.setHeader('Content-Type', 'image/jpeg');
    fs.createReadStream(path.join(UPLOAD_PATH, 'logo.png')).pipe(res)
    .on('error', function (error) {
        res.status(404)
            .send('Not found');});
}
