'use strict';

exports.list_all_members = function(req, res) {
    req.sql("select * from testTable for json path")
         .into(res);
}

exports.read_a_member = function(req, res) {
    req.sql("select * from testTable where id = " + req.params.memberId + " for json path")
    .into(res);
}