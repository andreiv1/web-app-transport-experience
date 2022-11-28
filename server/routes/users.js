let express = require('express')
let router = express.Router()

const User = require('../models/user')

router.route('/signup').post(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

router.route('/login').post(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

router.route('/edit/:userId').put(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

router.route('/resetPassword').post(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

router.route('/disable').post(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});