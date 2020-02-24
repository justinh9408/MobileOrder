'use strict';
const fs = require('fs');
const path = require('path');
const UPLOAD_PATH = require('../../server').UPLOAD_PATH;
const TYPES = require('tedious').TYPES;

exports.save_menu_item_image = function(req, res) {
    req.sql("update menuItems set imagePath=@imagePath where id = @miID;"
    + "select * from menuItems where id = @miID for json path")
    .param('miID', req.params.id, TYPES.Int)
    .param('imagePath', '/menuitemimage/' + req.params.id, TYPES.NVarChar)
    .into(res);
}

exports.get_menu_item_image = function(req, res) {
    res.setHeader('Content-Type', 'image/jpeg');
    fs.createReadStream(path.join(UPLOAD_PATH, 'menuItemImage-' + req.params.id)).pipe(res)
    .on('error', function (error) {
        res.status(404)
            .send('Not found');});
}

exports.save_rst_image = function(req, res) {
    req.sql("update restaurants set imagePath=@imagePath where id = @rstID;"
    + "select * from restaurants where id = @rstID for json path")
    .param('rstID', req.params.id, TYPES.Int)
    .param('imagePath', '/rstimage/' + req.params.id, TYPES.NVarChar)
    .into(res);
}

exports.get_rst_image = function(req, res) {
    res.setHeader('Content-Type', 'image/jpeg');
    fs.createReadStream(path.join(UPLOAD_PATH, 'rstImage-' + req.params.id)).pipe(res)
    .on('error', function (error) {
        res.status(404)
            .send('Not found');});
}
