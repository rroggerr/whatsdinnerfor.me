import { useGeolocation, useAsync } from 'react-use';
import { getLatLong } from './api';

export interface LocationData {
  loading: boolean;
  locationStr: null | string;
  lat?: string | number;
  lon?: string | number;
}

export const useLocation = (): LocationData => {
  const sensorLocation = useGeolocation();
  const clientIpLocation = useAsync(getLatLong, []);

  const loading = sensorLocation.loading || clientIpLocation.loading;
  const lat = sensorLocation.latitude || clientIpLocation.value?.lat;
  const lon = sensorLocation.longitude || clientIpLocation.value?.lon;
  const locationStr = lat && lon ? `${lat}, ${lon}` : null;

  return { lat, lon, loading, locationStr };
};
