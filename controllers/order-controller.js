const orderService = require("../service/order-service.js");

class OrderController {
   async makeOrder(req, res, next) {
      try {
         const { email, phone, name, orderItems } = req.body;

         const orderData = await orderService.makeOrder(
            email,
            phone,
            name,
            orderItems
         );

         return res.json(orderData);
      } catch (e) {
         next(e);
      }
   }

   async acceptOrder(req, res, next) {
      try {
         const { id } = req.body;

         const orderData = await orderService.acceptOrder(id);

         return res.json(orderData);
      } catch (e) {
         next(e);
      }
   }

   async getAllOrders(req, res, next) {
      try {
         let orders = await orderService.getAllOrders();

         orders = orders.filter((order) => order.isAccepted === false);

         return res.json(orders);
      } catch (e) {
         next(e);
      }
   }

   async getUserOrders(req, res, next) {
      try {
         const { email } = req.body;

         const userOrders = await orderService.getUserOrders(email);

         return res.json(userOrders);
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new OrderController();
