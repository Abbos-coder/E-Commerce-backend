const mongoose = require("mongoose");
const Joi = require("joi");
// const { string } = require("joi");

const productSchema = new mongoose.Schema({
   userId: { type: String, required: true, trim: true },
   category: { type: String, required: true },
   image: { type: Object, default: "", required: true },
   title: { type: String, required: true, trim: true },
   price: { type: Number, required: true, trim: true },
   rating: { type: Number, default: 4.5, trim: true, required: false },
   description: { type: String, required: true, trim: true },
   status: { type: Boolean, default: false },
   company_name: { type: String, required: true },
   company_address: { type: String, required: true },
   company_firstname: { type: String, required: true },
   company_lastname: { type: String, required: true },
   company_phone: { type: String, required: true },
   company_email: { type: String, required: true },
});

function validateProduct(product) {
   const schema = Joi.object({
      userId: Joi.string().required(),
      category: Joi.string().required(),
      title: Joi.string().required(),
      price: Joi.number().required(),
      status: Joi.boolean(),
      description: Joi.string().required(),
      company_name: Joi.string().required(),
      company_address: Joi.string().required(),
      company_firstname: Joi.string().required(),
      company_lastname: Joi.string().required(),
      company_phone: Joi.string().required(),
      company_email: Joi.string().required(),
      rating: Joi.number(),
   });
   return schema.validate(product);
}

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
exports.validateProduct = validateProduct;
