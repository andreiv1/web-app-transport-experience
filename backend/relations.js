const { Line } = require('./models/line.js');
const Stop = require('./models/stop.js');
const LineStop = require('./models/linestop.js');
const User = require("./models/user.js");
const Experience = require("./models/experience.js");

//Relations
Line.belongsTo(Stop, { foreignKey: 'startStopId', as: 'startStop'})
Line.belongsTo(Stop, { foreignKey: 'endStopId', as: 'endStop'})

Experience.belongsTo(Stop, { foreignKey: 'departureStopId', as: 'departureStop'})
Experience.belongsTo(Stop, { foreignKey: 'arrivalStopId', as: 'arrivalStop'})
Experience.belongsTo(Line, { foreignKey: 'lineId', as: 'line'})
Experience.belongsTo(User, { foreignKey: 'userId', as: 'user'})

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

Line.hasMany(LineStop, { foreignKey: 'lineId', as: 'stops'})
LineStop.belongsTo(Stop, { foreignKey: 'stopId', as: 'lineStop'})

Line.belongsToMany(Stop, { through: 'LineStop', foreignKey: 'lineId' });
Stop.belongsToMany(Line, { through: 'LineStop', foreignKey: 'stopId' });