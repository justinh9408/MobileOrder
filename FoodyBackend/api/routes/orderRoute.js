'use strict';
module.exports = function(app) {
  var oCtrl = require('../controllers/orderController');


  // todoList Routes
  app.route('/orders')
    .post(oCtrl.create_a_order);

  app.route('/ordersByRst/:rstId')
    .get(oCtrl.list_all_orders_by_rst);

  app.route('/orderItemsByRst/:rstId')
    .get(oCtrl.list_all_order_items_by_rst);

  app.route('/ordersByUser/:userId')
    .get(oCtrl.list_all_orders_by_user);

  app.route('/orderItemsByUser/:userId')
    .get(oCtrl.list_all_order_items_by_user);

  app.route('/updateOrderStatus/:orderId/:statusId')
    .get(oCtrl.update_order_status);
};