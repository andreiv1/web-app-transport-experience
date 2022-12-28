require('dotenv').config();

const express = require('express')
const cors = require('cors')
const sequelize = require('./sequelize');

//Models
const Line = require('./models/line.js');
const Stop = require('./models/stop.js');
const LineStop = require('./models/linestop.js');
const User = require("./models/user.js");
const Experience = require("./models/experience.js");

//Relations
Stop.hasOne(Line, {
  foreignKey: {
    name: "startStopId",
  },
});
Stop.hasOne(Line, {
  foreignKey: {
    name: "endStopId",
  },
});

Line.hasMany(Experience, {
  foreignKey: {
    name: "lineId",
  },
});

User.hasMany(Experience, {
  foreignKey: {
    name: "userId",
  },
});

Stop.hasOne(Experience, {
  foreignKey: {
    name: "departureStopId",
  },
});

Stop.hasOne(Experience, {
  foreignKey: {
    name: "arrivalStopId",
  },
});


Line.belongsToMany(Stop, { through: 'LineStop', foreignKey: 'lineId'});
Stop.belongsToMany(Line, { through: 'LineStop', foreignKey: 'stopId'});

//Routes
const experiencesRouter = require('./routes/experiences')
const linesRouter = require('./routes/lines')
const stopsRouter = require('./routes/stops')
const usersRouter = require('./routes/users')

const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/experiences', experiencesRouter);
app.use('/api/lines', linesRouter);
app.use('/api/stops', stopsRouter);
app.use('/api/users', usersRouter);

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