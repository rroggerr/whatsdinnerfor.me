import type {NextApiRequest, NextApiResponse} from 'next';
import {YelpApi, Business} from '../../utils/yelpApi';

const yelpApiKey = process.env.YELP_API_KEY || '';
const YelpClient = new YelpApi(yelpApiKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Business[] | Error>,
) {
  try {
    const {location, walking} = req.query;
    const yelpResp = await YelpClient.getYelpPlaces(
      location.toString(),
      walking === 'true',
    );
    res.json(yelpResp);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json(err);
    }
  }
}
