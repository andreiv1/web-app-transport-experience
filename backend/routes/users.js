require("dotenv").config();

let express = require("express");
let router = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isUserAuth = require("../middleware/isUserAuth");
const checkSessionUserId = require("../middleware/checkSessionUserId");

router.route("/signup").post(async function (req, res) {
  const { username, password, email } = req.body;
  if (!(username && password && email)) {
    return res.status(400).json({ error: "All fields are required!" });
  }
  const newUser = await User.create({ username, password, email });
  res.status(201).json(newUser);
});

router.route("/login").post(async function (req, res) {
  let { username, password, email } = req.body;
  let user;
  if (!email && username) {
    user = await User.scope("withPassword").findOne({
      where: { username: username },
    });

    if (!user) {
      return res.status(401).json({ error: "Username is incorrect!" });
    }
  }

  if (!username && email) {
    user = await User.scope("withPassword").findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ error: "Email is incorrect!" });
    }
  }

  if (username && email) {
    user = await User.scope("withPassword").findOne({
      where: { username: username, email: email },
    });

    if (!user) {
      return res.status(401).json({ error: "Username or Email is incorrect!" });
    }
  }

  if (await bcrypt.compare(password, user.password)) {
    if (user.enabled) {
      let role = "user";
      if (user.isAdmin) {
        role = "admin";
      }

      const authToken = jwt.sign(
        {
          id: user.id,
          username: user.username,
          email: user.email,
          role: role,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      return res.status(200).json({
        username: user.username,
        email: user.email,
        role: role,
        authToken: authToken,
      });
    } else {
      return res.status(401).json({ error: "Account is not activated!" });
    }
  } else {
    return res.status(401).json({ error: "Password is incorrect!" });
  }
});

router.route("/getAll").get(isUserAuth, async function (req, res) {
  let defaultOrder = "ASC";
  let users = await User.findAll({
    attributes: ["id", "username", "createdAt"],
  });
  res.status(201).json(users);
});

router.route("/get/:userId").get(isUserAuth, async function (req, res) {
  let user = await User.findByPk(req.params.userId);
  if (user) {
    res.status(201).json(user);
  } else {
    res
      .status(404)
      .json({ error: `user with id ${req.params.userId} not found` });
  }
});

router.route("/edit/:userId").put(async function (req, res) {
  let user = await User.findByPk(req.params.userId);

  checkSessionUserId(req, res, user.id, () => {
    if (user) {
      res.status(201).json(user);
    } else {
      res
        .status(404)
        .json({ error: `user with id ${req.params.userId} not found` });
    }
  })
});

router.route("/profile").get(isUserAuth, async function(req, res) {
  let user = await User.findByPk(req.userdata.id);
  res.status(201).json(user);
});

router.route("/resetPassword").post(function (req, res) {
  res.status(501).json({ message: "Not implemented - TO DO" });
});

module.exports = router;
