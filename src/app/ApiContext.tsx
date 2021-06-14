import React from 'react';
import { useAsync } from 'react-use';
import { getRestaurants, Restaurant } from './api';
import { useLocation } from './useLocation';

interface ApiContextState {
  isLoading: boolean;
  location?: string | null;
  displayLocation?: string | null;
  restaurants: Restaurant[];
  refetchRestaurants: (q: string) => void;
}

const InitialState = {
  isLoading: false,
  restaurants: [],
  refetchRestaurants: () => 0,
};

const ApiContext = React.createContext<ApiContextState>(InitialState);

export const ApiContextProvider: React.FC = ({ children }) => {
  const location = useLocation();
  const [refetchApi, setRefetchApi] = React.useState<string>('');

  const getRestaurantsCall = () =>
    getRestaurants({ location, isWalking: true });
  const restaurants = useAsync(getRestaurantsCall, [
    location.locationStr,
    refetchApi,
  ]);

  const state: ApiContextState = {
    isLoading: location.loading || restaurants.loading,
    location: location.locationStr,
    displayLocation: location.displayLocation,
    restaurants: restaurants.value ?? [],
    refetchRestaurants: (q: string) => setRefetchApi(q),
  };

  return <ApiContext.Provider value={state}>{children}</ApiContext.Provider>;
};

export const useApiContext = () => React.useContext(ApiContext);
