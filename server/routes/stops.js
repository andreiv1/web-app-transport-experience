let express = require('express');
const Line = require('../models/line');
const Stop = require('../models/stop')
let router = express.Router()



module.exports = router;

router.route('/add').post(async function (req, res) {
    try {
        const stop = await Stop.create(req.body)
        res.status(200).json(stop);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.route('/edit/:stopId').put(async function (req, res) {
    try {
        let stop = await Stop.findByPk(req.params.stopId)
        if (stop) {
            stop = await stop.update(req.body)
            res.status(200).json(stop)
        }
        else {
            res.status(404).json({ "error": `stop with id ${req.params.stopId} not found` })
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.route('/delete/:stopId').delete(async function (req, res) {
    try {
        Stop.destroy({
            where: {
                id: req.params.stopId
            }
        }).then((rows) => {
            if (rows === 1) {
                res.status(200).json({ "message": `stop with id ${req.params.stopId} deleted successfully` })
            } else {
                res.status(404).json({ "error": `stop with id ${req.params.stopId} not found` })
            }
        })
    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.route('/getAll').get(async function (req, res) {
    try {
        let stops = await Stop.findAll();
        res.status(200).json(stops);
    }
    catch (err) {
        res.status(500).json(err)
    }
});

router.route('/get/:stopId').get(async function (req, res) {
    try {
        let stop = await Stop.findByPk(req.params.stopId)
        res.status(200).json(stop);
    }
    catch (err) {
        res.status(500).json(err)
    }

});

module.exports = router;