const express = require("express");
const router = express.Router();
const model = require("../utils/model");

const homeAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    next();
  } else {
    res.redirect("/");
  }
};

const loginAuth = (req, res, next) => {
  if (req.session.isAuthenticated) {
    res.redirect("/home");
  } else {
    next();
  }
};

router.get("/", loginAuth, (req, res) => {
  res.sendFile("login.html", { root: "./public/views" });
});

router.get("/register", loginAuth, (req, res) => {
  res.sendFile("register.html", { root: "./public/views" });
});

router.get("/home", homeAuth, (req, res) => {
  model.find().then((data) => {
    res.render("home", { data: data });
  });
});

router.get("/update/:email", (req, res) => {
  model.findOne({ email: req.params.email }).then((result) => {
    res.render("update", { user: result });
  });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = router;
