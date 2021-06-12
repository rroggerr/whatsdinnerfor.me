import express from 'express';

import {YelpApi} from './yelpApi';
import {getLatLong} from './locationApi';

if (!process.env.HEROKU) {
  require('dotenv').config();
}

const PORT = process.env.PORT || 8080;
const yelpApiKey = process.env.YELP_API_KEY || '';

const app = express();
const YelpClient = new YelpApi(yelpApiKey);

app.use('/build', express.static('build'));
app.use(express.static('public'));

app.get('/api/restaurants', async (req, res, next) => {
  const {location, walking} = req.query;
  try {
    const yelpResp = await YelpClient
      .getYelpPlaces(location as string, !!walking);
    res.json(yelpResp);
  } catch (err) {
    next(err);
  }
});

app.get('/api/location', async (req, res, next) => {
  const ip = req.socket.remoteAddress;
  
  try {
    const location = await getLatLong(ip);
    res.json(location);
  } catch (err) {
    next(err);
  }
});

app.listen(PORT, function () {
  console.log(`App is listening on port ${PORT}!`);
});
