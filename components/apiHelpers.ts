import camelcaseKeys from 'camelcase-keys';

export const myFetch = async <T>(
  url: string,
  params: Record<string, string>,
) => {
  const urlStart = process.env.VERCEL_URL ?? 'http://localhost:3000';
  const resp = await fetch(urlStart + url, params);
  const data = await resp.json();
  return data as T;
};

interface IpApiResp {
  lat: string;
  lon: string;
  city: string;
}

export const getLatLong = async (): Promise<IpApiResp> => {
  try {
    const res = await myFetch<IpApiResp>('http://ip-api.com/json', {});
    return res;
  } catch {
    const res = await myFetch<IpApiResp>('/api/location', {});
    return res;
  }
};

interface GetRestaurantsRequest {
  location: string;
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

  const queryParams = `?location=${encodeURIComponent(
    locationStr,
  )}&walking=${walking}`;
  const res = await myFetch<Restaurant[]>('/api/restaurants' + queryParams, {});
  return camelcaseKeys(res);
};
