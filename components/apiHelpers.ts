import {Business} from '../types/business';

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

export const getLocation = async (ip: string): Promise<IpApiResp> => {
  const resp = await fetch(`http://ip-api.com/json/${ip}`);
  const location = await resp.json();
  return location.status === 'success'
    ? location
    : {
      lat: 40.694,
      lon: -73.9901,
      city: 'New York City',
      zip: '10201',
    };
};

export const getRestaurants = async (location: string, walking: boolean) => {
  const encodedLocation = encodeURIComponent(location);
  const encodedWalking = walking ? '&walking=true' : '';
  const resp = await myFetch<Business[]>(
    `/api/restaurants?location=${encodedLocation}${encodedWalking}`,
    {},
  );
  return resp;
};

export const getCsrRestaurant = async (walking: boolean) => {
  const loc = await getCsrLocation();
  const encodedLoc = `${loc.coords.latitude}, ${loc.coords.longitude}`;
  return getRestaurants(encodedLoc, walking);
};

const getCsrLocation = async () => {
  return new Promise<GeolocationPosition>((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        res(pos);
      },
      (err) => {
        rej(err);
      },
    );
  });
};
