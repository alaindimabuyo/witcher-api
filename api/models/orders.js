const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  product: { type: mongoose.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model("Orders", OrderSchema);
