'use strict';
module.exports = function(app) {
  var rstCtrl = require('../controllers/rstController');


  // todoList Routes
  app.route('/restaurants')
    .get(rstCtrl.list_all_rst)
    .post(rstCtrl.create_a_rst);


  app.route('/login')
    .post(rstCtrl.log_in);

  app.route('/restaurants/:rstId')
    .get(rstCtrl.read_a_rst)
    .post(rstCtrl.update_a_rst);
};