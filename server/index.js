require('dotenv').config();

const express = require('express')
const cors = require('cors')
const sequelize = require('./sequelize');

//Models
const Line = require('./models/line.js');
const Stop = require('./models/stop.js');
const LineStop = require('./models/linestop.js');
//Relations
Stop.hasOne(Line, {
    foreignKey: {
        name: 'startStopId'
    }
});
Stop.hasOne(Line, {
    foreignKey: {
        name: 'endStopId'
    }
});

Line.belongsToMany(Stop, { through: 'LineStop', foreignKey: 'lineId'});
Stop.belongsToMany(Line, { through: 'LineStop', foreignKey: 'stopId'});

const app = express();
const router = express.Router();
require('./models/line.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use('/api', router)
app.get('/', (req, res) => {
    return res.json({"status": "Server is up"});
  });

app.set("port",process.env.PORT || 8080)

app.listen(app.get('port'), async () => {
    console.log('Server listening on port ' + app.get('port'))
    try{
        await sequelize.authenticate();
        console.log("Connected successfully to database!")
    } catch(e){
        console.error("Error connecting to database!", e)
    }
})
