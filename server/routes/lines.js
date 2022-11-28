let express = require('express')
let router = express.Router()
const Stop = require('../models/stop')
const Line = require('../models/line')
const LineStop = require('../models/linestop')

router.route('/add').post(async function (req, res) {
    try {
        const line = await Line.create(req.body)
        res.status(200).json(line);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.route('/edit/:lineId').put(async function (req, res) {
    try{
        let line = await Line.findByPk(req.params.lineId)
        if(line) {
            line = await line.update(req.body)
            res.status(200).json(line);
        } 
        else {
            res.status(404).json({"error": `line with id ${req.params.lineId} not found`})
        }
            
    }catch(err){

    }
});
router.route('/delete/:lineId').delete(async function (req, res) {
    try {
        Line.destroy({
            where: {
                id: req.params.lineId
            }
        }).then((rows) => {
            if(rows === 1){
                res.status(200).json({"message": `line with id ${req.params.lineId} deleted successfully`})
            } else {
                res.status(404).json({"error": `line with id ${req.params.lineId} not found`})
            }
        })

    }
    catch(err){

    }
});

router.route('/getAll').get(async function (req, res) {
    let lines = await Line.findAll();
    res.status(200).json(lines);
});

router.route('/get/:lineId').get(async function (req, res) {
    let line = await Line.findByPk(req.params.lineId, {include: [Stop]})
    res.status(200).json(line)
});


router.route('/addStop').post(async function (req, res) {
    try{
        const linestop = await LineStop.create(req.body);
        res.status(200).json(linestop);
    }
    catch(err){
        res.status(500).json(err);
    }
});
module.exports = router;