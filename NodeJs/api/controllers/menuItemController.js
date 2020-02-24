'use strict';

const TYPES = require('tedious').TYPES;

exports.read_a_mi = function(req, res) {
    req.sql("select * from menuItems where id = " + req.params.miId + " for json path")
    .into(res);
}

exports.delete_a_mi = function(req, res) {
    req.sql("update menuItems set isDeleted = 1 where id = " + req.params.miId)
    .into(res);
}

exports.create_a_mi = function(req, res) {
    req.sql("insert into menuItems (catID, name, description, imagePath, price) values (@catID, @name, @description, @imagePath, @price);"
    + "SELECT * FROM menuItems where id = IDENT_CURRENT('menuItems') for json path")
    .param('catID', req.body.catID, TYPES.Int)
    .param('name', req.body.name, TYPES.NVarChar)
    .param('description', req.body.description, TYPES.NVarChar)
    .param('imagePath', req.body.imagePath, TYPES.NVarChar)
    .param('price', req.body.price, TYPES.Float)
    .into(res);
}

exports.update_a_mi = function(req, res) {
    req.sql("update menuItems set catID = @catID, name = @name, description = @description, imagePath=@imagePath, price=@price where id = @miID;"
    + "select * from menuItems where id = @miID for json path")
    .param('catID', req.body.catID, TYPES.Int)
    .param('name', req.body.name, TYPES.NVarChar)
    .param('description', req.body.description, TYPES.NVarChar)
    .param('miID', req.params.miId, TYPES.Int)
    .param('imagePath', req.body.imagePath, TYPES.NVarChar)
    .param('price', req.body.price, TYPES.Float)
    .into(res);
}

exports.list_all_cats_with_item = function(req, res) {
    req.sql("select i.* from menuCategories c left join menuItems i on c.id = i.catID where c.rstId = @rstId and i.isDeleted = 0 and c.isDeleted = 0 for json path")
         .param('rstId', req.params.rstId, TYPES.Int)
         .into(res);
}