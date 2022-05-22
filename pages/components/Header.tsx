import React from 'react';
import {css} from '@emotion/css';

const styles = {
  root: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding: 0 64px;
    background-color: black;
    height: 72px;
    @media only screen and (max-width: 780px) {
      height: 120px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
  `,
  titleText: css`
    color: white;
    font-size: 24px;
    font-weight: 600;
    font-family: Tahoma, sans-serif;
  `,
  input: css`
    border: none;
    outline: none;
    height: 36px;
    width: 320px;
    border-radius: 9999px;
    padding: 0 40px;
    background-image: url(location.svg);
    background-repeat: no-repeat;
    background-size: 20px;
    background-position-y: center;
    background-origin: padding-box;
    background-position-x: 12px;
    font-size: 20px;
    @media only screen and (max-width: 780px) {
      width: 80%;
    }
  `,
};

type Props = {
  displayLocation: string;
};

export const Header: React.FC<Props> = ({displayLocation}) => {
  const [locationStr, setLocationStr] = React.useState<string>('');

  return (
    <div className={styles.root}>
      <span className={styles.titleText}>Whats For Dinner</span>
      <input
        type="text"
        name="location"
        autoComplete="off"
        className={styles.input}
        maxLength={50}
        value={locationStr}
        placeholder={displayLocation ?? ''}
        onChange={({target}) => setLocationStr(target.value)}
      />
    </div>
  );
};
