require("dotenv").config();

const mongoose = require("mongoose");

// const url = "mongodb://127.0.0.1:27017/user";
// const url = `mongodb+srv://${process.env.dbUsername}:${process.env.dbPassword}@cluster0.jpu1d.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;
const url = process.env.MONGODB_URI;

function connectDB() {
  mongoose.connect(url, (err) => {
    if (err) throw err;
    console.log("Terkoneksi");
  });
}

module.exports = connectDB;
