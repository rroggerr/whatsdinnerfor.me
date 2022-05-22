import camelcaseKeys from 'camelcase-keys';

export const myFetch = async <T>(
  url: string,
  params: Record<string, string>,
) => {
  const urlStart = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const resp = await fetch(urlStart + url, params);
  const data = await resp.json();
  return data as T;
};

export interface IpApiResp {
  lat: number;
  lon: number;
  city: string;
  zip: string;
}

export const getLatLong = async (): Promise<IpApiResp> => {
  const res = await myFetch<IpApiResp>('/api/location', {});
  return res;
};

interface GetRestaurantsRequest {
  location: string;
  lat: number;
  lon: number;
  isWalking: boolean;
}

export interface Category {
  alias: string;
  title: string;
}

export interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  location: {display_address: string[]};
  categories: Category[];
}

export const getRestaurants = async (params: GetRestaurantsRequest) => {
  const locationStr = params.location;
  if (!locationStr) return [];

  const walking = Boolean(params.isWalking).toString();

  const hasLatLon = params.lat && params.lon;

  const queryParams = hasLatLon
    ? `?latitude=${encodeURIComponent(
      params.lat,
    )}&longitude=${encodeURIComponent(params.lon)}&walking=${walking}`
    : `?location=${encodeURIComponent(locationStr)}&walking=${walking}`;
  const res = await myFetch<Restaurant[]>('/api/restaurants' + queryParams, {});
  return camelcaseKeys(res);
};
