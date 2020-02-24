'use strict';
module.exports = function(app) {
  var memberCtrl = require('../controllers/memberController');


  // todoList Routes
  app.route('/members')
    .get(memberCtrl.list_all_members);
    // .post(memberCtrl.create_a_member);

  app.route('/members/:memberId')
    .get(memberCtrl.read_a_member);
};