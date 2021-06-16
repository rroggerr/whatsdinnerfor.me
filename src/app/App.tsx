import React from 'react';
import { css } from '@emotion/css';

import { Restaurant } from './api';
import { useApiContext } from './ApiContext';
import { Header } from './Header';
import { OptionCard } from './OptionCard';
import { Loader } from './Loader';

const styles = {
  main: css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export const App: React.FC = () => {
  const { restaurants, isLoading, isError } = useApiContext();
  const [curr, setCurr] = React.useState<Restaurant>();
  const [availables, setAvailables] = React.useState<Restaurant[]>([]);

  React.useEffect(() => {
    setAvailables(restaurants);
  }, [restaurants]);

  React.useEffect(() => {
    setCurr(availables[Math.floor(Math.random() * availables.length)]);
  }, [availables]);

  const handleReject = () => {
    const filtered = availables.filter(({ id }) => id !== curr?.id);
    setAvailables(filtered);
  };

  const handleRejectCategory = (alias: string) => {
    const filtered = availables.filter(
      ({ categories }) => !categories.some((c) => c.alias === alias)
    );
    setAvailables(filtered);
  };

  return (
    <div className="App">
      <Header />
      <div className={styles.main}>
        {isError && 'X . X  Dieded'}
        {isLoading ? (
          <Loader />
        ) : (
          <OptionCard
            restaurant={curr}
            onRejectRestaurant={handleReject}
            onRejectCategory={handleRejectCategory}
          />
        )}
      </div>
    </div>
  );
};
