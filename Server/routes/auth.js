const router = require("express").Router();
// 用Validation.js的註冊和登入
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").user;
//使用JWT套件
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("正在接收一個跟auth有關的請求");
  next();
});

router.get("/testAPI", (req, res) => {
  return res.send("成功連結auth route...");
});

//註冊的報錯
router.post("/register", async (req, res) => {
  //註冊數據是否符合條件
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否已註冊
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("此信箱已經被註冊過...");

  //製作新用戶
  let { email, username, password, role } = req.body;
  let newUser = new User({ email, username, password, role });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "使用者成功儲存",
      savedUser,
    });
  } catch (e) {
    return res.status(500).send("無法儲存使用者");
  }
});

// login的報錯
router.post("/login", async (req, res) => {
  //login數據是否符合條件
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 確認信箱是否已存在資料庫
  const foundUser = await User.findOne({ email: req.body.email });
  if (!foundUser)
    return res.status(401).send("無法找到使用者，請確定信箱是否正確...");

  foundUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) return res.status(500).send(err);

    if (isMatch) {
      // 製作json web token
      const tokenObject = { _id: foundUser._id, email: foundUser.email };
      const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);
      return res.send({
        message: "成功登入",
        token: "JWT " + token,
        user: foundUser,
      });
    } else {
      return res.status(401).send("密碼錯誤");
    }
  });
});

module.exports = router;
