import yelp from 'yelp-fusion';

export class YelpApi {
    private client: any;

    constructor(key: string) {
        this.client = yelp.client(key)
    }

    public getYelpPlaces = async () => {
        const req = {
            term: 'restaurants',
            location: 'Jersey City NJ',
            radius: 1000,
            openNow: true,
            limit: 50,
        }
        const {jsonBody} = await this.client.search(req)
        return jsonBody
    }
}
