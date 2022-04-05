const mongoose = require("mongoose");
const Joi = require("joi");
const { required, boolean } = require("joi");

const productSchema = new mongoose.Schema({
   category: {
      type: String,
      required: true,
   },
   image: {
      type: Object,
      required: true,
   },
   title: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   rating: {
      type: Number,
      default: 4.5,
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
      name: Joi.string().min(2).required(),
   });
   return schema.validate(product);
}

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;
exports.validateProduct = validateProduct;
exports.productSchema = productSchema;
