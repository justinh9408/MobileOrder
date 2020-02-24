'use strict';

const TYPES = require('tedious').TYPES;

exports.list_all_cats = function(req, res) {
    req.sql("select * from menuCategories where rstId = @rstId and isDeleted = 0 for json path")
         .param('rstID', req.query.rstId, TYPES.Int)
         .into(res);
}

exports.read_a_cat = function(req, res) {
    req.sql("select * from menuCategories where id = " + req.params.catId + " for json path")
    .into(res);
}

exports.delete_a_cat = function(req, res) {
    req.sql("update menuCategories set isDeleted = 1 where id = " + req.params.catId
    +"; update menuItems set isDeleted = 1 where catID = " + req.params.catId)
    .into(res);
}

exports.create_a_cat = function(req, res) {
    req.sql("insert into menuCategories (rstID, name, description) values (@rstID, @name, @description)"
    + "SELECT * FROM menuCategories where id = IDENT_CURRENT('menuCategories') for json path")
    .param('rstID', req.body.rstID, TYPES.Int)
    .param('name', req.body.name, TYPES.NVarChar)
    .param('description', req.body.description, TYPES.NVarChar)
    .into(res);
}

exports.update_a_cat = function(req, res) {
    req.sql("update menuCategories set rstID = @rstID, name = @name, description = @description where id = @catID;"
    + "select * from menuCategories where id = @catID for json path")
    .param('rstID', req.body.rstID, TYPES.Int)
    .param('name', req.body.name, TYPES.NVarChar)
    .param('description', req.body.description, TYPES.NVarChar)
    .param('catID', req.params.catId, TYPES.Int)
    .into(res);
}