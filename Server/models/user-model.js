// User的model
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const { required } = require("joi");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 50,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    // user身份 - 要改
    default: "member",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// instance method
userSchema.methods.isStuden = function () {
  return this.role == "member";
};

/* userSchema.methods.isStuden = function () {
  return this.role == "instructor";
}; */

// 透過bcrypt來確應這個password跟資料庫的password是否一樣
userSchema.methods.comparePassword = async function (password, cb) {
  let result;
  try {
    result = await bcrypt.compare(password, this.password);
    return cb(null, result);
  } catch (e) {
    // 如password正確， result就會是true，錯誤就是false
    return cb(e, result);
  }
};

// mongoose middlewares
// 如user是新用戶，或是更改密碼，則將密碼進行雜湊(hash)處理
userSchema.pre("save", async function (next) {
  // this 代表mongoDB內的文件
  if (this.isNew || this.isModified("password")) {
    const hashValue = await bcrypt.hash(this.password, 10);
    this.password = hashValue;
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
