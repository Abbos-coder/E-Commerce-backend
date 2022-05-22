const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { Category, validateCategory } = require("../models/category");

router.get("/", async (req, res) => {
   const categories = await Category.find({});
   res.send(categories);
});

router.post("/", async (req, res) => {
   const { error } = validateCategory(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let category = new Category({
      category: req.body.category,
      sub_category: req.body.sub_category,
   });

   category = await category.save();
   res.status(200).send(category);
});

router.put("/:id", async (req, res) => {
   const form = { ...req.body };
   const { error } = validateCategory(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   let category = await Category.findByIdAndUpdate(req.params.id, {
      $push: { sub_category: form.sub_category },
   });
   if (!category) {
      return res.status(404).send("your id not found please check it");
   }
   res.send(category);
});

module.exports = router;
