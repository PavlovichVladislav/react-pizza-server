const OrderModel = require("../models/order-model");
const ApiError = require("../exceptions/api-error");

class OrderService {
   async makeOrder(email, phone, name, orderItems) {
      const order = await OrderModel.create({
         email,
         phone,
         name,
         orderItems,
         isAccepted: false,
      });

      return order;
   }

   async acceptOrder(email) {
      const order = await OrderModel.findOne({ email });

      if (!order) {
         throw ApiError.BadRequest("Заказ отсутствует в базе данных");
      } else if (order.isAccepted) {
         throw ApiError.BadRequest("Заказ уже принят");
      }

      order.isAccepted = true;
      await order.save();

      return order;
   }
}

module.exports = new OrderService();
