import {LocationData} from './useLocation';

export const myFetch = async <T>(url: string, params: Record<string, string>) => {
  const resp = await fetch(url, params);
  const data = await resp.json();
  return data as T;
};

interface IpApiResp {
  lat: string;
  lon: string;
}

export const getLatLong = async (): Promise<IpApiResp> => {
  try {
    const res = await myFetch<IpApiResp>(
      'http://ip-api.com/json',
      {},
    );
    return res;
  } catch {
    const res = await myFetch<IpApiResp>(
      '/api/location',
      {},
    );
    return res;
  }
};

interface GetRestaurantsRequest {
  location: LocationData;
  isWalking: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
}

export const getRestaurants = async (params: GetRestaurantsRequest) => {
  const {locationStr} = params.location;
  if (!locationStr) return [];

  const walking = Boolean(params.isWalking).toString();

  const queryParams = `?location=${encodeURIComponent(locationStr)}&walking=${walking}`;
  const res = await myFetch<Restaurant[]>('/api/restaurants' + queryParams, {});
  return res;
};
