const db = require("../utils/model");
const bcrypt = require("bcrypt");

const update = async (req, res) => {
  const data = await db.findOne({ _id: req.params.id });
  const { email, password, nama } = req.body;
  const validation = await bcrypt.compare(password, data.hashedPassword);
  const hashedPassword = await bcrypt.hash(password, 8);

  if (nama === data.nama) {
    db.updateOne(
      { id: req.params.id },
      {
        email: email,
        password: password,
        hashedPassword: hashedPassword,
      },
      (err) => {
        if (err) throw err;
        res.redirect("/home");
      }
    );
  } else if (email === data.email) {
    db.updateOne(
      { id: req.params.id },
      {
        nama: nama,
        password: password,
        hashedPassword: hashedPassword,
      },
      (err) => {
        if (err) throw err;
        res.redirect("/home");
      }
    );
  } else if (validation) {
    db.updateOne(
      { _id: req.params.id },
      {
        nama: nama,
        email: email,
      },
      (err, result) => {
        if (err) throw err;
        res.redirect("/home");
      }
    );
  } else {
    const hashedPassword = await bcrypt.hash(password, 8);
    db.updateOne(
      { _id: req.params.id },
      {
        nama: nama,
        email: email,
        password: password,
        hashedPassword: hashedPassword,
      },
      (err) => {
        if (err) throw err;
        res.redirect("/home");
      }
    );
  }
};

module.exports = update;
