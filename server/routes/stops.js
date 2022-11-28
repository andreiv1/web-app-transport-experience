let express = require('express')
let router = express.Router()

const Stop = require('../models/stop')

module.exports = router;

router.route('/add').post(async function (req, res) {
    try {
        const stop = await Stop.create(req.body)
        res.status(200).json(stop);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.route('/edit/:stopId').put(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

router.route('/delete/:stopId').delete(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

router.route('/getAll').get(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

router.route('/get/:stopId').get(function (req, res) {
    res.status(501).json({"message": "Not implemented - TO DO"});
});

module.exports = router;