import express from 'express';
import {YelpApi} from './yelpApi'

require('dotenv').config()

const PORT = process.env.PORT || 8080;
// const yelpApiKey = process.env.YELP_API_KEY || ''

const app = express();
// const YelpClient = new YelpApi(yelpApiKey)

app.use('/build', express.static('build'));
app.use(express.static('public'));

console.log(process.env.YELP_API_KEY)

// app.get('/api/restaurants', async (req, res, next) => {
//   try {
//     const yelpResp = await YelpClient.getYelpPlaces();
//     res.json(yelpResp);
//   } catch (err) {
//     next(err);
//   }
//   console.log(req.connection.remoteAddress)
// })

app.listen(PORT, function () {
    console.log(`App is listening on port ${PORT}!`);
});
