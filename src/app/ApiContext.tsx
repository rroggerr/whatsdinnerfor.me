import React from 'react';
import {useAsync} from 'react-use';
import {getRestaurants, Restaurant} from './api';
import {useLocation} from './useLocation';

interface ApiContextState {
    isLoading: boolean;
    location?: string | null;
    restaurants: Restaurant[];
}

const InitialState = {isLoading:false, restaurants: []};

const ApiContext = React.createContext<ApiContextState>(InitialState);

export const ApiContextProvider: React.FC = ({children}) => {
  const location = useLocation();
  
  const getRestaurantsCall = () => getRestaurants({location, isWalking: true});
  const restaurants = useAsync(getRestaurantsCall, [location.locationStr]);

  const state: ApiContextState = {
    isLoading: location.loading || restaurants.loading,
    location: location.locationStr,
    restaurants: restaurants.value ?? [],
  };

  return (
    <ApiContext.Provider value={state}>{children}</ApiContext.Provider>
  );
};

export const useApiContext = () => React.useContext(ApiContext);
