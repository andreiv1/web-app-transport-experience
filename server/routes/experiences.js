let express = require("express");
let router = express.Router();
const auth = require("../middleware/auth");

const Experience = require("../models/experience");

router.route("/add").post(auth, async function (req, res) {
  try {
    //do not allow input for id
    delete req.body.id;

    const newExperience = await Experience.create(req.body);
    newExperience.userId = req.userdata.id;
    res.status(201).json(newExperience);
  } catch (err) {
    res.status(501).json(err);
  }
});

router.route("/edit/:experienceId").put(auth, async function (req, res) {
  try {
    if (req.userdata.id === Experience.userId) {
      let experience = await Experience.findByPk(req.params.experienceId);
      if (experience) {
        const updatedExperience = await Experience.update(req.body);
        res.status(201).json(updatedExperience);
      } else {
        res.status(404).json({
          error: `experience with id ${req.params.experienceId} not found`,
        });
      }
    } else {
      res.status(401).json({
        error: "Unauthorized",
      });
    }
  } catch (err) {
    res.status(501).json(err);
  }
});

router.route("/getAll/:userId").get(async function (req, res) {
  try {
    let experiences = await Experience.findAll({
      attributes: [
        "id",
        "departureStopId",
        "arrivalStopId",
        "departure",
        "tripDuration",
        "crowdedness",
        "observations",
        "satisfactionLevel",
        "userId",
        "lineId",
        "createdAt",
      ],
    });
    res.status(201).json(experiences);
  } catch (err) {
    res.status(501).json(err);
  }
});

router.route("/delete/:experienceId").delete(auth, async function (req, res) {
  try {
    if (req.userdata.id === Experience.userId) {
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
    } else {
    }
  } catch (err) {
    res.status(401).json({
      error: "Unauthorized",
    });
  }
});

module.exports = router;
