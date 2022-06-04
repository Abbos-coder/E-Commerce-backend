const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Product, validateProduct } = require("../models/product");
const auth = require("../middleware/auth");

// get rondom
router.get("/random", async (req, res) => {
   const products = await Product.find({});
   const random = products[Math.floor(Math.random() * products.length)];
   res.send(random);
});
// get all
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

// post new product
router.post("/", auth, upload.single("image"), async (req, res) => {
   const { error } = validateProduct(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let product = new Product({
      userId: req.body.userId,
      category: req.body.category,
      image: "https://diploma-tuit.herokuapp.com/" + req.file.path,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      rating: req.body.rating,
      status: req.body.status,
      company_name: req.body.company_name,
      company_address: req.body.company_address,
      company_firstname: req.body.company_firstname,
      company_lastname: req.body.company_lastname,
      company_phone: req.body.company_phone,
      company_email: req.body.company_email,
   });
   product = await product.save();
   res.status(201).send(product);
});
// get all from category
router.get("/category/:categoryId", async (req, res) => {
   const category = req.params.categoryId;
   let product = await Product.find({ category: category });
   res.send(product);
});
//  get my products
router.get("/user-product/:userId", async (req, res) => {
   const user_id = req.params.userId;
   let product = await Product.find({ userId: user_id });
   res.send(product);
});

router.get("/:id", async (req, res) => {
   let product = await Product.findById(req.params.id);
   if (!product) return res.status(404).send("id not found check it again!");
   res.send(product);
});

router.put("/:id", async (req, res) => {
   const form = { ...req.body };
   const { error } = validateProduct(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
         category: form.category,
         image: "https://diploma-tuit.herokuapp.com/" + req.file.path,
         title: form.title,
         price: form.price,
         rating: form.rating,
         description: form.description,
         status: form.status,
      },
      { new: true }
   );

   if (!product) {
      return res.status(404).send("your id not found please check it");
   }
   res.send(product);
});

// ! DELETE
router.delete("/:id", async (req, res) => {
   let product = await Product.findOneAndRemove({ _id: req.params.id });
   if (!product) return res.status(404).send("id not found check it");
   res.send(product);
});

//  search product
router.get("/search-product/:search", async (req, res) => {
   const search_data = req.params.search.trim();
   let product = await Product.find({
      title: { $regex: new RegExp("^" + search_data + ".*", "i") },
   }).exec();
   // limit search results to 5
   product = product.slice(0, 5);
   res.send(product);
});

module.exports = router;
