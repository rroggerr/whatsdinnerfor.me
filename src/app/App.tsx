import React from 'react';
import { Restaurant } from './api';
import {useApiContext} from './ApiContext';

export const App: React.FC = () => {
  const {restaurants, isLoading} = useApiContext();
  const [curr, setCurr] = React.useState<Restaurant>();
  const [rejects, setRejects] = React.useState<string[]>([]);

  const available = restaurants.filter(({id}) => !rejects.some((rejectId) => id === rejectId));

  React.useEffect(() => {
    setCurr(available[Math.floor(Math.random() * available.length)]);
  }, [restaurants]);

  const handleReject = () => {
    curr && setRejects((rejects) => [curr.id, ...rejects]);
    const rand = available[Math.floor(Math.random() * available.length)];
    setCurr(rand);
  };

  const suggestion = <><span>How about {curr?.name}</span>
    <button onClick={handleReject}>No</button></>;

  return (
    <div className="App">
      {isLoading && 'Loading'}
      {!isLoading && suggestion}
    </div>
  );
};
