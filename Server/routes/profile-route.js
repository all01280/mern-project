const router = require("express").Router();
const userValidation = require("../validation").userValidation;
const User = require("../models").user;

// 更改用戶資料 (名字)
router.patch("/:_id", async (req, res) => {
  // 驗證是否符合Validation的要求
  let { error } = userValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  // 確認是否存在
  try {
    let userFound = await User.findOne({ _id });
    if (!userFound) {
      return res.status(400).send("Cannot find user");
    }
    // 需要是此帳號的用戶才能編輯個人資料
    if (userFound._id.equals(req.user._id)) {
      let updatedProfile = await User.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        message: "更新成功",
        updatedProfile,
      });
    } else {
      return res.status(403).send("只有此帳號的用戶才能編輯個人資料。");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
