import {GetServerSideProps} from 'next';
import React, {useState, FC} from 'react';
import {css} from '@emotion/css';
import {Business} from '../types/business';
import {getLocation} from '../components/apiHelpers';
import {Header} from '../components/Header';
import {HtmlHead} from '../components/HtmlHead';
import {OptionCard} from '../components/OptionCard';
import {getRestaurants} from '../components/apiHelpers';

const styles = {
  main: css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const location = await getLocation(ip as string);
  const city = location.city ?? 'New York City';
  const restaurants = await getRestaurants(city, true);
  const randIdx = Math.floor(Math.random() * restaurants.length);
  return {
    props: {
      restaurants,
      city,
      randIdx,
    },
  };
};

type Props = {
  restaurants: Business[];
  randIdx: number;
  city: string;
};

const App: FC<Props> = ({restaurants, randIdx, city}) => {
  const [curr, setCurr] = useState<Business>(restaurants[randIdx]);
  const [availables, setAvailables] = useState<Business[]>(restaurants);

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
      <HtmlHead />
      <Header displayLocation={city} />
      <div className={styles.main}>
        {curr ? (
          <OptionCard
            restaurant={curr}
            onRejectRestaurant={handleReject}
            onRejectCategory={handleRejectCategory}
          />
        ) : (
          <>Hmm looks like we ran out of places to show you</>
        )}
      </div>
    </div>
  );
};

export default App;
