const mongoose = require("mongoose");

const characterSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  race: {
    type: String,
    required: true
  },
  profession: {
    type: String,
    required: true
  },
  abilities: {
    type: String
  },
  nationality: {
    type: String,
    required: true
  },
  characterImage: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Characters", characterSchema);
