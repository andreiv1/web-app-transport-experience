require("dotenv").config();

let express = require("express");
let router = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isUserAuth = require("../middleware/isUserAuth");
const checkSessionUserId = require("../middleware/checkSessionUserId");
const mailTransporter = require("../utils/mailTransporter");
const { Op } = require("sequelize");

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

  if (!user.enabled) {
    res.status(401).json({ error: "User is disabled." })
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

router.route("/profile").get(isUserAuth, async function (req, res) {
  let user = await User.findByPk(req.userdata.id);
  res.status(201).json(user);
});

router.route("/resetPassword").post(async function (req, res) {
  let { username, email } = req.body;

  //check if user has sent either username, either email
  if (!username && !email) {
    return res.status(404).send({ error: "Please send a username or an email address!" });
  }

  if (username && !email) {
    email = "";
  }
  if (!username && email) {
    username = "";
  }

  let user = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }]
    }
  })

  if (!user) {
    return res.status(201).json({ message: 'If the user exists with the data provided, an e-mail will be sent' });
  }

  //user already have a token in db
  if (user.resetPasswordToken) {
    //check if token is expired
    try {
      jwt.verify(user.resetPasswordToken, process.env.JWT_SECRET_KEY)
      return res.status(401).json({ message: 'You can send another password reset in 30 minutes, please check your email.' });
    }
    catch (err) {
      //generate new token
    }

  }

  const resetToken = jwt.sign(
    {
      id: user.id
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "30m",
    }
  );
  await User.update({ "resetPasswordToken": resetToken }, {
    where: { id: user.id }
  })

  let resetUrl = process.env.FRONT_END_URL + "/resetPassword?token=" + resetToken;
  const mailData = {
    from: 'noreply@transport-experience.tw',  // sender address
    to: email,
    subject: 'Reset your password on Transport eXperience',
    html: `Hi ${username}, <br> ` +
      `You can reset your password <a href="${resetUrl}">here</a> <br> This link will expire in 30 minutes.`
  }
  
  mailTransporter.sendMail(mailData, function (err, info) {
    if (err)
      res.status(400).json({ "message": "There was an error sending your email, please try again later." });
    else
      res.status(200).json({ "message": `Your email was sent successfully to ${email}, if you can't find it also check spam.` })
  })
});

router.route("/updatePassword").post(async function (req, res) {
  const { token, password } = req.body;
  if (!token && !password) {
    return res.status(403).json({ "message": "Missing token and new password" });
  }
  let user = await User.findOne({ where: { resetPasswordToken: token } })
  if (!user) {
    return res.status(403).json({ "message": "Token is invalid!" })
  }

  const updated = await User.update({
    password: await bcrypt.hash(password, 10),
    resetPasswordToken: null
  }, {
    where: { id: user.id, resetPasswordToken: token }
  }, {
    individualHooks: true
  });
  

  if (updated) {
    return res.status(201).json({ "message": "Password changed!" })
  } else {
    return res.status(401).json({ "message": "There was an error updating the password, please try again later." })
  }
})

module.exports = router;
