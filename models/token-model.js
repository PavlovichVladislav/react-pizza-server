const { Schema, model } = require("mongoose");

const TokenSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: "User" }, // ссылка на пользователя
   refreshToken: { type: String, required: true }, // refresh token
});

module.exports = model("token", TokenSchema);
