const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
   category: { type: String, required: true, trim: true },
   sub_category: { type: Array, required: true, trim: true },
});

function validateCategory(category) {
   const schema = Joi.object({
      category: Joi.string().required(),
      sub_category: Joi.string().required(),
   });
   return schema.validate(category);
}

const Category = mongoose.model("Category", categorySchema);

exports.Category = Category;
exports.validateCategory = validateCategory;
