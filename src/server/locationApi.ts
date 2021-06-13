import fetch from 'node-fetch';

export const getLatLong = async (ip: string | undefined) => {
  if (!ip) {
    throw new Error('No IP address provided');
  }

  const res = await fetch(`http://ip-api.com/json/${ip}`);
  const json = await res.json();
  return json;
};
