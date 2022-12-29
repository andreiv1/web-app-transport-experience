let express = require('express')
const Line = require('../models/line')
const Stop = require('../models/stop')
let router = express.Router()
const isAdmin = require("../middleware/isAdmin")
const isUserAuth = require('../middleware/isUserAuth')

router.route('/add').post(isAdmin, async function (req, res) {
    //do not allow input for id
    delete req.body.id;

    const stop = await Stop.create(req.body)
    res.status(200).json(stop);

    next(err)
});

router.route('/edit/:stopId').put(isAdmin, async function (req, res) {
    //do not allow input for id
    delete req.body.id;

    let stop = await Stop.findByPk(req.params.stopId)
    if (stop) {
        stop = await stop.update(req.body)
        res.status(200).json(stop)
    }
    else {
        res.status(404).json({ "error": `stop with id ${req.params.stopId} not found` })
    }
});

router.route('/delete/:stopId').delete(isAdmin, async function (req, res) {
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
    
});

router.route('/getAll').get(isAdmin, async function (req, res) {
    let stops = await Stop.findAll();
    res.status(200).json(stops);
});

router.route('/get/:stopId').get(isUserAuth, async function (req, res) {
    let stop = await Stop.findByPk(req.params.stopId)
    res.status(200).json(stop);
});

module.exports = router;