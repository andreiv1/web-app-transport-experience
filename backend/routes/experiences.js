let express = require("express");
const checkSessionUserId = require("../middleware/checkSessionUserId");
let router = express.Router();
const isUserAuth = require("../middleware/isUserAuth");
const Experience = require("../models/experience");
const Stop = require("../models/stop");
const { Line } = require("../models/line");
const User = require("../models/user");

router.route("/add").post(isUserAuth, checkSessionUserId, async function (req, res) {
  //do not allow input for id
  delete req.body.id;
  req.body.userId = req.userdata.id;
  const newExperience = await Experience.create(req.body);
  res.status(201).json(newExperience);
});

router.route("/edit/:experienceId").put(isUserAuth, checkSessionUserId, async function (req, res) {
  let experience = await Experience.findByPk(req.params.experienceId);
  if (experience) {
     await Experience.update(req.body, {
      where: {
        id: req.params.experienceId
      }
    }).then(async (rows) => {
        if(rows == 1) {
          let updatedExperience = await Experience.findByPk(req.params.experienceId);
          res.status(200).json(updatedExperience);
        } else {
          res.status(400).json({error: "Edit failed!"})
        }
    });
    
  } else {
    res.status(404).json({
      error: `experience with id ${req.params.experienceId} not found`,
    });
  }
});

router.route('/getAll').get(isUserAuth, async function (req, res) {
  let experiences = await Experience.findAll({
    order: [['id', 'DESC']],
    attributes: {
      exclude: ['departureStopId', 'arrivalStopId', 'userId', 'lineId']
    },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id','username'],
        required: true

      },
      {
        model: Line,
        as: 'line',
        attributes: ['id','name', 'vehicleType'],
        required: true

      },
      {
        model: Stop,
        as: 'departureStop',
        attributes: ['id', 'name'],
        required: true
      },
      {
        model: Stop,
        as: 'arrivalStop',
        attributes: ['id', 'name'],
        required: true
      }]
  });
  res.status(201).json(experiences);
});

router.route("/getAll/:userId").get(isUserAuth, async function (req, res) {
  let experiences = await Experience.findAll();
  res.status(201).json(experiences);
});

router.route("/delete/:experienceId").delete(checkSessionUserId, async function (req, res) {
  Experience.destroy({
    where: {
      id: req.params.experienceId,
    },
  }).then((rows) => {
    if (rows === 1) {
      res.status(200).json({
        message: `experience with id ${req.params.experienceId} deleted successfully`,
      });
    } else {
      res.status(404).json({
        error: `line with id ${req.params.experienceId} not found`,
      });
    }
  });
});

module.exports = router;
