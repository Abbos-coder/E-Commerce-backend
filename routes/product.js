const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Product, validateProduct } = require("../models/product");
const url = require("url");

router.get("/", async (req, res) => {
   const products = await Product.find({});
   res.send(products);
});
// todo upload image
const fileStorageEngine = multer.diskStorage({
   destination: (req, res, cb) => {
      cb(null, "./images/");
   },
   filename: (req, file, cb) => {
      cb(null, Date.now() + file.originalname);
   },
});
const upload = multer({ storage: fileStorageEngine });

router.post("/", upload.single("image"), async (req, res) => {
   const { error } = validateProduct(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let product = new Product({
      category: req.body.category,
      image: "http://localhost:8080/" + req.file.path,
      title: req.body.title,
      price: req.body.price,
      rating: req.body.rating,
      status: req.body.status,
   });
   product = await product.save();

   res.status(201).send(product);
});
router.get("/category/:productId", async (req, res) => {
   //  const url_parts = url.parse(req.url, true);
   //  const query = url_parts.query;
   console.log("req url " + url);
   res.send(url);

   //  let product = await Product.findById(req.params.productId);
   //  if (!product)
   //     return res.status(404).send("product not found check it again!");
   //  res.send(product);
});

router.get("/:id", async (req, res) => {
   let product = await Product.findById(req.params.id);
   if (!product) return res.status(404).send("id not found check it again!");
   res.send(product);
});

router.put("/:id", async (req, res) => {
   const { error } = validateProduct(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let product = await Product.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
   );

   if (!product)
      return res.status(404).send("your id not found please check it");

   res.send(product);
});

router.delete("/:id", async (req, res) => {
   let product = await Product.findOneAndRemove(req.params.id);
   if (!product)
      return res.status(404).send("id not fount check it again please !");
   res.send(product);
});

module.exports = router;
