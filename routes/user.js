const { User, validateUser } = require("../models/user");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const _ = require("lodash");

router.post("/", async (req, res) => {
   const { error } = validateUser(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   let user = await User.findOne({ email: req.body.email });
   if (user) return res.send("Mavjud bo'lgan foydalanuvchi");

   user = new User(
      _.pick(req.body, [
         "firstname",
         "lastname",
         "company",
         "address",
         "email",
         "password",
         "phone",
         "birthDay",
      ])
   );
   const salt = await bcrypt.genSalt();
   user.password = await bcrypt.hash(user.password, salt);

   await user.save();

   res.send(
      _.pick(user, [
         "_id",
         "firstname",
         "lastname",
         "company",
         "address",
         "email",
         "phone",
         "birthDay",
      ])
   );
});
router.put("/:id", async (req, res) => {
   const form = { ...req.body };
   const { error } = validateUser(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   const user = await User.findByIdAndUpdate(req.params.id, {
      firstname: form.firstname,
      lastname: form.lastname,
      company: form.company,
      address: form.address,
      email: form.email,
      phone: form.phone,
      birthDay: form.birthDay,
   });

   if (!user) {
      return res.status(404).send("your id not found please check it");
   }
   res.send(user);
});

router.get("/", async (req, res) => {
   const { authorization } = req.headers;
});
module.exports = router;
