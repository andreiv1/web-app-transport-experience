require('dotenv').config();
require('express-async-errors');
require('./relations')

const express = require('express')
const cors = require('cors')
const sequelize = require('./sequelize');

//Routes
const experiencesRouter = require('./routes/experiences')
const linesRouter = require('./routes/lines')
const stopsRouter = require('./routes/stops')
const usersRouter = require('./routes/users');


const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/experiences', experiencesRouter);
app.use('/api/lines', linesRouter);
app.use('/api/stops', stopsRouter);
app.use('/api/users', usersRouter);

app.set("port", process.env.PORT || 8080)

//Error handling middleware
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);

app.listen(app.get('port'), async () => {
  console.log('Server listening on port ' + app.get('port'))
  try {
    await sequelize.authenticate();
    console.log("Connected successfully to database!")
  } catch (e) {
    console.error("Error connecting to database!", e)
  }
})
