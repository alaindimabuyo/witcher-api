const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  book: { type: String, required: true },
  pages: { type: Number, required: true },
  sypnosis: { type: String, required: true },
  author: { type: String, default: "Andrzej Sapkowski" },
  published: { type: Number, required: true },
  bookImage: { type: String, required: true }
});

module.exports = mongoose.model("Books", BookSchema);
