import {useGeolocation, useAsync} from 'react-use';
import {getLatLong} from './apiHelpers';

export interface LocationData {
  loading: boolean;
  locationStr: null | string;
  displayLocation: null | string;
  lat?: string | number;
  lon?: string | number;
  error?: Error;
}

export const useLocation = (): LocationData => {
  const sensorLocation = useGeolocation();
  const clientIpLocation = useAsync(getLatLong, []);

  const loading = sensorLocation.loading || clientIpLocation.loading;
  const lat = sensorLocation.latitude || clientIpLocation.value?.lat;
  const lon = sensorLocation.longitude || clientIpLocation.value?.lon;
  const locationStr = lat && lon ? `${lat}, ${lon}` : null;
  const displayLocation = sensorLocation?.latitude
    ? 'Current Location'
    : clientIpLocation.value?.city ?? null;
  const error = clientIpLocation.error;

  return {error, lat, lon, loading, locationStr, displayLocation};
};
