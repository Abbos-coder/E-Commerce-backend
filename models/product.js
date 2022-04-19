const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
   category: {
      type: String,
      required: true,
   },
   image: {
      type: Object,
      default: "",
      required: true,
   },
   title: {
      type: String,
      required: true,
      trim: true,
   },
   price: {
      type: Number,
      required: true,
      trim: true,
   },
   rating: {
      type: Number,
      default: 4.5,
      trim: true,
      required: false,
   },
   status: {
      type: Boolean,
      required: true,
      default: false,
   },
});

function validateProduct(product) {
   const schema = Joi.object({
      category: Joi.string().required(),
      title: Joi.string().required(),
      price: Joi.number().required(),
      status: Joi.boolean().required(),
      rating: Joi.number(),
   });
   return schema.validate(product);
}

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
exports.validateProduct = validateProduct;
