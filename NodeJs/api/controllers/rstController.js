'use strict';

const TYPES = require('tedious').TYPES;

exports.list_all_rst = function(req, res) {
    req.sql("select * from restaurants for json path")
         .into(res);
}

exports.read_a_rst = function(req, res) {
    req.sql("select * from restaurants where id = " + req.params.rstId + " for json path")
    .into(res);
}

exports.create_a_rst = function(req, res) {

    console.log(req.body.name)  
    req.sql("insert into restaurants (name, email, password) values (@name, @email, @password);"
    + "SELECT * FROM restaurants where id = IDENT_CURRENT('restaurants') for json path")
    .param('name', req.body.name, TYPES.NVarChar)
    .param('email', req.body.email, TYPES.NVarChar)
    .param('password', req.body.password, TYPES.NVarChar)
    .into(res);
}

exports.update_a_rst = function(req, res) {
    req.sql("update restaurants set name = @name, description = @description, imagePath=@imagePath where id = @rstID;"
    + "select * from restaurants where id = @rstID for json path")
    .param('name', req.body.name, TYPES.NVarChar)
    .param('description', req.body.description, TYPES.NVarChar)
    .param('rstID', req.params.rstId, TYPES.Int)
    .param('imagePath', req.body.imagePath, TYPES.NVarChar)
    .into(res);
}

exports.log_in = function(req, res) { 
    req.sql("select id, name, email from restaurants where name = '" + req.body.name + "' and password = '" + req.body.password + "' for json path")
    .into(res);
      
}