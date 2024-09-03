const router = require("express").Router();
const Post = require("../models").post;

router.use((req, res, next) => {
  console.log("search route正在接受一個request...");
  next();
});

// 獲得系統中的所有文章 (5)
router.get("/", async (req, res) => {
  // 用.populate找到poster的資料 注意.exec要放在.populate後面
  try {
    let postFound = await Post.find({})
      .populate("poster", ["username", "email"])
      .exec();
    return res.send(postFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 用名稱尋找的功能 (2-5)
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let postFound = await Post.find({ title: name })
      .populate("poster", ["email", "usename"])
      .exec();
    return res.send(postFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
