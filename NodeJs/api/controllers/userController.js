'use strict';

exports.list_all_users = function(req, res) {
    req.sql("select * from users for json path")
         .into(res);
}

exports.read_a_user = function(req, res) {
    req.sql("select * from users where id = " + req.params.userId + " for json path")
    .into(res);
}

exports.create_a_user = function(req, res) {
    req.sql("insert into users (name, firstName, lastName, email, password) values ('" + req.body.name + "', '" + req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.email + "', '" + req.body.password + "')")
    .into(res);
}

exports.update_a_user = function(req, res) {
    var des = req.body.description
    // .replace(/'/g, "''");
    req.sql("update users set description = '" + des + "' where id = " + req.params.userId )
    .into(res);
}

exports.log_in = function(req, res) {
    req.sql("select id, name, firstName, lastName, email from users where name = '" + req.body.name + "' and password = '" + req.body.password + "' for json path")
    .into(res);
}