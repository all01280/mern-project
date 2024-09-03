const router = require("express").Router();
const Post = require("../models").post;
const postValidation = require("../validation").postValidation;

router.use((req, res, next) => {
  console.log("post route正在接受一個request...");
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

// 用發文者id來尋找文章 (2-4)
router.get("/poster/:_poster_id", async (req, res) => {
  let { _poster_id } = req.params;
  let postFound = await Post.find({ poster: _poster_id })
    .populate("poster", ["username", "email"])
    .exec();
  return res.send(postFound);
});

// 用戶id來尋找關注過的文章 (2-4)
router.get("/viewer/:_viewer_id", async (req, res) => {
  let { _viewer_id } = req.params;
  let postFound = await Post.find({ viewer: _viewer_id })
    .populate("poster", ["username", "email"])
    .exec();
  return res.send(postFound);
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

// 用id尋找文章 (5)
router.get("/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    let postFound = await Post.findOne({ _id })
      .populate("poster", ["email"])
      .exec();
    return res.send(postFound);
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 有了jwt後 (4)
// 新增文章功能
router.post("/", async (req, res) => {
  // 驗證數據
  let { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  /*   if (req.user.isStudent()) {
    return res.status(400).send("只有講師才能發佈新文章");
  } */

  let { title, description } = req.body;
  try {
    let newPost = new Post({
      title,
      description,
      poster: req.user._id,
    });
    let savedPost = await newPost.save();
    return res.send({ message: "已經保存", savedPost });
  } catch (e) {
    return res.status(500).send("無法創建文章");
  }
});

router.post("/list/:_id", async (req, res) => {
  let { _id } = req.params;
  try {
    // 查找文章
    let post = await Post.findOne({ _id }).exec();

    // 檢查文章是否存在
    if (!post) {
      return res.status(404).send("文章未找到");
    }

    // 檢查用戶是否已經關注該文章
    if (post.viewer.includes(req.user._id)) {
      return res.status(400).send("您已經關注過此文章");
    }

    // 如果未註冊，則將學生添加到文章中
    post.viewer.push(req.user._id);
    await post.save();
    res.send("註冊完成");
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 更改文章(5)
router.patch("/:_id", async (req, res) => {
  // 驗證是否符合Validation的要求
  let { error } = postValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  // 確認是否存在
  try {
    let postFound = await Post.findOne({ _id });
    if (!postFound) {
      return res.status(400).send("Can not found");
    }

    // 需要是此文章的講師，才能編輯文章
    if (postFound.poster.equals(req.user._id)) {
      let updatedPost = await Post.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.send({
        message: "更新成功",
        updatedPost,
      });
    } else {
      return res.status(403).send("只有此文章的poster才能編輯文章。");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

// 刪除文章(5)
router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  // 確認是否存在
  try {
    let postFound = await Post.findOne({ _id }).exec();
    if (!postFound) {
      return res.status(400).send("無法刪除文章");
    }

    // 需要是此文章的講師，才能刪除文章
    if (postFound.poster.equals(req.user._id)) {
      await Post.deleteOne({ _id }).exec();
      return res.send("文章已被刪除");
    } else {
      return res.status(403).send("只有此文章的poster才能刪除文章。");
    }
  } catch (e) {
    return res.status(500).send(e);
  }
});

module.exports = router;
