import React from 'react';
import ContentLoader, { Code } from 'react-content-loader';
import { useMedia } from 'react-use';
import { css, cx } from '@emotion/css';
import { styles as optionCardStyles } from './OptionCard';

const styles = {
  loaderStyles: css`
    overflow: hidden;
  `,
  pizzaSpinnerStyles: css`
    display: flex;
    flex-direction: column;
    & > * {
      padding-top: 40px;
    }
  `,
  pizzaText: css`
    font-size: 24px;
    font-weight: 600;
    font-family: Tahoma, sans-serif;
    display: inline-block;
    word-break: break-word;
  `,
};

const DesktopLoader = () => (
  <div className={cx(optionCardStyles.root, styles.loaderStyles)}>
    <ContentLoader speed={2} viewBox="0 0 400 400" style={{ width: '100%' }}>
      <rect x="0" y="0" rx="3" ry="3" width="400" height="600" />
    </ContentLoader>
    <div className={cx(optionCardStyles.optionContent, styles.loaderStyles)}>
      <div className={cx(optionCardStyles.title, styles.loaderStyles)}>
        <Code />
      </div>
      <div className={cx(optionCardStyles.restaurantInfo, styles.loaderStyles)}>
        <Code />
      </div>
      <div className={cx(optionCardStyles.buttonGroup, styles.loaderStyles)}>
        <ContentLoader
          speed={2}
          viewBox="0 0 1000 400"
          style={{ width: '100%', height: 'min-content' }}
        >
          <rect x="0" y="80" rx="3" ry="3" width="4000" height="85" />
          <rect x="0" y="200" rx="3" ry="3" width="4000" height="85" />
          <rect x="0" y="320" rx="3" ry="3" width="4000" height="85" />
        </ContentLoader>
      </div>
    </div>
  </div>
);

const MobileLoader = () => {
  const pizzaTexts = [
    'Preheating the oven',
    'Kneading the dough',
    'Placing the toppings',
  ];
  const pizzaText = pizzaTexts[Math.floor(Math.random() * pizzaTexts.length)];

  return (
    <div className={styles.pizzaSpinnerStyles}>
      <img src={'/pizza-spinner.gif'} />
      <span className={styles.pizzaText}>{pizzaText}...</span>
    </div>
  );
};

export const Loader = () => {
  const isMobile = useMedia('(max-width: 780px)');
  return isMobile ? <MobileLoader /> : <DesktopLoader />;
};
