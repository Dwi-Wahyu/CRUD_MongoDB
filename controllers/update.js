const db = require("../utils/model");
const bcrypt = require("bcrypt");

const update = async (req, res) => {
  const { email, password, nama } = req.body;
  const data = await db.findOne({ email: req.params.email });
  const validation = await bcrypt.compare(password, data.hashedPassword);
  const hashedPassword = await bcrypt.hash(password, 8);

  if (email === data.email && nama === data.nama) {
    db.updateOne(
      { email: req.params.email },
      {
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
      { email: req.params.email },
      {
        nama: nama,
        email: email,
      },
      (err) => {
        if (err) throw err;
        res.redirect("/home");
      }
    );
  }

  // const checkEmail = await db.findOne({ email: email });
  // const checkPass = await db.findOne({ password: password });
  // const checkNama = await db.findOne({ nama: nama });

  // Penambahan validasi pada update user

  // var message = "";

  // if (
  //   nama === data.nama &&
  //   email === data.email &&
  //   password === data.password
  // ) {
  //   res.redirect("/home");
  // }

  // if (nama != data.nama && !validation && email != data.email) {
  //   if (checkEmail || checkNama || checkPass) {
  //     if (checkEmail) {
  //       message = `email ${message}`;
  //     }
  //     if (checkNama) {
  //       message = `nama ${message}`;
  //     }
  //     if (checkPass) {
  //       message = `pass ${message}`;
  //     }
  //     res.status(300).json({ status: "error", message: message });
  //   } else {
  //     db.updateOne(
  //       { email: req.params.email },
  //       {
  //         nama: nama,
  //         email: email,
  //         password: password,
  //         hashedPassword: hashedPassword,
  //       },
  //       (err) => {
  //         if (err) throw err;
  //         res.redirect("/home");
  //       }
  //     );
  //   }
  // }

  // if (nama != data.nama) {
  //   if (checkEmail || checkPass) {
  //     if (checkEmail) {
  //       message = `email ${message}`;
  //     }
  //     if (checkPass) {
  //       message = `pass ${message}`;
  //     }
  //     res.status(300).json({ status: "error", message: message });
  //   } else {
  //     db.updateOne(
  //       { email: req.params.email },
  //       {
  //         email: email,
  //         password: password,
  //         hashedPassword: hashedPassword,
  //       },
  //       (err) => {
  //         if (err) throw err;
  //         res.redirect("/home");
  //       }
  //     );
  //   }
  // }

  // if (
  //   nama === data.nama &&
  //   email === data.email &&
  //   password === data.password
  // ) {
  //   res.redirect("/home");
  // } else if (nama === data.nama) {
  //   if (checkEmail && checkPass) {
  //     res
  //       .status(300)
  //       .json({ status: "error", message: "Email dan Password sudah ada" });
  //   } else if (checkEmail) {
  //     res.status(300).json({ status: "error", message: "Email sudah ada" });
  //   } else if (checkPass) {
  //     res.status(300).json({ status: "error", message: "Password sudah ada" });
  //   } else {
  //     db.updateOne(
  //       { email: req.params.email },
  //       {
  //         email: email,
  //         password: password,
  //         hashedPassword: hashedPassword,
  //       },
  //       (err) => {
  //         if (err) throw err;
  //         res.redirect("/home");
  //       }
  //     );
  //   }
  // } else if (email === data.email) {
  //   if (checkNama && checkPass) {
  //     res
  //       .status(300)
  //       .json({ status: "error", message: "Nama dan Password sudah ada" });
  //   } else if (checkNama) {
  //     res.status(300).json({ status: "error", message: "Nama sudah ada" });
  //   } else if (checkPass) {
  //     res.status(300).json({ status: "error", message: "Password sudah ada" });
  //   } else {
  //     db.updateOne(
  //       { email: req.params.email },
  //       {
  //         nama: nama,
  //         password: password,
  //         hashedPassword: hashedPassword,
  //       },
  //       (err) => {
  //         if (err) throw err;
  //         res.redirect("/home");
  //       }
  //     );
  //   }
  // } else if (validation) {
  //   if (checkEmail && checkNama) {
  //     res
  //       .status(300)
  //       .json({ status: "error", message: "Email dan Nama sudah ada" });
  //   } else if (checkEmail) {
  //     res.status(300).json({ status: "error", message: "Email sudah ada" });
  //   } else if (checkNama) {
  //     res.status(300).json({ status: "error", message: "Nama sudah ada" });
  //   } else {
  //     db.updateOne(
  //       { email: req.params.email },
  //       {
  //         nama: nama,
  //         email: email,
  //       },
  //       (err, result) => {
  //         if (err) throw err;
  //         res.redirect("/home");
  //       }
  //     );
  //   }
  // } else {
  //   if (checkNama && checkEmail && checkPass) {
  //     res
  //       .status(300)
  //       .json({ status: "error", message: "Email, Nama, Password sudah ada" });
  //   } else if (checkNama) {
  //     res.status(300).json({ status: "error", message: "Nama sudah ada" });
  //   } else if (checkPass) {
  //     res.status(300).json({ status: "error", message: "Password sudah ada" });
  //   } else if (checkEmail) {
  //     res.status(300).json({ status: "error", message: "Email sudah ada" });
  //   } else {
  //     db.updateOne(
  //       { email: req.params.email },
  //       {
  //         nama: nama,
  //         email: email,
  //         password: password,
  //         hashedPassword: hashedPassword,
  //       },
  //       (err) => {
  //         if (err) throw err;
  //         res.redirect("/home");
  //       }
  //     );
  //   }
  // }
};

module.exports = update;
