import {Client, PlacesNearbyRequest, LatLng} from "@googlemaps/google-maps-services-js";

const client = new Client({})

export const getPlaces = async (apiKey: string) => {
    const location: LatLng = [40.7189023, -74.058855];
    const req: PlacesNearbyRequest = {
        params: {
            key: apiKey,
            location: location,
            radius: 1000,
            opennow: true,
            type: 'restaurant',
            
        },
    }
    const { data } = await client.placesNearby(req)
    return data
}
