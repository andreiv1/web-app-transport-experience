let express = require('express')
let router = express.Router()

const Stop = require('../models/stop')
const { Line, vehicleType } = require('../models/line')
const LineStop = require('../models/linestop')
const isAdmin = require("../middleware/isAdmin")
const isUserAuth = require('../middleware/isUserAuth')

router.route('/add').post(isAdmin, async function (req, res) {
    //do not allow modify id
    delete req.body.id;
    const line = await Line.create(req.body)
    res.status(200).json(line);
});

router.route('/edit/:lineId').put(isAdmin, async function (req, res) {
    let line = await Line.findByPk(req.params.lineId)
    //do not allow modify id
    delete req.body.id;
    if (line) {
        line = await line.update(req.body)
        res.status(200).json(line);
    }
    else {
        res.status(404).json({ "error": `line with id ${req.params.id} not found` })
    }
});

router.route('/delete/:lineId').delete(isAdmin, async function (req, res) {
    Line.destroy({
        where: {
            id: req.params.lineId
        }
    }).then((rows) => {
        if (rows === 1) {
            res.status(200).json({ "message": `line with id ${req.params.lineId} deleted successfully` })
        } else {
            res.status(404).json({ "error": `line with id ${req.params.lineId} not found` })
        }
    })
});

router.route('/getAll').get(isUserAuth, async function (req, res) {
    let lines = await Line.findAll({
        attributes: {
            exclude: ['startStopId', 'endStopId']
        },
        include: [{
            model: Stop,
            as: 'startStop',
            attributes: ['id', 'name'],
            required: true

        }, {
            model: Stop,
            as: 'endStop',
            attributes: ['id', 'name'],
            required: true
        }]

    });
    res.status(200).json(lines);
});

router.route('/get/:lineId').get(isUserAuth, async function (req, res) {
    let line = await Line.findByPk(req.params.lineId, {
        attributes: {
            exclude: ['startStopId', 'endStopId']
        },
        include: [{
            model: Stop,
            as: 'startStop',
            attributes: ['id', 'name'],
            required: true

        }, {
            model: Stop,
            as: 'endStop',
            attributes: ['id', 'name'],
            required: true
        },
        {
            model: LineStop,
            as: 'stops',
            attributes: ['orderIndex'],

            include: [{
                model: Stop,
                as: 'lineStop',
                attributes: ['id', 'name'],
            }]
        }
        ]
    })
    if (line)
        res.status(200).json(line)
    else {
        res.status(404).json({ "error": `line with id ${req.params.lineId} not found` })
    }
});

router.route('/addStop').post(isAdmin, async function (req, res) {
    const linestop = await LineStop.create(req.body);
    res.status(200).json(linestop);
});

router.route('/vehicleTypes').get(isUserAuth, async function (req, res) {
    const vehicleTypes = vehicleType.values;
    res.status(200).json({ "vehicleTypes": vehicleTypes });

});

module.exports = router;