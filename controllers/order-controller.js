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
         const { email } = req.body;

         const orderData = await orderService.acceptOrder(email);

         return res.json(orderData);
      } catch (e) {
         next(e);
      }
   }

   async getAllOrders(req, res, next) {
      try {
      } catch (e) {
         next(e);
      }
   }

   async getUserOrders(req, res, next) {
      try {
      } catch (e) {
         next(e);
      }
   }
}

module.exports = new OrderController();
