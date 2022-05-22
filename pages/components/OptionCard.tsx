import React from 'react';
import {css} from '@emotion/css';
import {Category, Restaurant} from './apiHelpers';
import {Button} from './Button';

const TITLE_HEIGHT = 100;

export const styles = {
  root: css`
    width: 80%;
    height: 600px;
    display: grid;
    grid-template-rows: unset;
    grid-template-columns: 1fr 1fr;
    margin-top: 32px;
    @media only screen and (max-width: 780px) {
      margin-top: 0;
      width: 100%;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: unset;
    }
  `,
  image: css`
    object-fit: cover;
    height: 100%;
    width: 100%;
    overflow: hidden;
    @media only screen and (max-width: 780px) {
      height: 30vh !important;
    }
  `,
  title: css`
    display: inline-block;
    align-items: center;
    padding: 0 16px;
    height: ${TITLE_HEIGHT}px;
    @media only screen and (max-width: 780px) {
      margin-top: 24px;
    }
  `,
  optionContent: css`
    display: grid;
    grid-template-rows: 100px 1fr 260px;
  `,
  restaurantNameText: css`
    font-size: 24px;
    font-weight: 600;
    font-family: Tahoma, sans-serif;
    display: inline-block;
    word-break: break-word;
    &::before {
      content: 'How about ';
    }
  `,
  restaurantInfo: css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 0 24px;
    & > * {
      margin-top: 8px;
    }
  `,
  secondaryText: css`
    font-size: 16px;
    font-family: Tahoma, sans-serif;
    display: inline-block;
  `,
  buttonGroup: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 0 24px;
    & > button {
      margin-top: 16px;
    }
  `,
};

interface OptionCardProps {
  restaurant?: Restaurant;
  onRejectRestaurant: () => void;
  onRejectCategory: (alias: string) => void;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  restaurant,
  onRejectRestaurant,
  onRejectCategory,
}) => {
  if (!restaurant) return null;

  const categories = restaurant.categories;
  const rejectCategoryBtn = (cat: Category) => (
    <Button styling="white" onClick={() => onRejectCategory(cat.alias)}>
      {`I don't want ${cat.title} places`}
    </Button>
  );
  const displayAddress = restaurant.location.display_address.join(' ');

  /* eslint-disable @next/next/no-img-element */
  return (
    <div className={styles.root}>
      <img
        className={styles.image}
        src={restaurant.imageUrl}
        alt={restaurant.name}
      />
      <div className={styles.optionContent}>
        <div className={styles.title}>
          <span className={styles.restaurantNameText}>{restaurant.name}</span>
        </div>
        <div className={styles.restaurantInfo}>
          <span className={styles.secondaryText}>{restaurant.price}&nbsp;</span>
          <span className={styles.secondaryText}>{displayAddress}&nbsp;</span>
        </div>
        <div className={styles.buttonGroup}>
          {categories.length > 0 && rejectCategoryBtn(categories[0])}
          {categories.length > 1 && rejectCategoryBtn(categories[1])}
          <Button styling="black" onClick={onRejectRestaurant}>
            I want something else
          </Button>
        </div>
      </div>
    </div>
  );
};
