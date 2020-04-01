'use strict';
const upload = require('../../server').upload;
module.exports = function(app) {
  var fileCtrl = require('../controllers/fileController');


  // todoList Routes
  app.route('/menuitemimage/:id')
    .get(fileCtrl.get_menu_item_image)
    .post(upload.single('menuItemImage'), fileCtrl.save_menu_item_image);

  app.route('/rstimage/:id')
    .get(fileCtrl.get_rst_image)
    .post(upload.single('rstImage'), fileCtrl.save_rst_image);

  app.route('/logo')
    .get(fileCtrl.get_logo);
};