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

  public getYelpPlaces = async (
    location: string,
    walking: boolean
  ): Promise<Business[]> => {
    const radius = walking ? 1000 : 5000;
    const req = {
      term: 'restaurants',
      location,
      radius,
      openNow: true,
      limit: 50,
    };
    const {jsonBody} = await this.client.search(req);
    return jsonBody.businesses ?? [];
  }
}
