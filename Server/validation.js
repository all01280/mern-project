// 使用Joi套件 用於驗證
const Joi = require("joi");

// 註冊帳號的驗證
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),

    //role: Joi.string().required().valid("student", "instructor"),
  });

  return schema.validate(data);
};

// 更新用戶資料的驗證
const userValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(data);
};

// 登入的驗證
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(50).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return schema.validate(data);
};

// 開文章的驗證
const postValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().min(5).max(400).required(),
    //price: Joi.number().min(1).max(999999).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.userValidation = userValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;
