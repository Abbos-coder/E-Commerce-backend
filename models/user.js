const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
   firstname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
   },
   lastname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
   },
   email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
   },
   phone: {
      type: String,
      required: true,
   },
   birthDay: {
      type: String,
      required: true,
   },
   token: {
      type: String,
   },
});

userSchema.methods.generateAuthToken = function () {
   const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
   return token;
};

function validateUser(user) {
   const schema = Joi.object({
      firstname: Joi.string().min(3).max(50).required(),
      lastname: Joi.string().min(3).max(50).required(),
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      phone: Joi.string().required(),
      birthDay: Joi.string().required(),
   });
   return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.validateUser = validateUser;
