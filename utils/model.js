const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  email: String,
  password: String,
  hashedPassword: String,
  nama: String,
});

const model = mongoose.model("users", schema);

module.exports = model;
