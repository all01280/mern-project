// 連接所有套件 express mongoose dotenv
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
// 套用Routes
const authRoute = require("./routes").auth;
const postRoute = require("./routes").post;
const searchRoute = require("./routes").search;
const profileRoute = require("./routes").profile;
// 套用passport
const passport = require("passport");
require("./config/passport")(passport);
// 套用cors
const cors = require("cors");

const port = process.env.PORT || 8080;

// 連結MongoDB
mongoose
  .connect("mongodb://localhost:27017/mernDB")
  /*   .connect(process.env.MONGODB_CONNECTION) */
  .then(() => {
    console.log("連結到mongodb...");
  })
  .catch((e) => {
    console.log(e);
  });

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/user", authRoute);

// post route應該被jwt保護
// 如果request header內部沒有jwt，則request就會被視為是unauthorized
// 只有登入系統的人，才能夠使用的功能
app.use(
  "/api/post",
  passport.authenticate("jwt", { session: false }),
  postRoute
);

app.use("/api/search", searchRoute);

app.use(
  "/api/profile",
  passport.authenticate("jwt", { session: false }),
  profileRoute
);

// React已經用了3000，別重複
app.listen(port, () => {
  console.log("server listen port 8080");
});
