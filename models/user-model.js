const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
   email: { type: String, uniqe: true, required: true },
   password: { type: String, required: true },
   name: { type: String, required: true },
   surname: { type: String, required: true },
   phone: { type: String, required: true },
   date: { type: String },
   isActivated: { type: Boolean, default: false },
   activationLink: { type: String, required: true },
});

module.exports = model("user", UserSchema);
