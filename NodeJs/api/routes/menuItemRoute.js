'use strict';
module.exports = function(app) {
  var miCtrl = require('../controllers/menuItemController');


  // todoList Routes
  app.route('/menuitems')
    .post(miCtrl.create_a_mi);

  app.route('/menuitems/:miId')
    .get(miCtrl.read_a_mi)
    .post(miCtrl.update_a_mi)
    .delete(miCtrl.delete_a_mi);

  app.route('/categorieswithitem/:rstId')
    .get(miCtrl.list_all_cats_with_item);
};