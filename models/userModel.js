const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String, default: "regular"
  },
  date_created: {
    type: Date, default: Date.now()
  }
})
exports.UserModel = mongoose.model("users", userSchema);

exports.genToken = (_userId) => {
  let token = jwt.sign({_id: _userId}, "KEYSECRET", {expiresIn: "60mins"});
  return token;
}


// הרשמה
exports.userValid = (_bodyValid) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    // email() -> בודק שגם האימייל לפי תבנית מייל
    email: Joi.string().min(2).max(100).email().required(),
    password: Joi.string().min(6).max(50).required(),
  })
  return joiSchema.validate(_bodyValid);
}
// התחברות
exports.loginValid = (_bodyValid) => {
  let joiSchema = Joi.object({
    name: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(2).max(100).email().required(),
    password: Joi.string().min(6).max(50).required(),
  })
  return joiSchema.validate(_bodyValid);
}
