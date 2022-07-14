const db = require("../utils/model");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  db.findOne({ email: email }, async (err, result) => {
    if (err) throw err;
    if (!result) {
      res.status(400).json({
        status: "errorEmail",
        message: "Tidak ada user dengan email tersebut",
      });
    } else {
      const validation = await bcrypt.compare(password, result.hashedPassword);
      if (!validation) {
        res
          .status(300)
          .json({ status: "error", message: "Password anda salah" });
      } else {
        req.session.user = result;
        res.status(200).json({ status: "success", message: "Berhasil login" });
      }
    }
  });
};

module.exports = login;
