const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { body, validationResult } = require("express-validator"); //npm package for validations (https://express-validator.github.io/docs/)

const bcrypt = require("bcryptjs"); //npm package for hashing , salt and pepper(https://www.npmjs.com/package/bcryptjs)

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

var jwt = require("jsonwebtoken"); //provide identification token to user (https://www.npmjs.com/package/jsonwebtoken)

var fetchUser = require("../middleware/fetchUser"); //adding custom middleware to access the data of user after loggedin

//ROUTE 1 : Creating a user using : POST "/api/auth/createuser". no login require
router.post(
  //to avoid sending data in URL (get)
  //Endpoint
  "/createuser",

  //Checks
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],

  //Callback async function
  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    try {
      //Check whether the user with same email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exist" });
      }

      const salt = await bcrypt.genSalt(10); //salt generation
      const secPass = await bcrypt.hash(req.body.password, salt); //password hashing

      //Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: {
          id: user.id,
        }
      };
      const authToken = jwt.sign(data, jwtSecret);
      // console.log(authToken);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 2 : Authenticate a user using : POST "/api/auth/login". no login required
router.post(
  "/login",

  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password can't be blank").exists(),
  ],

  async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please try to login with correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        }
      };

      const authToken = jwt.sign(data, jwtSecret);
      res.json({ authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//ROUTE 3 : Get loggedin User details: POST "/api/auth/getuser".login required
router.post(
  "/getuser",

  //middleware from ../middleware/fetchUser
  fetchUser,

  async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");   //select all rows except password
      res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
