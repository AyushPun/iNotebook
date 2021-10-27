const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

//Creating a user using : POST "/api/auth/createuser". Doesn't require auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    //Check whether the user with same email exists already
    try {
    let user = await User.findOne({email: req.body.email});
    if(user) {
      return res.status(400).json({error: "Sorry a user with this email already exist"})
    }
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })

  //     .then((user) => res.json(user))
  //     .catch((err) => {console.log(err)
  //   res.json({error: 'Please enter a unique value for email', message: err.message})});
  res.json(user)
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured")
    }
  }
);

module.exports = router;
