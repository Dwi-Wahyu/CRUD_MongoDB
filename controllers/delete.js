const express = require("express");
const router = express.Router();
const db = require("../utils/model");

const hapus = (req, res) => {
  const { email } = req.params;
  db.deleteOne({ email }, (err, result) => {
    if (err) throw err;
    res.redirect("/home");
  });
};

module.exports = hapus;
