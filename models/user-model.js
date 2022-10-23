const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
   email: { type: String, uniqe: true, required: true },
   password: { type: String, required: true },
   isActivated: { type: Boolean, default: false },
   activationLink: { type: String, required: true },
});

module.exports = model("user", UserSchema);
