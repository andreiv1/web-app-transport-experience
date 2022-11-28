let express = require('express')
let router = express.Router()

const Experience = require('../models/experience')

router.route('/add').post(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

router.route('/edit/:experienceId').put(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

router.route('/getAll/:userId').get(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

router.route('/delete/:experienceId').delete(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});