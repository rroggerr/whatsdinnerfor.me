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
        this.client = yelp.client(key)
    }

    public getYelpPlaces = async (location: string): Promise<Business[]> => {
        const req = {
            term: 'restaurants',
            location,
            radius: 1000,
            openNow: true,
            limit: 50,
        }
        const {jsonBody} = await this.client.search(req)
        return jsonBody
    }
}
