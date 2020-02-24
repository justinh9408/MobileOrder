'use strict';
module.exports = function(app) {
  var userCtrl = require('../controllers/userController');


  // todoList Routes
  app.route('/users')
    .get(userCtrl.list_all_users)
    .post(userCtrl.create_a_user);

  app.route('/usrlogin')
    .post(userCtrl.log_in);

  app.route('/users/:userId')
    .get(userCtrl.read_a_user)
    .post(userCtrl.update_a_user);
};