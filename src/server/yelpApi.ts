import yelp from 'yelp-fusion';

interface Category {
  alias: string;
  title: string;
}

interface Business {
  id: string;
  categories: Category[];
  image_url: string;
  name: string;
  price: string;
}

export class YelpApi {
  private client: any;

  constructor(key: string) {
    this.client = yelp.client(key);
  }

  _yelpGetPlaces = async (
    location: string,
    walking: boolean,
    offset = 0
  ): Promise<Business[]> => {
    const radius = walking ? 1000 : 5000;
    const req = {
      term: 'restaurants',
      location,
      radius,
      openNow: true,
      limit: 50,
      offset,
    };
    const { jsonBody } = await this.client.search(req);
    return jsonBody.businesses ?? [];
  };

  public getYelpPlaces = async (
    location: string,
    walking: boolean
  ): Promise<Business[]> => {
    const businesses = await Promise.all([
      this._yelpGetPlaces(location, walking),
      this._yelpGetPlaces(location, walking, 50),
      this._yelpGetPlaces(location, walking, 100),
      this._yelpGetPlaces(location, walking, 150),
    ]);
    const res = [
      ...businesses[0],
      ...businesses[1],
      ...businesses[2],
      ...businesses[3],
    ];
    console.log(`Returning ${res.length} results for ${location} ${walking}`);
    return res;
  };
}
