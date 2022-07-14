require("dotenv").config();

const express = require("express");
const app = express();
const dbConnect = require("./utils/db");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");

dbConnect();

// Controllers route
const register = require("./controllers/register");
const update = require("./controllers/update");
const remove = require("./controllers/delete");
const login = require("./controllers/login");

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", "./public/views");

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// Accessing static files
app.use("/", require("./routes/page"));
app.use("/js", express.static("public/js"));
app.use("/css", express.static("public/css"));
app.use("/img", express.static("public/img"));

// Route for CRUD operation
app.get("/api/delete/:email", remove);
app.post("/api/register", register);
app.post("/api/update/:id", update);
app.post("/api/login", login);

app.listen(8080);
