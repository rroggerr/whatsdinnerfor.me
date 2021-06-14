import React from 'react';
import { css } from '@emotion/css';
import { Category, Restaurant } from './api';
import { Button } from './Button';

const TITLE_HEIGHT = 100;

const styles = {
  root: css`
    width: 80%;
    height: 600px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 32px;
  `,
  image: css`
    object-fit: cover;
    height: 100%;
    width: 100%;
    overflow: hidden;
  `,
  title: css`
    display: inline-block;
    align-items: center;
    padding: 0 16px;
    height: ${TITLE_HEIGHT}px;
  `,
  restaurantNameText: css`
    font-size: 24px;
    font-weight: 600;
    font-family: Tahoma, sans-serif;
    display: inline-block;
    &::before {
      content: "How about ";
      white-space: pre;
    }
  `,
  restaurantInfo: css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
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

  return (
    <div className={styles.root}>
      <img className={styles.image} src={restaurant.imageUrl} />
      <div>
        <div className={styles.title}>
          <span className={styles.restaurantNameText}>{restaurant.name}</span>
        </div>
        <div className={styles.restaurantInfo}>
          <span className={styles.secondaryText}>{restaurant.price}</span>
          <span className={styles.secondaryText}>
            {restaurant.location.display_address.join(' ')}
          </span>
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
