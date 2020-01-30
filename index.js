const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const validator = require('./src/validator');
const Joi = require('@hapi/joi');

const app = express();

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200
};

app.use(express.static('www'));

app.use(bodyParser.json());
app.use(cors(corsOptions));
// Enable CORS pre-flight across the board to allow for PATCH/DELETE calls https://www.npmjs.com/package/cors#enabling-cors-pre-flight
app.options('*', cors());

app.set('port', process.env.PORT || 8000);

app.post(
  '/ping',
  validator(
    Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
    })
  ),
  function(req, res) {
    const { username } = req.body;
    console.log(username);
    res.send(`pong ${username}`);
  }
);

app.listen(app.get('port'), function() {
  console.log('App started at: %s on port: %s', new Date(), app.get('port'));
});
