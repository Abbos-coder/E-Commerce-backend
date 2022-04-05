const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Product, validateProduct } = require("../models/product");

router.get("/", async (req, res) => {
   const categories = await Product.find({});
   res.send(categories);
});
// todo upload image
const fileStorageEngine = multer.diskStorage({
   destination: (req, res, cb) => {
      cb(null, "./images/");
   },
   filename: (req, file, cb) => {
      console.log(`http://localhost:8080/images/${file.originalname}`);
      cb(null, Date.now() + file.originalname);
   },
});
const upload = multer({ storage: fileStorageEngine });

router.post("/", upload.single("image"), async (req, res) => {
   const { error } = validateProduct(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let category = new Category({
      name: req.body.name,
      image: req.file,
   });
   category = await category.save();

   res.status(201).send(category);
});
router.get("/:categoryId", async (req, res) => {
   let category = await Category.findById(req.params.categoryId);
   if (!category)
      return res.status(404).send("category not found check it again!");
   res.send(category);
});

router.get("/:id", async (req, res) => {
   let category = await Category.findById(req.params.id);
   if (!category) return res.status(404).send("id not found check it again!");
   res.send(category);
});

router.put("/:id", async (req, res) => {
   const { error } = validateProduct(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let category = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
   );

   if (!category)
      return res.status(404).send("your id not found please check it");

   res.send(category);
});

router.delete("/:id", async (req, res) => {
   let category = await Category.findOneAndRemove(req.params.id);
   if (!category)
      return res.status(404).send("id not fount check it again please !");
   res.send(category);
});

module.exports = router;
