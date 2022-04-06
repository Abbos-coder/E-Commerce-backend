const mongoose = require("mongoose");
const Joi = require("joi");
const { required, boolean } = require("joi");

const registerSchema = new mongoose.Schema({
   firstName: {
      type: String,
      required: true,
   },
   lastName: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true,
   },
});
const validateLogin = (login) => {
   const schema = Joi.object({
      login: Joi.string().min(3).required(),
      password: Joi.string().min(6).required(),
   });
   return schema.validate(login);
};
const Login = mongoose.model("login", registerSchema);

exports.Login = Login;
exports.validateLogin = validateLogin;
exports.productSchema = productSchema;
