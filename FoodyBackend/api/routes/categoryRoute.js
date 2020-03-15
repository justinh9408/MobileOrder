'use strict';
module.exports = function(app) {
  var catCtrl = require('../controllers/categoryController');


  // todoList Routes
  app.route('/categories')
    .get(catCtrl.list_all_cats)
    .post(catCtrl.create_a_cat);

  app.route('/categories/:catId')
    .get(catCtrl.read_a_cat)
    .post(catCtrl.update_a_cat)
    .delete(catCtrl.delete_a_cat);
};