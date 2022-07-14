const db = require("../utils/model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { nama, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  const checkEmail = await db.findOne({ email: email });
  const checkNama = await db.findOne({ nama: nama });
  const checkPassword = await db.findOne({ password: password });

  var errMessage = "";

  if (!checkEmail && !checkNama && !checkPassword) {
    db.create({
      nama: nama,
      email: email,
      password: password,
      hashedPassword: hashedPassword,
    })
      .then((hasil) => {
        res
          .status(300)
          .json({ status: "success", message: "Berhasil menambahkan Data" });
      })
      .catch((err) => {
        res.status(500).json({ status: "error", message: "Terjadi Error" });
      });
  } else {
    if (checkNama) {
      errMessage = `${errMessage} nama`;
    }
    if (checkEmail) {
      errMessage = `${errMessage} email`;
    }
    if (checkPassword) {
      errMessage = `${errMessage} password`;
    }

    console.log(errMessage);

    res.status(300).json({
      status: "error",
      message: errMessage,
    });
  }
};

module.exports = register;
