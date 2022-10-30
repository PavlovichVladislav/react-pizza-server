const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
   email: { type: String, uniqe: true, required: true },
   phone: { type: String, required: true },
   name: { type: String, required: true },
   orderItems: [
      new Schema({
         title: { type: String, required: true },
         size: { type: String, required: true },
         dough: { type: String, required: true },
         image: { type: String, required: true },
         count: { type: String, required: true },
      }),
   ],
   isAccepted: { type: Boolean, default: false },
});

module.exports = model("order", OrderSchema);
