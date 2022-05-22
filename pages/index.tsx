import Head from 'next/head';
import React, {useState, FC} from 'react';
import {css} from '@emotion/css';
import {Restaurant, getRestaurants, getLatLong} from '../components/apiHelpers';
import {Header} from '../components/Header';
import {OptionCard} from '../components/OptionCard';

const styles = {
  main: css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export const getServerSideProps = async () => {
  const location = await getLatLong();
  const restaurants = await getRestaurants({
    location: location.city ?? 'new york city',
    lat: location.lat,
    lon: location.lon,
    isWalking: true,
  });
  const randIdx = Math.floor(Math.random() * restaurants.length);
  return {
    props: {restaurants, city: location.city ?? 'New York City', randIdx},
  };
};

type Props = {
  restaurants: Restaurant[];
  randIdx: number;
  city: string;
};

const App: FC<Props> = ({restaurants, randIdx, city}) => {
  const [curr, setCurr] = useState<Restaurant>(restaurants[randIdx]);
  const [availables, setAvailables] = useState<Restaurant[]>(restaurants);

  const handleReject = () => {
    const filtered = availables.filter(({id}) => id !== curr?.id);
    setAvailables(filtered);
    setCurr(filtered[Math.floor(Math.random() * filtered.length)]);
  };

  const handleRejectCategory = (alias: string) => {
    const filtered = availables.filter(
      ({categories}) => !categories.some((c) => c.alias === alias),
    );
    setAvailables(filtered);
    setCurr(filtered[Math.floor(Math.random() * filtered.length)]);
  };

  return (
    <div className="App">
      <Head>
        <title>Whats For Dinner</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="title" content="Whats For Dinner" />
        <meta
          name="description"
          content="Find out what to eat for dinner near you"
        />
      </Head>
      <Header displayLocation={city} />
      <div className={styles.main}>
        <OptionCard
          restaurant={curr}
          onRejectRestaurant={handleReject}
          onRejectCategory={handleRejectCategory}
        />
      </div>
    </div>
  );
};

export default App;
