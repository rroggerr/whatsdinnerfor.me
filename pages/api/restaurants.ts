import camelcaseKeys from 'camelcase-keys';
import type {NextApiRequest, NextApiResponse} from 'next';
import {YelpApi} from '../../utils/yelpApi';
import {Business} from '../../types/business';

const yelpApiKey = process.env.YELP_API_KEY || '';
const YelpClient = new YelpApi(yelpApiKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Business[] | Error>,
) {
  try {
    const {location, walking} = req.query;
    const yelpResp = await getRestaurants(
      location.toString(),
      walking === 'true',
    );
    const camelcaseKeysResp = camelcaseKeys(yelpResp, {deep: true});
    res.json(camelcaseKeysResp);
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json(err);
    }
  }
}

const getRestaurants = async (location: string, walking: boolean) => {
  const yelpResp = await YelpClient.getYelpPlaces(location.toString(), walking);
  return yelpResp;
};
