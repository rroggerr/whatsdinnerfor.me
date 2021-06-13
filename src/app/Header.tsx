import React from 'react';
import { css } from '@emotion/css';

const styles = {
  root: css`
    display: flex;
    align-items: center;
    padding: 0 64px;
    background-color: black;
    height: 72px;
  `,
  titleText: css`
    color: white;
    font-size: 24px;
    font-weight: 600;
    font-family: Tahoma, sans-serif;
  `,
};

export const Header: React.FC = () => (
  <div className={styles.root}>
    <span className={styles.titleText}>Whats For Dinner</span>
    <input type="text" name="location" autoComplete="off" />
  </div>
);
