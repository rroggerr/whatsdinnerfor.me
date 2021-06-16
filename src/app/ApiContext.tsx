import React from 'react';
import { useAsync } from 'react-use';
import { getRestaurants, Restaurant } from './api';
import { useLocation } from './useLocation';

interface ApiContextState {
  isLoading: boolean;
  isError: boolean;
  location?: string | null;
  displayLocation?: string | null;
  restaurants: Restaurant[];
  refetchRestaurants: (q: string) => void;
}

const InitialState = {
  isLoading: false,
  isError: false,
  restaurants: [],
  refetchRestaurants: () => 0,
};

const ApiContext = React.createContext<ApiContextState>(InitialState);

export const ApiContextProvider: React.FC = ({ children }) => {
  const location = useLocation();
  const [refetchString, setRefetchString] = React.useState<string>('');

  const getRestaurantsCall = () => {
    const locationStr = refetchString || location.locationStr || '';
    return getRestaurants({ location: locationStr, isWalking: true });
  };

  const restaurants = useAsync(getRestaurantsCall, [
    location.loading,
    refetchString,
  ]);

  const isError = !!(location.error || restaurants.error);
  const isLoading = location.loading || restaurants.loading;

  const state: ApiContextState = {
    isLoading: !isError && isLoading,
    isError,
    location: location.locationStr,
    displayLocation: location.displayLocation,
    restaurants: restaurants.value ?? [],
    refetchRestaurants: (q: string) => setRefetchString(q),
  };

  return <ApiContext.Provider value={state}>{children}</ApiContext.Provider>;
};

export const useApiContext = () => React.useContext(ApiContext);
